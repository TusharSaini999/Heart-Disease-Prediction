const tf = require("@tensorflow/tfjs-node");
const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");

const DATASET_PATH = path.join(__dirname, "heart.csv");
const MODEL_PATH= path.join(__dirname, "model");
const SCALER_PATH = path.join(__dirname, "scaler.json");

let model, scaler;

// Load CSV Dataset
function loadCSV(filename) {
    return new Promise((resolve, reject) => {
        let data = [];
        fs.createReadStream(filename)
            .pipe(csv())
            .on("data", (row) => data.push(row))
            .on("end", () => resolve(data))
            .on("error", (err) => reject(err));
    });
}

// Preprocess Data
async function preprocessData() {
    let data = await loadCSV(DATASET_PATH);

    data = data.map(row => {
        let processedRow = {};
        Object.keys(row).forEach(key => {
            processedRow[key] = parseFloat(row[key]);
        });
        return processedRow;
    });

    const featureKeys = Object.keys(data[0]).filter(key => key !== "target_multi");
    const features = data.map(row => featureKeys.map(key => row[key]));
    const labels = data.map(row => row["target_multi"]);

    // Normalize Features
    const X = tf.tensor2d(features);
    const mean = X.mean(0);
    const std = X.sub(mean).square().mean(0).sqrt();
    const normalizedX = X.sub(mean).div(std);

    return { X: normalizedX, y: tf.tensor1d(labels, "float32"), mean, std };
}

// Create AI Model
async function createModel(inputShape) {
    const model = tf.sequential();
    
    model.add(tf.layers.dense({ inputShape: [inputShape], units: 16, activation: "relu" }));
    model.add(tf.layers.dense({ units: 8, activation: "relu" }));
    model.add(tf.layers.dense({ units: 5, activation: "softmax" })); // 5 classes

    model.compile({
        optimizer: tf.train.adam(),
        loss: "sparseCategoricalCrossentropy",
        metrics: ["accuracy"],
    });

    return model;
}

// Train and Save Model
async function trainModel() {
    const { X, y, mean, std } = await preprocessData();
    const model = await createModel(X.shape[1]);

    await model.fit(X, y, {
        epochs: 50,
        batchSize: 10,
        validationSplit: 0.2,
        callbacks: {
            onEpochEnd: (epoch, logs) => console.log(`Epoch ${epoch + 1}: Accuracy = ${logs.acc}`)
        }
    });

    await model.save(MODEL_PATH);
    fs.writeFileSync(SCALER_PATH, JSON.stringify({ mean: mean.arraySync(), std: std.arraySync() }));
    
    console.log("Model trained and saved!");
}

// Load Model and Normalization Data
async function loadModel() {
    if (fs.existsSync(path.join(__dirname, "model", "model.json"))) {
        model = await tf.loadLayersModel(MODEL_PATH);
        scaler = JSON.parse(fs.readFileSync(SCALER_PATH, "utf8"));
        console.log("Model and scaler loaded!");
    } else {
        console.log("No saved model found. Training a new one...");
        await trainModel();
        await loadModel();
    }
}

// Make Prediction
async function predict(features) {
    if (!model) await loadModel();

    const normalizedFeatures = features.map((val, i) => (val - scaler.mean[i]) / scaler.std[i]);
    const inputTensor = tf.tensor2d([normalizedFeatures]);

    const prediction = model.predict(inputTensor);
    return prediction.argMax(1).dataSync()[0];
}

module.exports = { loadModel, predict };

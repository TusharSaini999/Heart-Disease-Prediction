const express = require("express");
const { predict } = require("./heart-disease-model/model");

const router = express.Router();

router.post("/predict", async (req, res) => {
    try {
        const { features } = req.body;
        if (!features || !Array.isArray(features)) {
            return res.status(400).json({ error: "Invalid input format" });
        }

        const predictedClass = await predict(features);
        res.json({ predicted_class: predictedClass });
    } catch (error) {
        res.status(500).json({ error: "Prediction error", details: error.message });
    }
});

module.exports = router;

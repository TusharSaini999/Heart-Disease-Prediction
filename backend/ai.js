const express = require("express");
const router = express.Router();
const axios = require("axios");
const db = require("./db");
require('dotenv').config();
const verifyToken = require("./verifyToken");
///curl -X POST "http://localhost:4000/ai" -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiam9obmRvZUBleGFtcGxlLmNvbSIsImlhdCI6MTc0MjQ2NDU4OSwiZXhwIjoxNzQzMDY5Mzg5fQ.NDuh8OVqV4kM6woCC8BrzXE40T7rdVBLLauGNyyoOLY" -d "{\"features\": [81, 0, 3, 107, 297, 1, 1, 179, 1, 1.194321572, 2, 2, 0]}"
///{"predicted_class":0}

///curl -X POST "http://localhost:4000/ai" -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiam9obmRvZUBleGFtcGxlLmNvbSIsImlhdCI6MTc0MjQ2NDU4OSwiZXhwIjoxNzQzMDY5Mzg5fQ.NDuh8OVqV4kM6woCC8BrzXE40T7rdVBLLauGNyyoOLY" -d "{\"features\": [63, 1, 3, 145, 233, 1, 0, 150, 0, 2.3, 0, 0, 1]}"
///{"predicted_class":1}

///curl -X POST "http://localhost:4000/ai" -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiam9obmRvZUBleGFtcGxlLmNvbSIsImlhdCI6MTc0MjQ2NDU4OSwiZXhwIjoxNzQzMDY5Mzg5fQ.NDuh8OVqV4kM6woCC8BrzXE40T7rdVBLLauGNyyoOLY" -d "{\"features\": [63, 1, 2, 105, 294, 0, 0, 137, 1, 2.3, 1, 1, 2]}"
///{"predicted_class":2}

///curl -X POST "http://localhost:4000/ai" -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiam9obmRvZUBleGFtcGxlLmNvbSIsImlhdCI6MTc0MjQ2NDU4OSwiZXhwIjoxNzQzMDY5Mzg5fQ.NDuh8OVqV4kM6woCC8BrzXE40T7rdVBLLauGNyyoOLY" -d "{\"features\": [84, 1, 3, 170, 262, 0, 1, 96, 1, 1, 2, 0, 2]}"
///{"predicted_class":3}

///curl -X POST "http://localhost:4000/ai" -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiam9obmRvZUBleGFtcGxlLmNvbSIsImlhdCI6MTc0MjQ2NDU4OSwiZXhwIjoxNzQzMDY5Mzg5fQ.NDuh8OVqV4kM6woCC8BrzXE40T7rdVBLLauGNyyoOLY" -d "{\"features\": [63, 1, 2, 145, 233, 1, 1, 150, 1, 1.3, 2, 3, 3]}"
///{"predicted_class":4}


router.post("/", verifyToken, async (req, res) => {
    try {
        const { features } = req.body;
        const uid = req.user.userId;

        
        if (!features || !Array.isArray(features)) {
            return res.status(400).json({ error: "Invalid input format. 'features' must be an array." });
        }

    
        if (features.length !== 13) {
            return res.status(400).json({ error: "Invalid input. 'features' array must contain exactly 13 values." });
        }

        
        const constraints = [
            { min: 20, max: 90 },     // Age
            { min: 0, max: 1 },       // Sex
            { min: 0, max: 3 },       // Chest Pain Type (cp)
            { min: 80, max: 200 },    // Resting Blood Pressure (trestbps)
            { min: 100, max: 500 },   // Cholesterol Level (chol)
            { min: 0, max: 1 },       // Fasting Blood Sugar (fbs)
            { min: 0, max: 2 },       // Resting ECG Results (restecg)
            { min: 60, max: 220 },    // Max Heart Rate (thalach)
            { min: 0, max: 1 },       // Exercise-Induced Angina (exang)
            { min: 0.0, max: 6.0 },   // ST Depression (oldpeak)
            { min: 0, max: 2 },       // Slope of ST Segment (slope)
            { min: 0, max: 3 },       // Number of Major Blood Vessels (ca)
            { min: 1, max: 3 }        // Thalassemia Test Result (thal)
        ];

    
        for (let i = 0; i < features.length; i++) {
            if (typeof features[i] !== "number" || features[i] < constraints[i].min || features[i] > constraints[i].max) {
                return res.status(400).json({
                    error: `Invalid value at index ${i}. Expected a number between ${constraints[i].min} and ${constraints[i].max}.`
                });
            }
        }

        
        const aiResponse = await axios.post(process.env.PYTHON_HOST, { features });
        const target_multi = aiResponse.data.predicted_class; // Extract prediction

        // Insert prediction into database
        const query = `
            INSERT INTO histery (uid, age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal, target_multi)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [uid, ...features, target_multi];

        db.query(query, values, (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Database error", details: err.message });
            }
            res.json({ success: true, predicted_class: target_multi });
        });

    } catch (error) {
        res.status(500).json({
            error: "Prediction or Database error",
            details: error.response ? error.response.data : error.message
        });
    }
});

///curl -X GET "http://localhost:4000/ai/histery" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiam9obmRvZUBleGFtcGxlLmNvbSIsImlhdCI6MTc0MjQ2NDU4OSwiZXhwIjoxNzQzMDY5Mzg5fQ.NDuh8OVqV4kM6woCC8BrzXE40T7rdVBLLauGNyyoOLY"

router.get("/histery", verifyToken, async (req, res) => {
    try {
        const uid = req.user?.userId; 

        if (!uid) {
            return res.status(401).json({ error: "Unauthorized: User ID missing in token" });
        }

        const query = `SELECT * FROM histery WHERE uid = ? ORDER BY created_at DESC`;

        db.query(query, [uid], (err, results) => {
            if (err) {
                return res.status(500).json({ error: "Database error", details: err.message });
            }
            res.json({ success: true, data: results });
        });

    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
});


module.exports = router;

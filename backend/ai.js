const express = require("express");
const router = express.Router();
const axios = require("axios");
const db = require("./db");
require('dotenv').config();
const verifyToken = require("./verifyToken");
const Groq = require('groq-sdk');

///curl -X POST "http://localhost:4000/ai" -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMxLCJlbWFpbCI6InR1c2hhcmdAZ21haWwuY29tIiwiaWF0IjoxNzQ1OTMyOTQ1LCJleHAiOjE3NDY1Mzc3NDV9.CrCzdSFb_m1mheDyY0_AOvlvLSK30bRWMo7vNdzPHG4" -d "{\"features\": [81, 0, 3, 107, 297, 1, 1, 179, 1, 1.194321572, 2, 2, 1]}"
///{"predicted_class":0}

///curl -X POST "http://localhost:4000/ai" -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMxLCJlbWFpbCI6InR1c2hhcmdAZ21haWwuY29tIiwiaWF0IjoxNzQ1OTMyOTQ1LCJleHAiOjE3NDY1Mzc3NDV9.CrCzdSFb_m1mheDyY0_AOvlvLSK30bRWMo7vNdzPHG4" -d "{\"features\": [63, 1, 3, 145, 233, 1, 0, 150, 0, 2.3, 0, 0, 1]}"
///{"predicted_class":1}

///curl -X POST "http://localhost:4000/ai" -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMxLCJlbWFpbCI6InR1c2hhcmdAZ21haWwuY29tIiwiaWF0IjoxNzQ1OTMyOTQ1LCJleHAiOjE3NDY1Mzc3NDV9.CrCzdSFb_m1mheDyY0_AOvlvLSK30bRWMo7vNdzPHG4" -d "{\"features\": [63, 1, 2, 105, 294, 0, 0, 137, 1, 2.3, 1, 1, 2]}"
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


        const aiResponse = await axios.post(
            process.env.PYTHON_HOST, 
            { features },
            {
                headers: {
                    Authorization: `Bearer ${process.env.PYTHON_API_KEY}`
                }
            }
        );
        
        
        const target_multi = aiResponse.data.predicted_class; // Extract prediction

        // Insert prediction into database
        const query = `
            INSERT INTO history (uid, age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal, target_multi)
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
            details: error.response ? error.response.data : error.message,

        });
    }
});

///curl -X GET "http://localhost:4000/ai/history" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiam9obmRvZUBleGFtcGxlLmNvbSIsImlhdCI6MTc0MjQ2NDU4OSwiZXhwIjoxNzQzMDY5Mzg5fQ.NDuh8OVqV4kM6woCC8BrzXE40T7rdVBLLauGNyyoOLY"

router.get("/history", verifyToken, async (req, res) => {
    try {
        const uid = req.user?.userId;

        if (!uid) {
            return res.status(401).json({ error: "Unauthorized: User ID missing in token" });
        }

        const query = `SELECT * FROM history WHERE uid = ? ORDER BY created_at DESC`;

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

/*{
    "age": 35,                        // Number (must be > 0 and <= 120)
    "gender": "Male",                 // String: "Male", "Female", or "Other"
    "exerciseFrequency": "1-2",       // String: "0", "1-2", "3-5", "5+"
    "smoke": false,                   // Boolean: true or false
    "fastFoodFrequency": "Often",     // String: "Rarely", "Sometimes", "Often"
    "stressLevel": "High",            // String: "Low", "Moderate", "High"
    "sleepHours": "5-7",              // String: "<5", "5-7", "7-9", ">9"
    "familyHistory": "Yes",           // String: "Yes", "No", "Not Sure"
    "chestPain": true,                // Boolean: true or false
    "bloodPressureOrDiabetes": "Yes"  // String: "Yes", "No", "Not Sure"
  }
  */
//Yes
//curl -X POST http://localhost:4000/ai/predict-heart-disease -H "Content-Type: application/json" -d "{\"age\": 45, \"gender\": \"Male\", \"exerciseFrequency\": \"3-5\", \"smoke\": true, \"fastFoodFrequency\": \"Often\", \"stressLevel\": \"High\", \"sleepHours\": \"5-7\", \"familyHistory\": \"Yes\", \"chestPain\": true, \"bloodPressureOrDiabetes\": \"Yes\"}"
//NO
//curl -X POST http://localhost:4000/ai/predict-heart-disease -H "Content-Type: application/json" -d "{\"age\": 45, \"gender\": \"Male\", \"exerciseFrequency\": \"3-5\", \"smoke\": false, \"fastFoodFrequency\": \"Rarely\", \"stressLevel\": \"Low\", \"sleepHours\": \"7-9\", \"familyHistory\": \"No\", \"chestPain\": false, \"bloodPressureOrDiabetes\": \"No\"}"


const groq = new Groq({ apiKey: process.env.GROQ_API });


router.post('/predict-heart-disease', async (req, res) => {
    try {
        const {
            age,
            gender,
            exerciseFrequency,
            smoke,
            fastFoodFrequency,
            stressLevel,
            sleepHours,
            familyHistory,
            chestPain,
            bloodPressureOrDiabetes
        } = req.body;

        // Convert smoke and chestPain to booleans if they are received as strings
        const booleanSmoke = typeof smoke === 'string' ? smoke === 'true' : smoke;
        const booleanChestPain = typeof chestPain === 'string' ? chestPain === 'true' : chestPain;

        // Basic Validation
        if (!age || age <= 0 || age > 120) {
            return res.status(400).json({ error: "Invalid age" });
        }
        if (!gender || !['Male', 'Female', 'Other'].includes(gender)) {
            return res.status(400).json({ error: "Invalid gender" });
        }
        if (!exerciseFrequency || !['0', '1-2', '3-5', '5+'].includes(exerciseFrequency)) {
            return res.status(400).json({ error: "Invalid exercise frequency" });
        }
        if (typeof booleanSmoke !== 'boolean') {
            return res.status(400).json({ error: "Invalid smoke value" });
        }
        if (!fastFoodFrequency || !['Rarely', 'Sometimes', 'Often'].includes(fastFoodFrequency)) {
            return res.status(400).json({ error: "Invalid fast food frequency" });
        }
        if (!stressLevel || !['Low', 'Moderate', 'High'].includes(stressLevel)) {
            return res.status(400).json({ error: "Invalid stress level" });
        }
        if (!sleepHours || !['<5', '5-7', '7-9', '>9'].includes(sleepHours)) {
            return res.status(400).json({ error: "Invalid sleep hours" });
        }
        if (!familyHistory || !['Yes', 'No', 'Not Sure'].includes(familyHistory)) {
            return res.status(400).json({ error: "Invalid family history" });
        }
        if (typeof booleanChestPain !== 'boolean') {
            return res.status(400).json({ error: "Invalid chest pain value" });
        }
        if (!bloodPressureOrDiabetes || !['Yes', 'No', 'Not Sure'].includes(bloodPressureOrDiabetes)) {
            return res.status(400).json({ error: "Invalid blood pressure/diabetes value" });
        }
        const prompt = `
        You are a medical assistant. Based on the following user's lifestyle and health data, predict if they are at risk of heart disease.
        
        If they are at risk, suggest the most likely type of heart disease from these: 
        - Coronary Artery Disease
        - Heart Failure
        - Arrhythmia
        - Heart Valve Disease
        - Cardiomyopathy
        
        Respond in this exact JSON format:
        {
          "atRisk": "Yes" or "No",
          "possibleDiseases": ["disease1", "disease2"] or []
        }
        
        User Data:
        Age: ${age}
        Gender: ${gender}
        Exercise Frequency: ${exerciseFrequency}
        Smoke: ${booleanSmoke ? 'Yes' : 'No'}
        Fast Food Consumption: ${fastFoodFrequency}
        Stress Level: ${stressLevel}
        Sleep Hours: ${sleepHours}
        Family History of Heart Disease: ${familyHistory}
        Chest Pain or Discomfort: ${booleanChestPain ? 'Yes' : 'No'}
        High Blood Pressure or Diabetes: ${bloodPressureOrDiabetes}
        `;

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile", 
            messages: [
                { role: "system", content: "You are a heart disease prediction assistant." },
                { role: "user", content: prompt }
            ]
        });

        
        const llmResult = completion.choices[0]?.message?.content?.trim();
        if (!llmResult) {
            return res.status(500).json({ error: "No result from the model" });
        }
        const cleanResult = llmResult.replace(/`/g, '');

        try {
            const prediction = JSON.parse(cleanResult);

            res.json({ prediction });
        } catch (parseError) {
            return res.status(500).json({ error: "Failed to parse model response" });
        }

    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Something went wrong." });
    }
});




module.exports = router;

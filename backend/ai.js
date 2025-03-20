const express = require("express");
const router = express.Router();
const axios = require("axios");
///curl -X POST "http://localhost:4000/ai" -H "Content-Type: application/json" -d "{\"features\": [81, 0, 3, 107, 297, 1, 1, 179, 1, 1.194321572, 2, 2, 0]}"
//{"predicted_class":0}

///curl -X POST "http://localhost:4000/ai" -H "Content-Type: application/json" -d "{\"features\": [63, 1, 3, 145, 233, 1, 0, 150, 0, 2.3, 0, 0, 1]}"
///{"predicted_class":1}


///curl -X POST "http://localhost:4000/ai" -H "Content-Type: application/json" -d "{\"features\": [63, 1, 2, 105, 294, 0, 0, 137, 1, 2.3, 1, 1, 2]}"
//{"predicted_class":2}

///curl -X POST "http://localhost:4000/ai" -H "Content-Type: application/json" -d "{\"features\": [84, 1, 3, 170, 262, 0, 1, 96, 1, 1, 2, 0, 2]}"
//{"predicted_class":3}

///curl -X POST "http://localhost:4000/ai" -H "Content-Type: application/json" -d "{\"features\": [63, 1, 2, 145, 233, 1, 1, 150, 1, 1.3, 2, 3, 3]}"
///{"predicted_class":4}
router.post("/", async (req, res) => {
    try {
        const { features } = req.body;

        if (!features || !Array.isArray(features)) {
            return res.status(400).json({ error: "Invalid input format" });
        }

        const response = await axios.post("http://localhost:8000/predict", { features });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({
            error: "Prediction error",
            details: error.response ? error.response.data : error.message
        });
    }
});

module.exports = router;

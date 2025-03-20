const express = require("express");
const router = express.Router();
const axios = require("axios");
///curl -X POST "http://localhost:4000/ai" -H "Content-Type: application/json" -d "{\"features\": [63, 1, 3, 145, 233, 1, 0, 150, 0, 2.3, 0, 0, 1]}"

///curl -X POST "http://localhost:4000/ai" -H "Content-Type: application/json" -d "{\"features\": [63, 1, 3, 145, 233, 1, 0, 150, 0, 2.3, 0, 0, 1]}"
///{"predicted_class":1}
router.post("/", async (req, res) => {
    try {
        const { features } = req.body;

        if (!features || !Array.isArray(features)) {
            return res.status(400).json({ error: "Invalid input format" });
        }

        // Send request to Python prediction server
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

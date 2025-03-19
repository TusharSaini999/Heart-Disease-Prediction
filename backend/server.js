const express = require("express");
const cors = require("cors");


const { loadModel } = require("./heart-disease-model/model");
const routes = require("./ai");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", routes);

const PORT = 4000;
app.listen(PORT, async () => {
    await loadModel();
    console.log(`Server running on port ${PORT}`);
});

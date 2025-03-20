const express = require("express");
const cors = require("cors");

const routes = require("./ai");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/ai", routes);

const PORT = 4000;
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
});

const express = require("express");
const app = express();
const PORT = 4000;

const apiRoutes = require("./api");

app.use("/api", apiRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

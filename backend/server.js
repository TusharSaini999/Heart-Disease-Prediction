const express = require("express");
const cors = require("cors");
require("dotenv").config();

const routes = require("./ai");
const auth = require("./authentication");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/ai", routes);
app.use("/auth", auth);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("InfluEra Backend is up and running!✨");
});

module.exports = app;

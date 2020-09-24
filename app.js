const express = require("express");
const mongoose = require("mongoose");

const app = express();
mongoose.connect("mongodb://127.0.0.1:27017", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

app.post("/login", (req, res) => {
  const { username, password } = req.query;
  if (!username || !password) {
    res.status(400).send({ error: "Username or password missing" });
  }
});

app.listen(3000);
console.log("The app is listening on port 3000");

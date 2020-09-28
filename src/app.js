import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";

import User from "./models/user";
import mongoConnect from "./helpers/mongo/connect";
import registerUser from "./helpers/mongo/registerUser";
import isValidPassword from "./helpers/mongo/isValidPassword";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = mongoConnect();

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send({ error: "Username or password missing" });
    return;
  }
  const isExistingUser = await User.findOne({ name: username });
  if (isExistingUser) {
    res.status(409).send({ error: "Username already exists." });
    return;
  }
  await registerUser({ db, username, password });
  res.status(200).send({ success: "All good" });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send({ error: "Username or password missing" });
    return;
  }
  const hasValidPassword = await isValidPassword({ username, password });
  if (!hasValidPassword) {
    res.status(404).send({ error: "Unsuccessful login." });
    return;
  }
  res.status(200).send({ success: "Successful login." });
});

app.listen(3000);
console.log("The app is listening on port 3000");

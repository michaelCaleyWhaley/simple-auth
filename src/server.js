import express from "express";
import bodyParser from "body-parser";

import User from "./models/user";
import { appPort } from "../config";
import mongoConnect from "./helpers/mongo/connect";
import registerUser from "./helpers/mongo/registerUser";
import validateUser from "./helpers/mongo/validateUser";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = mongoConnect();

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send({ error: "Username or password missing." });
    return;
  }
  const isExistingUser = await User.findOne({ name: username });
  if (isExistingUser) {
    res.status(409).send({ error: "Username already exists." });
    return;
  }
  const newUser = await registerUser({ db, username, password });
  res
    .header("x-auth", newUser.accessToken)
    .status(200)
    .send({ success: "User registered." });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send({ error: "Username or password missing." });
    return;
  }
  const validatedUser = await validateUser({ username, password });
  if (!validatedUser.result) {
    res.status(404).send({ error: "Unsuccessful login." });
    return;
  }

  res
    .header("x-auth", validatedUser.updatedUser.accessToken)
    .status(200)
    .send({ success: "Successful login." });
});

app.get("/test", () => {});

app.listen(appPort);
console.log(`The app is listening on port ${appPort}.`);

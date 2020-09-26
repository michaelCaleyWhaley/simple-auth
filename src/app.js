import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import mongoConnect from "./helpers/mongo/connect";
import registerUser from "./helpers/mongo/registerUser";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send({ error: "Username or password missing" });
    return;
  }

  const db = mongoConnect();

  await registerUser({ db, userName: username, password });

  
  res.status(200).send({ success: "All good" });
});

app.listen(3000);
console.log("The app is listening on port 3000");

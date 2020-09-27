import express from "express";
import bodyParser from "body-parser";

import User from "./models/user";
import mongoConnect from "./helpers/mongo/connect";
import registerUser from "./helpers/mongo/registerUser";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(`req: `, req);

  console.log("Time: %d", Date.now());
  next();
});

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

app.listen(3000);
console.log("The app is listening on port 3000");

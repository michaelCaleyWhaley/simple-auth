import express from "express";
import bodyParser from "body-parser";

import User from "./models/user";
import mongoConnect from "./helpers/mongo/connect";
import registerUser from "./helpers/mongo/registerUser";

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

// app.post("/login", async (req, res) => {
//   const { username, password } = req.body;
//   if (!username || !password) {
//     res.status(400).send({ error: "Username or password missing" });
//     return;
//   }

//   const existingUser = await User.findOne({ name: username });
//   if (!existingUser) {
//     res.status(409).send({ error: "Username does not exist." });
//     return;
//   }

//   if (password === existingUser.password) {
//     res.status(200).send({ success: "Successful login." });
//     return;
//   }

//   res.status(400).send({ error: "Unknown error." });
// });

app.listen(3000);
console.log("The app is listening on port 3000");

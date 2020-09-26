import express from "express";
import mongoConnect from "./helpers/mongo/connect";
import registerUser from "./helpers/mongo/registerUser";

const app = express();

app.post("/login", async (req, res) => {
  const { username, password } = req.query;
  if (!username || !password) {
    res.status(400).send({ error: "Username or password missing" });
    return;
  }

  await mongoConnect(({ mongoose, db }) => {
    return registerUser({ mongoose, db });
  });

  res.status(200).send({ success: "All good" });
});

app.listen(3000);
console.log("The app is listening on port 3000");

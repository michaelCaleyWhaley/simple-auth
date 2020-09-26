import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
});
const User = mongoose.model("user", userSchema);

export default async ({ db, userName, password }) => {
  await db.once("open", async () => {
    const newUser = new User({ name: userName });

    const savedUser = await newUser.save();
    console.log(`savedUser: `, savedUser);

    mongoose.disconnect();
  });
};

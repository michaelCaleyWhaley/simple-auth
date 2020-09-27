import User from "../../models/user";
import encryptPassword from "./encryptPassword";

export default async ({ username, password }) => {
  const newUser = new User({
    name: username,
    password: encryptPassword(password),
  });
  const savedUser = await newUser.save();
  return savedUser;
};

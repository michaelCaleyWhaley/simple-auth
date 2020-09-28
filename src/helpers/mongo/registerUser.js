import User from "../../models/user";
import signJWT from "./signJWT";

export default async ({ username, password }) => {
  const newUser = new User({
    name: username,
    password,
    accessToken: signJWT(username),
  });
  const savedUser = await newUser.save();
  return savedUser;
};

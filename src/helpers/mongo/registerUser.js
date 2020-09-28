import User from "../../models/user";

export default async ({ username, password }) => {
  const newUser = new User({
    name: username,
    password,
  });
  const savedUser = await newUser.save();
  return savedUser;
};

import bcrypt from "bcrypt";
import User from "../../models/user";

export default async ({ username, password }) => {
  const existingUser = await User.findOne({ name: username });
  const result = await bcrypt.compare(password, existingUser.password);
  return result;
};

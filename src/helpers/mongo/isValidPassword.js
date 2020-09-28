import bcrypt from "bcrypt";
import User from "../../models/user";

export default async ({ username, password }) => {
  const existingUser = await User.findOne({ name: username });
  if (!existingUser) {
    return false;
  }
  const result = await bcrypt.compare(password, existingUser.password);
  return result;
};

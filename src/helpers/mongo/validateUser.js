import bcrypt from "bcrypt";
import User from "../../models/user";
import signJWT from "./signJWT";

export default async ({ username, password }) => {
  const existingUser = await User.findOne({ name: username });
  if (!existingUser) {
    return { result: false };
  }

  const updatedUser = await User.findOneAndUpdate(
    { name: username },
    {
      accessToken: signJWT(username),
    }
  );

  const result = await bcrypt.compare(password, existingUser.password);
  return { result, updatedUser };
};

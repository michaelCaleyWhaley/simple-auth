import User from "../../models/user";

export default async (accessToken) => {
  console.log(`accessToken: `, accessToken);

  const existingUser = await User.findOne({ accessToken });
  if (!existingUser) {
    return { result: false };
  }
  return existingUser;
};

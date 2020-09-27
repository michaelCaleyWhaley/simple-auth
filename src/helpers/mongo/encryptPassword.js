import bcrypt from "bcrypt";
const saltRounds = 10;

export default (password) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
};

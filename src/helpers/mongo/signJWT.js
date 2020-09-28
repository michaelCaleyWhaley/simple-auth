import jwt from "jsonwebtoken";
import { jwtSecret } from "../../../config";

export default (username) =>
  jwt.sign({ username }, jwtSecret, { expiresIn: "6h" });

import jwt from "jsonwebtoken";
import { jwtSecret } from "../../../config";

export default (token) => jwt.verify(token, jwtSecret);

import readCookie from "../helpers/cookie/readCookie";
import findUserByAccessToken from "../helpers/mongo/findUserByAccessToken";

const emitUnauthResponse = (res) => {
  res.status(404).send({ error: "Credentials not recognised." });
};

export default async (req, res, next) => {
  if (!req.headers.cookie) {
    emitUnauthResponse(res);
    return;
  }

  const xAuth = readCookie(req.headers.cookie, "x-auth");
  if (xAuth) {
    const user = await findUserByAccessToken(xAuth);
    console.log(`user: `, user);

    next();
    return;
  }
  emitUnauthResponse(res);
};

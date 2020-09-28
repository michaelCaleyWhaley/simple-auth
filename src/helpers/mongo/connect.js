import mongoose from "mongoose";

import { mongoUri } from "../../../config";

export default () => {
  mongoose
    .connect(mongoUri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    })
    .catch((e) => {
      console.log(`error: `, e);
    });

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error:"));

  return db;
};

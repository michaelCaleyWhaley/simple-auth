import mongoose from "mongoose";

export default () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .catch((e) => {
      console.log(`error: `, e);
    });

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error:"));

  return db;
};

import mongoose from "mongoose";

export default async (callback) => {
  await mongoose.connect("mongodb://127.0.0.1:27017", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error:"));
console.log(`LOG: 1`);
  await callback({ mongoose, db });

  // mongoose.disconnect();
};

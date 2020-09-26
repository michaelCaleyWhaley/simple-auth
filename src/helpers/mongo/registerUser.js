export default ({ mongoose, db, userName, password }) => {
  db.once("open", async () => {
    console.log(`LOG: two`);

    const kittySchema = new mongoose.Schema({
      name: String,
    });
    const Kitten = mongoose.model("Kitten", kittySchema);

    const fluffy = new Kitten({ name: "Sophie" });
    // fluffy.save(function (err, fluffy) {
    //   if (err) return console.error(err);
    //   res.send("hello world");
    // });
    await fluffy.save();
    return;
  });
};

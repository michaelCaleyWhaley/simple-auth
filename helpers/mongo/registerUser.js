export default (userName, password) => {
  
  
  db.once("open", async () => {
    console.log(`LOG: two`);

    const kittySchema = new mongoose.Schema({
      name: String,
    });
    const Kitten = mongoose.model("Kitten", kittySchema);

    const fluffy = new Kitten({ name: "Michael" });
    // fluffy.save(function (err, fluffy) {
    //   if (err) return console.error(err);
    //   res.send("hello world");
    // });
    await fluffy.save();
  });
};

module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    date: { type: Date },
    week: { type: String },
    items: [{ type: String, default: ["地"] }],
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  });
  // schema.method("toJSON", function () {
  //   const { __v, _id, ...object } = this.toObject();
  //   object.id = _id;
  //   return object;
  // });
  const Cleaning = mongoose.model("Cleaning", schema);
  return Cleaning;
};

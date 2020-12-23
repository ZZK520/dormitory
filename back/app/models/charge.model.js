module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    date: { type: Date },
    amount: { type: Number },
    items: [{ type: String, default: ["水费"] }],
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
  const Charge = mongoose.model("Charge", schema);
  return Charge;
};

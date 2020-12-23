module.exports = (mongoose) => {
    var schema = mongoose.Schema({
      checkDate: { type: Date },
      check: { type: String ,default:"A payed 0;B payed 0;C payed 10;D payed 160;E payed 0;"},
      details:[{afford:{type:String},gain:{type:String},amount:{type:Number}}]
    });
    // schema.method("toJSON", function () {
    //   const { __v, _id, ...object } = this.toObject();
    //   object.id = _id;
    //   return object;
    // });
    const CheckCharge = mongoose.model("CheckCharge", schema);
    return CheckCharge;
  };
  
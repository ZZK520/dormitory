module.exports = (mongoose) => {
const bcrypt = require("bcryptjs");

    var schema = mongoose.Schema(
      {
        name:{type: String,default:'individual'},
        bedNumber: {type:String},
        password:{type: String,default: bcrypt.hashSync('123456',8)},
        cleanings: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cleaning",
          },
        ],
        charges: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Charge",
          },
        ],
      },
      // { timestamps: true }
    );
    // if (!schema.options.toObject) schema.options.toObject = {};
    // schema.options.toObject.transform = function (doc, ret, options) {
    //   // remove the _id of every document before returning the result
    //   delete ret.__v;
    //   return ret;
    // }
    // schema.method("toJSON", function() {
    //   const { _id, ...object } = this.toObject();
    //   object.id = _id;
    //   return object;
    // });
    const User = mongoose.model("User", schema);
    return User;
  };
  
const db = require("../../models");

const createCharge = function (charge) {
    return db.charge.create(charge).then(function (docCharge) {
    
      return docCharge;
    });
  };
  const findAll = function () {
    return db.charge.find({}, "-__v").populate("users", "-_id -__v -password").then(function (doc) {
      return doc
    })
  }
module.exports={createCharge,findAll}

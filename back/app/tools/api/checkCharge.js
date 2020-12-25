const db = require("../../models");

const createCheckCharge = function (checkCharge) {
    return db.checkCharge.create(checkCharge).then(function (doc) {
    
      return doc;
    });
  };
  const findAll = function () {
    return db.checkCharge.find({}, "-__v").then(function (doc) {
      return doc
    })
  }
module.exports={createCheckCharge,findAll}


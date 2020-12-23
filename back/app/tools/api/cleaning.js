const db = require("../../models");

const createCleaning = function(cleaning) {
    return db.cleaning.create(cleaning).then(docCleaning => {
      return docCleaning;
    });
  };
  const findAll = function () {
    return db.cleaning.find({}, "-__v").populate("users", "-_id -__v -password").then(function (doc) {
      return doc
    })
  }
module.exports={createCleaning,findAll}
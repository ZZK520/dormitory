const db = require("../models");
const dayjs = require("dayjs");
var customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);
const { findUser,findUsers } = require("../tools/api/user")



exports.findAllSort = async (req, res) => {
  const respondData = {
    status: 200,
    data: {},
    error: "",
    msg: "",
  };
  const findSort = function () {
    //-1降序，1升序
    // return db.cleaning.find({date:{$gte:new Date('2019-01-25'),}}).sort({ date: -1 }).then(function (doc) {
    return db.cleaning.find({ date: { $lte: dayjs() } }).sort({ date: 1 }).then(function (doc) {

      return doc
    })
  }
  try {
    let data = await findSort();
    console.log('data', data);
    respondData.data = data
  } catch (error) {
    respondData.error = error
  }
  return res.json(respondData)
}
exports.findAll = async (req, res) => {
  const respondData = {
    status: 200,
    data: {},
    error: "",
    msg: "",
  };

  try {
    let data = await findUsers();
    // console.log('data', data);
    respondData.data = data
  } catch (error) {
    respondData.error = error
  }
  return res.json(respondData)
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  
};

const db = require("../models");
const dayjs = require("dayjs");
var customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);
const { findUser } = require("../tools/api/user")
const { createCleaning,findAll } = require("../tools/api/cleaning")

const { addCleaningToUser, addUserToCleaning } = require("../tools/api/addAtoB")

exports.create = async (req, res) => {
  const respondData = {
    status: 200,
    data: {},
    error: "",
    msg: "",
  };
  try {
    let { time, user, week, cleaningItems } = req.body;
    console.log(time);
    console.log(week);
    console.log(user);
    console.log(cleaningItems);
    const user1 = await findUser({ name: user });
    console.log('user1', user1);

    let itemA = await createCleaning({
      date: time,
      items: cleaningItems,
      week
    });
    console.log("\n>> itemA:\n", itemA);

    let cleaning = await addUserToCleaning(itemA._id, user1);
    console.log("\n>> cleaning:\n", cleaning);

    user = await addCleaningToUser(user1._id, cleaning);
    console.log("\n>> user:\n", user);
    // console.log("\n>> itemA:\n", cleaning);
  } catch (error) {
    console.log('error', error);
    respondData.status = 400;
    respondData.msg = "创建失败";
    respondData.error = error;
    return res.json(respondData);

  }

  respondData.data = '1111';
  respondData.msg = "创建成功";
  return res.json(respondData);
};

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
// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
  const respondData = {
    status: 200,
    data: {},
    error: "",
    msg: "",
  };
  /**
   * {
      path: "users", // populate users
      populate: {
         path: "cleanings" // in users, populate cleanings
      }
   }
   */
  // const findAll = function () {
  //   return db.cleaning.find({}, "-__v").populate("users", "-_id -__v").then(function (doc) {
  //     return doc
  //   })
  // }
  try {
    let data = await findAll();
    console.log('data', data);
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

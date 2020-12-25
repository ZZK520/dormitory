const db = require("../models");
const dayjs = require("dayjs");
var customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);
const { createCharge,findAll } = require("../tools/api/charge")
const { findUser } = require("../tools/api/user")

const { addChargeToUser, addUserToCharge } = require("../tools/api/addAtoB")


exports.create = async (req, res) => {
  const respondData = {
    status: 200,
    data: {},
    error: "",
    msg: "",
  };
  try {
    let { time, user, amount, chargeItems } = req.body;
    // console.log(time);
    amount = parseInt(amount);
    // console.log(amount);
    // console.log(typeof amount);
    // console.log(user);
    // console.log(chargeItems);
    try {
      let user1 = await findUser({
        name: user,
      });
      // console.log("\n>> user1:\n", user1);

      
      let itemA = await createCharge({
        date: time,
        items: chargeItems,
        amount,
      });
      // console.log("\n>> itemA:\n", itemA);
      let charge = await addUserToCharge(itemA._id, user1);
      // console.log("\n>> charge:\n", charge);

      user = await addChargeToUser(user1._id, charge);
      // console.log("\n>> user:\n", user);
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

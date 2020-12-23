const db = require("../models");
const dayjs = require("dayjs");
var customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);
const { findUser } = require("../tools/api/user")
const { createCleaning,findAll } = require("../tools/api/cleaning")

const { addCleaningToUser, addUserToCleaning } = require("../tools/api/addAtoB")

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

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
  const id = req.params.id;

  Tutorial.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Tutorial with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Tutorial with id=" + id });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      } else res.send({ message: "Tutorial was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      } else {
        res.send({
          message: "Tutorial was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id,
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Tutorial.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Tutorials were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials.",
      });
    });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  Tutorial.paginate({ published: true }, { offset, limit })
    .then((data) => {
      res.send({
        totalItems: data.totalDocs,
        tutorials: data.docs,
        totalPages: data.totalPages,
        currentPage: data.page - 1,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

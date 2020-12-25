const db = require("../../models");

const addCleaningToUser = function (userId, cleaning) {
    return db.user.findByIdAndUpdate(
        userId,
        { $push: { cleanings: cleaning._id } },
        { new: true, useFindAndModify: false }
    );
};

const addUserToCleaning = function (cleaningId, user) {
    return db.cleaning.findByIdAndUpdate(
        cleaningId,
        { $push: { users: user._id } },
        { new: true, useFindAndModify: false }
    );
};

const addChargeToUser = function (userId, charge) {
    return db.user.findByIdAndUpdate(
      userId,
      { $push: { charges: charge._id } },
      { new: true, useFindAndModify: false }
    );
  };

  const addUserToCharge = function (chargeId, user) {
    return db.charge.findByIdAndUpdate(
      chargeId,
      { $push: { users: user._id } },
      { new: true, useFindAndModify: false }
    );
  };

module.exports={
    addCleaningToUser,
    addUserToCleaning,
    addChargeToUser,
    addUserToCharge
}
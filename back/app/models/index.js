const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.user=require("./user.model")(mongoose)
db.cleaning=require("./cleaning.model")(mongoose)
db.charge=require("./charge.model")(mongoose)
db.checkCharge=require("./checkCharge.model")(mongoose)



module.exports = db;
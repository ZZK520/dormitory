require('./app/config/db.config');
const express = require("express");
const bodyParser = require("body-parser");
const history = require('connect-history-api-fallback');
const cors = require("cors");
const app = express();
const path=require('path');
app.use(history());
app.use(cors());
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.resolve(__dirname, './dist')))
// app.get('/', function(req, res) {
//   const html = fs.readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf-8')
//   res.send(html)
// })
require("./app/routes/cleaning.routes")(app)
require("./app/routes/charge.routes")(app)
require("./app/routes/auth.routes")(app)
require("./app/routes/user.routes")(app)



// set port, listen for requests
const PORT = process.env.PORT || 8006;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const mongoose = require("mongoose");
const db = require("./app/models");

const createUser = function(user) {
  return db.user.create(user).then(docUser => {
    console.log("\n>> Created user:\n", docUser);
    return docUser;
  });
};
const createCleaning = function(cleaning) {
  return db.cleaning.create(cleaning).then(docCleaning => {
    console.log("\n>> Created cleaning:\n", docCleaning);
    return docCleaning;
  });
};


const addCleaningToUser = function(userId, cleaning) {
  return db.user.findByIdAndUpdate(
    userId,
    { $push: { cleanings: cleaning._id } },
    { new: true, useFindAndModify: false }
  );
};

const addUserToCleaning = function(cleaningId, user) {
  return db.cleaning.findByIdAndUpdate(
    cleaningId,
    { $push: { users: user._id } },
    { new: true, useFindAndModify: false }
  );
};

const run = async function() {
  var user1 = await createUser({
    name: "ABC",
    bedNumber: "A"
  });

  var itemA = await createCleaning({
    items: ["地"]
  });
  var itemB = await createCleaning({
    items: ["地","池"]
  });


  var user = await addCleaningToUser(user1._id, itemA);
  console.log("\n>> user1:\n", user);

  var cleaning = await addUserToCleaning(itemA._id, user1);
  console.log("\n>> itemA:\n", cleaning);

  user = await addCleaningToUser(user1._id, itemB);
  console.log("\n>> user1:\n", user);

  cleaning = await addUserToCleaning(itemB._id, user1);
  console.log("\n>> itemB:\n", cleaning);
 
  var user2 = await createUser({
    name: "BCD",
    bedNumber: "B"
  });

   user = await addCleaningToUser(user2._id, itemB);
  console.log("\n>> user2:\n", user);

   cleaning = await addUserToCleaning(itemB._id, user2);
  console.log("\n>> itemB:\n", cleaning);

};
// run();
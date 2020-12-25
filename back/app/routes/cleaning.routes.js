module.exports = app => {
  const cleaning = require("../controllers/cleaning.controller.js");
  
  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/api/add-cleaning", cleaning.create);

   // 返回排序过的
   router.get("/api/get-sort-cleaning", cleaning.findAllSort);

  // Retrieve all cleaning
  router.get("/api/get-cleaning", cleaning.findAll);

  // Retrieve all published cleaning
  router.get("/published", cleaning.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", cleaning.findOne);

  // Update a Tutorial with id
  router.put("/:id", cleaning.update);

  // Delete a Tutorial with id
  router.delete("/:id", cleaning.delete);

  // Create a new Tutorial
  router.delete("/", cleaning.deleteAll);

  app.use(router);
};

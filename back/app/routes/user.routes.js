module.exports = app => {
    const user = require("../controllers/user.controller.js");
    
    var router = require("express").Router();
  
     // 返回排序过的
     router.get("/api/get-sort-user", user.findAllSort);
  
    // Retrieve all user
    router.get("/api/get-user", user.findAll);
  
    // Retrieve all published user
    router.get("/published", user.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", user.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", user.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", user.delete);
  
    // Create a new Tutorial
    router.delete("/", user.deleteAll);
  
    app.use(router);
  };
  
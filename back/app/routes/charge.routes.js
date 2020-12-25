module.exports = app => {
    const charge = require("../controllers/charge.controller.js");
    const checkCharge = require("../controllers/checkCharge.controller.js");
    
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/api/add-charge", charge.create);
  
     // 返回排序过的
     router.get("/api/get-sort-charge", charge.findAllSort);
  
    // Retrieve all charge
    router.get("/api/get-charge", charge.findAll);
    // 添加缴费总表
    router.post("/api/add-checkCharge", checkCharge.create);
    // 查找缴费总表
    router.get("/api/get-checkCharge", checkCharge.findAll);


    // Retrieve all published charge
    router.get("/published", charge.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", charge.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", charge.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", charge.delete);
  
    // Create a new Tutorial
    router.delete("/", charge.deleteAll);
  
    app.use(router);
  };
  
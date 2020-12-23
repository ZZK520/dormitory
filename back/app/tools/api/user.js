const db = require("../../models");

const findUser=function(query,filted){
    return db.user.findOne(query,"-password").then((result) => {
        return result
    }).catch((err) => {
        console.log(`findUser——${err}`);
    });
}
const findUsers=function(query={},filted){
    return db.user.find(query,"-password").then((result) => {
        return result
    }).catch((err) => {
        console.log(`findUsers——${err}`);
    });
}

module.exports={
    findUser,findUsers
}
var mongoose = require("mongoose"); //引入mongoose
const {LOCAL_CONFI,ONLINE_CONFI}=require("../../config/db.config")
mongoose.connect(LOCAL_CONFI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}); 

var db = mongoose.connection;
db.on('error', function callback() { //监听是否有异常
    console.log("Connection error");
});
db.once('open', function callback() { //监听一次打开
    //在这里创建你的模式和模型
    console.log('Yes connected!');
});


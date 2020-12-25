const db = require("../models");
const dayjs = require("dayjs");
var customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);
// const glue=require("../tools/webassembly/dormitory");//浏览器环境

const glue = require("../tools/webassembly/module/dormitory");//node中module模块
const { createCheckCharge,findAll } = require("../tools/api/checkCharge")
// let func;
// glue.onRuntimeInitialized = () => {
//     console.log('Initialized Finish!');
//     // let h = cm.ccall('my_add','string',['string'],[a]);
//      func=glue.cwrap('my_add','string',['string']);
// };
exports.create = async (req, res) => {
    const respondData = {
        status: 200,
        data: {},
        error: "",
        msg: "",
    };
    const { data } = req.body;
    console.log('data', data);
    const dealPay = function (data) {
        let finalStr = '';
        dataArray = [];
        // console.log('data', data);
        Object.keys(data).forEach((value, index, array) => {
            let s = "";
            // console.log('value',value);
            s = `${value} payed ${data[value]};`
            dataArray.push(s);
        })
        console.log('dataArray', dataArray);
        finalStr = dataArray.join('');
        return finalStr;
    };
    let finalStr = '';
    finalStr = dealPay(data);

    try {
        console.log('coming');
        const item = await glue().then((instance) => {
            // console.log('instance',instance);
            // console.log('instance._my_add',instance._my_add.toString());
            let data = '';
            let cwrap = instance.cwrap('my_add', 'string', ['string']);
            data = cwrap(finalStr);
            console.log('data-cwrap', data);
            console.log(typeof data);
            let temp = []
            temp = data.split(';');
            temp.splice(temp.length - 1, 1);
            console.log(temp);
            let arrObj = [];
            temp.forEach((item) => {
                let obj = { afford: '', gain: '', amount: 0 };
                let temp_comma = item.split(',');
                console.log(temp_comma);
                obj.afford = temp_comma[0]
                obj.gain = temp_comma[1]
                obj.amount = temp_comma[2]
                arrObj.push(obj);
            })
            console.log(arrObj);
            let item = {
                checkDate: dayjs(),
                check: finalStr,
                details: arrObj
            }
            return item;
            // let ccall=instance.ccall('my_add','string',['string'],[finalStr]);
            // data=ccall;
            // console.log('data-ccall',data);
        });
        console.log('ending');
        console.log(item);
        let checkCharge=await createCheckCharge(item);
        respondData.data=checkCharge;
    } catch (error) {
        console.log('error', error);
        respondData.status = 400;
        respondData.msg = "创建失败";
        respondData.error = error;
        return res.json(respondData);
    }

    respondData.msg = '添加收费总表';
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

exports.findAll = async (req, res) => {
    const respondData = {
        status: 200,
        data: {},
        error: "",
        msg: "",
    };
  
    try {
        let data = await findAll();
        // console.log('data', data);
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

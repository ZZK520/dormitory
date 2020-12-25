const dayjs =require('dayjs') 
const jwt =require('jsonwebtoken')
const config = require("../../config/auth.config");


// 控制普通token，客户端过期后无需再次登录
exports.getToken = function (payload) {
  return jwt.sign({
    user: payload,
    exp: dayjs().add(1, 'd').valueOf(),//一次一天
    tag:'accessToken'
  }, config.secret)
}

// // 控制客户端最长登陆时间，超时重新登录
// exports.getRefreshToken = function (payload) {
//   return jwt.sign({
//     user: payload, // 这里放入一点用户信息，刷新的时候用来查数据库，简单的验证一下。
//     exp: dayjs().add(15, 'd').valueOf(),
//     tag:'refreshToken'
//   }, config.secret)
// }




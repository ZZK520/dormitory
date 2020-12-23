const DB_NAME='dormitory'
const DB_BASEURL_LOCAL='localhost' 
const DB_BASEURL_ONLINE='106.13.182.155' 

const DB_PORT_ONLINE='27071';//远程连接,nginx做了映射
const DB_PORT_LOCAL='27027';//本地连接

const USERNAME='ZZK';
const PASSWORD='dormitoryPWD';
const ONLINE_CONFI=`mongodb://${USERNAME}:${PASSWORD}@${DB_BASEURL_ONLINE}:${DB_PORT_ONLINE}/${DB_NAME}`//生产环境，线上
const LOCAL_CONFI=`mongodb://${DB_BASEURL_LOCAL}:${DB_PORT_LOCAL}/${DB_NAME}`//开发环境,本地，无密码可登录

exports.ONLINE_CONFI=ONLINE_CONFI;
exports.LOCAL_CONFI=LOCAL_CONFI;


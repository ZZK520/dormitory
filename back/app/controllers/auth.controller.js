const dayjs = require("dayjs");
const bcrypt = require("bcryptjs");

exports.signin = async(req, res) => {
  let data=req.body;
  console.log('req.body',data);
    const respondData = {
      status: 200,
      data: {},
      error: "",
      msg: "",
    };
    // return res.json(respondData);
  
    User.findOne({
      name: req.body.email,
    })
      .populate("roles", "-__v")
      .exec((err, user) => {
        if (err) {
          respondData.status=500;
          respondData.msg=err;
          return res.json(respondData)
  
        }
  
        if (!user) {
          respondData.status=404;
          respondData.msg='User Not found.';
          return res.json(respondData)
        }
        console.log("req.body.password", req.body.password);
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
  
        if (!passwordIsValid) {
          respondData.status=401;
          respondData.data.accessToken=null;
          respondData.msg="Invalid Password!";
          return res.json(respondData)
       
        }
  
        var authorities = [];
  
        for (let i = 0; i < user.roles.length; i++) {
          authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
        }
        
        const token = getToken(user.email);
        const refreshToken = getRefreshToken(user.email);
        const result = {
          id: user._id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
          refreshToken: refreshToken,
        };
       
        if(req.body.tag==='refreshToken'){
          result.refreshToken='No need for refresh'
        }
        respondData.status=200;
        respondData.data=result;
        respondData.msg='登录成功';
        return res.json(respondData);
  
      });
  };
  
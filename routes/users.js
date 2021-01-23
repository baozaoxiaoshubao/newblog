var express = require('express');
const { Schema } = require('mongoose');
var router = express.Router();



//将用户模板导入
let User = require('../models/user')


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
//实现用户提交信息，注册事项
//Response   相应
//Request    请求
router.post('/addUser', (req, res, next) => {
  console.log(req.body);
  //console.log(req.body);
  //用户填写的表单信息可以通过req.body.userName获取
  //res.send('点击注册了')



  //向用户数据库添加用户信息
  let userInfo = {
    userName: req.body.userName,
    password: req.body.password,
    passwordC: req.body.passwordC,
  }
  //页面表单数据，放入模型
  let userI = new User(userInfo)


  //保存
  userI.save((err, result)=> {
    if (!err) {
      res.send(result)
    }
  })


})





module.exports = router;

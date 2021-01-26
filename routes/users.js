var express = require('express');
const { Schema } = require('mongoose');
var router = express.Router();
let Joi = require('joi');


//将用户模板导入
let User = require('../models/user');
const { schema } = require('../models/user');


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
//实现用户提交信息，注册事项
//Response   相应
//Request    请求
router.post('/addUser', async (req, res, next) => {
  // console.log(req.body);
  //console.log(req.body);
  //用户填写的表单信息可以通过req.body.userName获取
  //res.send('点击注册了')



  //向用户数据库添加用户信息
  let userInfo = {
    userName: req.body.userName,
    password: req.body.password,
    passwordC: req.body.passwordC,
  }

  // const scheam = Joi.object({
  //   userName: Joi.string().min(2).max(12).required().error(new Error('用户名不符合验证规则')),
  //   password: Joi.string().regex('^[a-zA-Z0-9]{3,30}$').required().error(new Error('密码格式不符合要求')),
  //   passwordC: Joi.ref('password'),
  // }) 


  // try {
  //   const value = await schema.validateAsync(userInfo);
  // }
  // catch (err) {
  //   console.log(err.message);

  //   //res.render('error_alert', { message: err.message })
  // }
  const scheam = Joi.object({
    userName:Joi.string().min(2).max(12).required().error(new Error('用户名不符合验证规则')),
    password:Joi.string().regex('^[a-zA-Z0-9]{3,30}$').required().error(new Error('密码格式不符合要求')),
    passwordC:Joi.ref('password'),
  })

  try{
    const value = await schema.validateAsync(userInfo);

  }
  catch(err){
    console.log(err.message);
    res.render('error',{message:err.message})
  }
  // 用户密码与确认密码是否一致验证
  // if(userInfo.password !== userInfo.passwordC){
  // console.log('密码不一致')
  // let error ={
  //   status:0,//错误编码
  //   stack:''//错误代码
  // }
  //   res.render('error_alert',{error,message:'密码不一致'})
  // }






  //页面表单数据，放入模型
  let userI = new User(userInfo)


  //保存
  userI.save((err, result) => {
    if (!err) {
      res.send(result)
    }
  })


})
//登录-----查询
router.get('/login', (req, res, next) => {
  //从表单获取数据
  let uderinfo = {
    username: req.body.username,
    password: require.body.password
  }
  //验证
  //查询
  User.findOne(userinfo, (err, result) => {
    //错误处理
    if (err) {
      return console.log(err);
    }
    if (result == null) {
      console.log('登录失败');
      res.redirect('/zhuce');
    } else {
      console.log('登录成功');
      //路由重定向
      res.redirect('/')
    }
  })
  //查询到--登陆成功--跳转到首页
  //查询，重定向到注册页面，去测
})




module.exports = router;

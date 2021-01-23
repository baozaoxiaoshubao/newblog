var express = require('express');
var router = express.Router();

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

})
module.exports = router;

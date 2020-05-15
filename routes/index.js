var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var session = require('express-session');
//DB정보 명시
/*
var client = mysql.createConnection({
  user:'root',
  password:'qkrwnsah12#',
  port:'3305',
  database :'Company'
})
*/
var client = mysql.createConnection({
  user:'root',
  password:'qkrwnsah12#',
  port:'3305',
  database :'chat'
})

router.get('/', function(req, res, next) {
  console.log('req.session.loginID: ',req.session.loginID)
  let loginID = req.session.loginID==undefined?'':req.session.loginID;
    res.render('chat_main',{loginID:loginID});
})
router.use('/user',require('./user'));
router.use('/chat',require('./chat'))
/* GET home page. */
/*
router.get('/', function(req, res, next) {
  client.query('SELECT * FROM product',function (error, results) {
    res.render('list', { title: 'Express', data:results});
})

router.get('/delete/:id',function(req, res, next){
    client.query('DELETE FROM product WHERE id =?',[req.params.id],function () {
      res.redirect('/')
  })
})

router.get('/insert',function(req, res, next){
  res.render('insert',{title:'Insert new'})
})

router.post('/insert',function (req,res){
  var body = req.body

  client.query('INSERT INTO product (name, modelnumber,series) VALUES (?,?,?)',[body.name,body.modelnumber,body.series],
  function () {
      res.redirect('/')
  })
})
router.get('/edit/:id',function (req,res){
  client.query('SELECT * FROM product WHERE id = ?',[req.params.id],function (error, results) {
    res.render('edit',{data: results[0]})
  })
})
router.post('/edit/:id',function (req,res){
  var body = req.body

  client.query('UPDATE product SET name = ? , modelnumber = ? , series = ? WHERE id = ?',[
      body.name, body.modelnumber, body.series, req.params.id
  ])
  res.redirect('/')
})
});
*/
module.exports = router;

var express = require('express');
var router = express.Router();
var session = require('express-session');
var chatDAO = require('../dao/chatDAO');
//chat Test
router.get('/chatTest',function (req,res) {
    //let loginID = req.cookies.loginID;
    let loginID = req.session.loginID;
    if(loginID){
        if(req.cookies.room_name){
            res.render('chat/chatTest',{loginID:loginID,room_name:req.cookies.room_name})
        }else{
            res.redirect('/chat/chatRoom')
        }
    }else{
        res.clearCookie('room_name')
        res.redirect('/user/login')
    }
})

router.get('/chatRoom',function (req,res) {
    chatDAO.room_list(req.session.loginID,data=>{
        console.log(data);
        res.render('chat/chatRoom',{room_list:data});
    }
    );
})
router.post('/chatRoom',function (req,res) {
    res.cookie('room_name',req.body.room_name)
    res.redirect('/chat/chatTest');
})

router.post('/addChat',function (req,res) {
    chatDAO.add_one(req.body, function (data) {
        console.log(data.user_id+":"+data.contents)
        res.send(data);
    })
})

router.post('/chatList',function (req,res) {
    chatDAO.list_by_room(req.body.room, function (data) {
        res.send(data)
    })
})

module.exports = router;

var router = require('express').Router();
const crypto = require('crypto');
var userDAO = require('../dao/usersDAO');

const cryptoMY =  password => {
	crypto.randomBytes(64, (err, buf) => {
		const salt = buf.toString('base64')
		crypto.pbkdf2(password, salt, 100, 64, 'sha512', (err, key) =>{
            console.log(key.toString('base64'));
		})
	})
}

// req로 쓰이는건 login_id, session으로 쓰이는건 loginID
router.get("/login", function(req, res) {
     //cryptoMY('1234')

       
     console.log('req.session:',req.session)
      if(req.session.loginID!=undefined&&req.session.loginID!='undefined'&&req.session.loginID!=''){
          console.log(session.loginID,' logout')
          
          req.session.loginID = '';
          /*
          res.clearCookie('loginID');
          */
          //res.clearCookie('room_name');
          req.session.loginID = '';
          res.redirect('/');
      }else{
          res.render("user/login");
      }
  });
router.post("/login",function (req,res) {
    let id = req.body.login_id;
    let enc_pw =  crypto.createHash('sha512').update(req.body.login_pw).digest('base64');
    userDAO.get_by_id(id,function (data) {
        console.log(data);
        if(data.password == enc_pw){
            /*
            res.cookie('loginID',id,{
                maxAge: 1000*60*60
            });
            */
           req.session.loginID = id;
           //session.loginID = id;
           // console.log(req.cookies.loginID+' login')
        }
        res.redirect('/')
    })

})

router.get("/register", function(req, res) {
      if(req.session.loginID != ''||req.session.loginID!=undefined||req.session.loginID!='undefined'){
          /*
          console.log(req.cookies.loginID,' logout');
          res.clearCookie('loginID')
          */
         console.log(req.session.loginID,' logout');
         req.session.loginID = '';
      }
          res.render("user/register");
  });
router.post("/register",function (req,res) {
    let id = req.body.reg_id;    
    let enc_pw=crypto.createHash('sha512').update(req.body.reg_pw).digest('base64')
    
    
    userDAO.add_one({id:id,pw:enc_pw},function (data) {
        console.log(data);
    })
    res.redirect('/')
})  

router.post('/check_id',function(req,res){
    let id = req.body.reg_id;
    userDAO.get_by_id(id,function (data) {
        console.log(id);
        //console.log(data);
        res.send({data:data == 'invalid'});
    })
})

module.exports = router;
var mysql = require('mysql');

var pool = mysql.createPool({
	host:'localhost',
	user:'root',
	password:'qkrwnsah12#',
	port:'3305',
	database :'chat'
});

module.exports = pool

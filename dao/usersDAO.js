var publicDAO = require('./publicDAO')

module.exports = {

	get_by_id : function (id, callback) {
		let sql = "SELECT * FROM user WHERE id ='"+id+"'";
		publicDAO.selectOne(sql, function (result, data) {
			if(result == "success") {
				callback(data)
			} else {
				callback("invalid");
			}
		});
	},
	add_one : function(data,callback){
		let sql = "INSERT INTO user(id,password)"+
		"VALUES (?,?)";
		let values = [data.id,data.pw]
		publicDAO.change(sql,values,callback);
	},



}

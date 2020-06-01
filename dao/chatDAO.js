var publicDAO = require('./publicDAO')


module.exports = {

	
	add_one : function(data,callback){
		let sql = "INSERT INTO talk(room, contents, user_id) VALUES (?, ?,?)";
		console.log(data.contents+'   ADD')
		let values = [data.room, data.contents, data.user_id]
		publicDAO.change(sql,values,callback);
	},

	list_by_room :function (room,callback) {
		let sql = 'SELECT contents, user_id, DATE_FORMAT(send_date,"%Y-%m-%d %T") AS send_date FROM talk WHERE room = "'+room+'"';
		publicDAO.selectALL(sql, function (result, data) {
			if(result == "success") {
				callback(data)
			} else {
				callback("invalid");
			}
		})
	},
	room_list : function name(id,callback) {
		let sql= 'SELECT DISTINCT T.room FROM talk T WHERE T.user_id = "'+id+'"';
		publicDAO.selectALL(sql, function (result, data) {
			if(result == "success") {
				callback(data)
			} else {
				callback("invalid");
			}
		})		
	}

}

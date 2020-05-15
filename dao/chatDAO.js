var pool = require('./mysqlConnect');

function selectOne(sql, callback) {
	pool.getConnection( function(errpool, connection) {
		if(errpool) {
			console.log(errpool.message);
			callback("pool error", null);
			return;
		}

		connection.query(sql, function (errcon, result) {

			if(errcon) {
				console.log(errcon.message);
				callback("connection error", null);
				return;
			}

			resultCnt = result.length;
			if(resultCnt < 1) {
				callback("no result", null);
				return;
			}

			callback("success", result[0]);

		});

		connection.release();
	});
}

function selectALL(sql, callback) {
	pool.getConnection( function(errpool, connection) {
		if(errpool) {
			console.log(errpool.message);
			callback("pool error", null);
			return;
		}

		connection.query(sql, function (errcon, result) {

			if(errcon) {
				console.log(errcon.message);
				callback("connection error", null);
				return;
			}

			resultCnt = result.length;
			if(resultCnt < 1) {
				callback("no result", null);
				return;
			}

			callback("success", result);

		});

		connection.release();
	});
}

function change(sql,data, callback) {
	pool.getConnection( function(errpool, connection) {
		if(errpool) {
			console.log(errpool.message);
			callback("pool error", null);
			return;
		}

		connection.query(sql,data, function (errcon) {

			if(errcon) {
				console.log(errcon.message);
				callback("connection error", null);
				return;
			}

			//callback("success", result);

		});

		connection.release();
	});
}


module.exports = {

	
	add_one : function(data,callback){
		let sql = "INSERT INTO talk(room, contents, user_id) VALUES (?, ?,?)";
		console.log(data.contents+'   ADD')
		let values = [data.room, data.contents, data.user_id]
		change(sql,values,callback);
	},

	list_by_room :function (room,callback) {
		let sql = 'SELECT contents, user_id, DATE_FORMAT(send_date,"%Y-%m-%d %T") AS send_date FROM talk WHERE room = "'+room+'"';
		selectALL(sql, function (result, data) {
			if(result == "success") {
				callback(data)
			} else {
				callback("invalid");
			}
		})
	},
	room_list : function name(id,callback) {
		let sql= 'SELECT DISTINCT T.room FROM talk T WHERE T.user_id = "'+id+'"';
		selectALL(sql, function (result, data) {
			if(result == "success") {
				callback(data)
			} else {
				callback("invalid");
			}
		})		
	}

}

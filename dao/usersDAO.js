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

	get_by_id : function (id, callback) {
		let sql = "SELECT * FROM user WHERE id ='"+id+"'";
		selectOne(sql, function (result, data) {
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
		change(sql,values,callback);
	},



}

/**
 * New node file
 */

var ejs = require('ejs');// importing module ejs
var mysql = require('mysql');// importing module mysql
var pool = mysql.createPool({
	connectionLimit : 10,
	host : 'localhost',
	user : 'root',
	password : 'root',
	database : 'ebay',
	port : 3306
});

// fetching the data from the sql server
exports.fetchData = function(callback, sqlQuery) {

	console.log("\nSQL Query::" + sqlQuery);
	pool.getConnection(function(err, connection) {

		if (err) {
			console.log("ERROR: " + err.message);
		} else {
			// Use the connection

			connection.query(sqlQuery, function(err, rows, fields) {
				if (err) {
					console.log("ERROR: " + err.message);
				} else { // return err or result
					console.log("DB Results:" + rows);
					callback(err, rows);
				}
				connection.release();
			});

		}
	});

	console.log("\nConnection closed..");

};
exports.insertData = function(callback, sqlQuery) {

	console.log("\nSQL Query::" + sqlQuery);
	pool.getConnection(function(err, connection) {

		if (err) {
			console.log("ERROR: " + err.message);
		} else {
			// Use the connection

			connection.query(sqlQuery, function(err, rows, fields) {
				if (err) {
					console.log("ERROR: " + err.message);
				} else { // return err or result
					console.log("DB Results:" + rows);
					callback(err, rows);
				}
				connection.release();
			});

		}
	});

	console.log("\nConnection closed..");

};
exports.updateData = function(callback, sqlQuery) {

	console.log("\nSQL Query::" + sqlQuery);
	pool.getConnection(function(err, connection) {

		if (err) {
			console.log("ERROR: " + err.message);
		} else {
			// Use the connection

			connection.query(sqlQuery, function(err, rows, fields) {
				if (err) {
					console.log("ERROR: " + err.message);
				} else { // return err or result
					console.log("DB Results:" + rows);
					callback(err, rows);
				}
				connection.release();
			});

		}
	});

	console.log("\nConnection closed..");

};

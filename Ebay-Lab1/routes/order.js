/**
 * New node file
 */
var credit = require('./creditCard');
var mysql = require('./mysql');
var SimpleNodeLogger = require('simple-node-logger'),
opts = {
	logFilePath:'mylogfile.log',
	timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
},
log = SimpleNodeLogger.createSimpleLogger( opts );
var log = SimpleNodeLogger.createSimpleFileLogger('project.log');
exports.placeOrder = function(req, res) {

	if (req.session.email && req.session.name) {

		credit
				.valiadteCard(
						function(data) {
							if (data.statusCode == 200) {
								var insertOrder = "insert into orders(user_id,totalprice) values("
										+ req.session.id
										+ ","
										+ req.session.total + ")";
								var insertOrderItem;
								var updateAdvertisement;
								var updatedQty;
								
								
								mysql
										.insertData(
												function(err, results) {
													console.log("DB Results:"
															+ results);
													if (err) {
														throw err;
													} else {
														
														var currentCart = req.session.cartItems;
														console.log(results.insertId);
														for (var index = 0; index < currentCart.length; index++) {
															updatedQty = currentCart[index].itemquantity
																	- currentCart[index].quantity;
															insertOrderItem = "insert into orderitems(order_id,ad_id,quantity) values("
																	+ results.insertId
																	+ ","
																	+ currentCart[index].id
																	+ ","
																	+ currentCart[index].quantity
																	+ ")";

															updateAdvertisement = "update advertisements set itemquantity= "
																	+ updatedQty
																	+ " where id="
																	+ currentCart[index].id;
															
															mysql.insertData(function(err, results) {
																console.log("DB Results:" + results);
																if (err) {
																	throw err;
																} else {
																	mysql.updateData(function(err, results) {
																		console.log("DB Results:" + results);
																		if (err) {
																			throw err;
																		} else {
																			req.session.cartItems = [];
																			log.info("The user "+req.session.id+"placed an order");
																			json_responses = {
																				"statusCode" : 200
																			};
																			res.send(json_responses);
																		}
																	}, updateAdvertisement);
																}
															}, insertOrderItem);

														}

													}
												}, insertOrder);
							} else {
								res.send(data);
							}

						}, req);
		/*
		 * mysql.insertData(function(err, results) { console.log("DB Results:" +
		 * results); if (err) { throw err; } else { json_responses = {
		 * "statusCode" : 200 }; res.send(json_responses); } }, insertItem);
		 */

	} else {
		res.redirect('/');
		// res.render('login', { title: 'Login' });
	}

	// res.send(req.session.cartItems);
};

exports.confirmation = function(req, res) {
	// Checks before redirecting whether the session is valid
	if (req.session.email && req.session.name) {
		// Set these headers to notify the browser not to maintain any cache for
		// the page being loaded
		//res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.render("orderconfirmation", {
			name : req.session.name,
			lastlogin : req.session.lastlogin
		});
	} else {
		res.redirect('/');
		// res.render('login', { title: 'Login' });
	}
};

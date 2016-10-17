/**
 * New node file
 */

var mysql = require('./mysql');
var SimpleNodeLogger = require('simple-node-logger'),
opts = {
	logFilePath:'mylogfile.log',
	timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
},
log = SimpleNodeLogger.createSimpleLogger( opts );
var log = SimpleNodeLogger.createSimpleFileLogger('project.log');
exports.loadPage = function(req, res) {
	if (req.session.email && req.session.name) {
		log.info("The user "+req.session.id+"accessing the advertisements page");
		res.render("advertisements", {
			name : req.session.name,
			lastlogin : req.session.lastlogin
		});
	} else {
		res.redirect('/');
		// res.render('login', { title: 'Login' });
	}

};
exports.getAuctionAdvertisements = function(req, res) {
	// Checks before redirecting whether the session is valid
	if (req.session.email && req.session.name) {

		var getAuctionAdvertisements = "select * from members INNER JOIN advertisements ON members.user_id = advertisements.userid where advertisements.pricetype='Auction'";
		console.log(getAuctionAdvertisements);
		mysql.fetchData(function(err, results) {
			console.log("DB Results:" + results);
			if (err) {
				throw err;
			} else {
				res.send(results);

			}
		}, getAuctionAdvertisements);

	} else {
		res.redirect('/');
		// res.render('login', { title: 'Login' });
	}
};
exports.getFixedpriceAdvertisements = function(req, res) {
	// Checks before redirecting whether the session is valid
	if (req.session.email && req.session.name) {

		var getFixedpriceAdvertisements = "select * from members INNER JOIN advertisements ON members.user_id = advertisements.userid where advertisements.pricetype='FixedPrice'";
		console.log(getFixedpriceAdvertisements);
		mysql.fetchData(function(err, results) {
			console.log("DB Results:" + results);
			if (err) {
				throw err;
			} else {
				res.send(results);

			}
		}, getFixedpriceAdvertisements);

	} else {
		res.redirect('/');
		// res.render('login', { title: 'Login' });
	}
};
exports.getCartItems = function(req, res) {

	// Checks before redirecting whether the session is valid
	if (req.session.email && req.session.name) {
		res.send(req.session.cartItems);
	} else {
		res.redirect('/');
		// res.render('login', { title: 'Login' });
	}
};

exports.addBid = function(req, res) {
	if (req.session.email && req.session.name) {
		// These two variables come from the form on
		// the views/login.hbs page
		var selectedItem = req.param("items");
		var quantity = req.param("quantity");
		var bidprice = req.param("bidprice");
		for ( var key in quantity) {
			var quant = quantity[key];
			console.log("Value: " + quantity[key]);
		}
		for ( var key in bidprice) {
			var bprice = bidprice[key];
			console.log("Value: " + bidprice[key]);
		}
		// var selJson = JSON.parse(selectedItem);
		var json_responses;
		if (quant <= selectedItem.itemquantity) {
			console.log("less quantity");
			console.log("success");
			var insertBid = "insert into bids(user_id,ad_id,quantity,price) values("
				+ req.session.id
				+ ","
				+ selectedItem.id + ","
				+ quant + "," + bprice + ")";
			mysql.insertData(function(err, results) {
				console.log("DB Results:" + results);
				if (err) {
					throw err;
				} else {
					log.info("The user "+req.session.id+"placed a bid on advertisement "+selectedItem.id);
					json_responses = {
						"statusCode" : 200
					};
					res.send(json_responses);
				}
			}, insertBid);
			

		} else {
			json_responses = {
					"statusCode" : 401
				};
			res.send(json_responses);
		}

	} else {
		res.redirect('/');
		// res.render('login', { title: 'Login' });
	}

};

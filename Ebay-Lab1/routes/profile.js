/**
 * New node file
 */
var mysql = require('./mysql');
exports.loadProfile = function(req, res) {
	if (req.session.email && req.session.name) {

		res.render("viewprofile", {
			name : req.session.name,
			lastlogin : req.session.lastlogin
		});

	} else {
		res.redirect('/');
		// res.render('login', { title: 'Login' });
	}
};

exports.getOrders = function(req, res) {
	// Checks before redirecting whether the session is valid
	if (req.session.email && req.session.name) {

		var getOrders = "select * from orders where user_id =" + req.session.id;
		var getAdvertisements;
		var getOrderitems;
		console.log(getOrders);
		mysql
				.fetchData(
						function(err, results) {
							console.log("DB Results:" + results);
							if (err) {
								throw err;
							} else {
								for (var i = 0; i < results.length; i++) {
									getOrderitems = "select * from orderitems inner join advertisements on orderitems.ad_id = advertisements.id inner join members on members.user_id = advertisements.userid where orderitems.order_id = "
											+ results[0].id;
									mysql.fetchData(function(err, results) {
										console.log("DB Results:" + results);
										if (err) {
											throw err;
										} else {
											res.send(results);
										}
									}, getOrderitems);
								}

							}
						}, getOrders);

	} else {
		res.redirect('/');
		// res.render('login', { title: 'Login' });
	}
};

exports.getSoldItems = function(req, res) {
	if (req.session.email && req.session.name) {

		var getSoldItems = "select * from orderitems inner join advertisements on orderitems.ad_id = advertisements.id where advertisements.userid="
				+ req.session.id;
		mysql.fetchData(function(err, results) {
			console.log("DB Results:" + results);
			if (err) {
				throw err;
			} else {
				res.send(results);
			}
		}, getSoldItems);

	} else {
		res.redirect('/');
		// res.render('login', { title: 'Login' });
	}
};

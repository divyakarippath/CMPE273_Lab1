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
exports.redirectToMarketPlace = function(req, res) {
	// Checks before redirecting whether the session is valid
	if (req.session.email && req.session.name) {
		// Set these headers to notify the browser not to maintain any cache for
		// the page being loaded
		// res.header('Cache-Control', 'no-cache, private, no-store,
		// must-revalidate, max-stale=0, post-check=0, pre-check=0');
		log.info("The user "+req.session.id+"accessing /marketPlace");
		res.render("marketPlace", {
			name : req.session.name,
			lastlogin : req.session.lastlogin
		});
	} else {
		res.redirect('/');
		// res.render('login', { title: 'Login' });
	}
};

exports.sellit = function(req, res) {
	// Checks before redirecting whether the session is valid
	if (req.session.email && req.session.name) {
		// Set these headers to notify the browser not to maintain any cache for
		// the page being loaded
		// res.header('Cache-Control', 'no-cache, private, no-store,
		// must-revalidate, max-stale=0, post-check=0, pre-check=0');
		log.info("The user "+req.session.id+"added a new advertisement");
		res.render("itemdescription", {
			itemname : req.param.sell
		});
	} else {
		res.redirect('/');
		// res.render('login', { title: 'Logd in' });
	}
};
exports.additem = function(req, res) {
	// Checks before redirecting whether the session is valid
	if (req.session.email && req.session.name) {

		// These two variables come from the form on
		// the views/login.hbs page

		var itemname = req.param("itemname");
		var itemdesc = req.param("itemdesc");
		var itemprice = req.param("itemprice");
		var itemquantity = req.param("itemquantity");
		var pricetype = req.param("pricetype");
		console.log(pricetype);
		var json_responses;
		var insertItem = "insert into advertisements(userid,itemname,itemdesc,itemprice,itemquantity,pricetype) values('"
				+ req.session.id
				+ "','"
				+ itemname
				+ "','"
				+ itemdesc
				+ "','"
				+ itemprice + "'," + itemquantity + ",'" + pricetype + "')";
		console.log(insertItem);
		mysql.insertData(function(err, results) {
			console.log("DB Results:" + results);
			if (err) {
				throw err;
			} else {
				json_responses = {
					"statusCode" : 200
				};
				res.send(json_responses);
			}
		}, insertItem);

	} else {
		res.redirect('/');
		// res.render('login', { title: 'Login' });
	}
};

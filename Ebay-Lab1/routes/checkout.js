/**
 * New node file
 */

exports.loadCheckout = function(req, res) {
	if (req.session.email && req.session.name) {
		res.render("checkout", {
			total : req.session.total
		});
	} else {
		res.redirect('/');
		// res.render('login', { title: 'Login' });
	}

};

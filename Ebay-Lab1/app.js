
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , session = require('client-sessions');

var app = express();
var login = require("./routes/login");
var marketPlace = require("./routes/marketPlace");
var buyItems = require("./routes/buyItems");
var cart = require("./routes/cart");
var profile = require("./routes/profile");
var checkout = require("./routes/checkout");
var creditCard = require('./routes/creditCard');
var order = require('./routes/order');
app.use(session({   
	  
	cookieName: 'session',    
	secret: 'ebay_session',    
	duration: 30 * 60 * 1000,    //setting the time for active session
	activeDuration: 5 * 60 * 1000,  }));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.post('/checklogin', login.checkLogin);
app.post('/register', login.register);
app.get('/homepage',login.redirectToHomepage);
app.post('/logout',login.logout);
app.get('/userprofile',login.userprofile);
app.get('/marketPlace',marketPlace.redirectToMarketPlace);
app.get('/advertisements',buyItems.loadPage);
app.get('/getAuctionAds',buyItems.getAuctionAdvertisements);
app.get('/getFixedpriceAds',buyItems.getFixedpriceAdvertisements);
app.get('/getOrders',profile.getOrders);
app.get('/getSoldItems',profile.getSoldItems);
app.post('/sellit',marketPlace.sellit);
app.post('/additem',marketPlace.additem);
app.post('/addToCart',cart.addToCart);
app.post('/addBid',buyItems.addBid);
app.post('/updateCart',cart.updateCart);
app.get('/loadCart', cart.loadCart);
app.get('/loadProfile', profile.loadProfile);
app.post('/removeFromCart',cart.removeFromCart);
app.get('/getCartItems',buyItems.getCartItems);
app.get('/checkout',checkout.loadCheckout);
app.post('/placeOrder',order.placeOrder);
app.get('/orderConfirmation',order.confirmation)
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

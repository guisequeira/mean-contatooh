var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var helmet = require('helmet');
// 
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

module.exports = function () {
	var app = express();

	app.use(cookieParser());

	// app.use(session(
	// 	{ 
	// 		secret: 'homem avestruz',
	// 		resave: true,
	// 		saveUninitialized: true
	// 	}
	// ));


	// app.use(passport.initialize());
	// app.use(passport.session());
	
	app.use(helmet());
	app.disable('x-powered-by');
	app.use(helmet.hidePoweredBy({setTo: 'PHP 5.5.14'}));
	app.use(helmet.xframe());
	app.use(helmet.xssFilter());
	app.use(helmet.nosniff());


	// variavel de ambiente
	app.set('port', 3000);

	// middleware
	app.use(express.static('./public'));
	app.set('view engine', 'ejs');
	app.set('views', './app/views');
	// middlewares bodyParser
	app.use(bodyParser.urlencoded({extend: true}));
	app.use(bodyParser.json());
	app.use(require('method-override')())


	load('models', {cwd: 'app'})
		.then('controllers')
		.then('routes')
		.into(app);

	app.get('*', function(req, res){
		res.status(404).render('404');
	})

	return app;
}
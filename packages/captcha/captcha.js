
/*
var captcha = Npm.require("captcha2");


var connect = Npm.require("connect");
var app = __meteor_bootstrap__.app;

app.use(connect.cookieParser());
app.use(connect.session({ secret: 'keyboard cat'}));
var params = {url: '/captcha.jpg'};

app.use(captcha(params))

app.use(function(req, res, next){
    next();
})

console.log(arguments);

    */
var app = WebApp.connectHandlers;

var captcha = Npm.require("captcha2");
var connect = Npm.require("connect");

app.use(connect.cookieParser());
app.use(connect.session({ secret: 'keyboard cat'}));

app.use(function(req, res, next) {
	console.log(req.url);
	next();
})

var params = {url: '/captcha.jpg'};

app.use(captcha(params));
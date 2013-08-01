/*
var captcha = Npm.require("captcha");
var connect = Npm.require("connect");
var app = __meteor_bootstrap__.app;

app.use(connect.cookieParser());
app.use(connect.session({ secret: 'keyboard cat'}));

app.use(captcha({ url: '/captcha.jpg', color:'#0064cd', background: 'rgb(20,30,200)' }))

app.use(function(req, res, next){
    console.log(req.session.captcha);
    next();
})
    */

var Canvas = Npm.require("canvas");
var _ = Npm.require("underscore")._;
var util = Npm.require("util");

var urlParse = Npm.require("url").parse;

var getCode = function(length, type) {
    if (length === null) length = 4;

    if (type === null) type = 2;
    if (type > 4) type = 4;

    var code = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    var types = [[0, 9], [10, 35], [36, 61], [0, 35], [10, 61], [0, 61]];

    var ret = "";

    type = types[type];
    for(var i = 0; i < length; i ++) {
        ret = ret + code.substr(_.random(type[0], type[1]),1);
    }
    return ret;
}

/*
 var weights = 'normal|bold|bolder|lighter|[1-9]00'
 , styles = 'normal|italic|oblique'
 */

var captcha = function (params) {
    if(typeof params == 'string')
        params = { url: params };
    //params.color = params.color || 'rgb(0,100,100)';
    params.background = params.background || 'rgb(235,235,255)';

    params.length = params.length || 4;
    params.type = params.type || 3;
    params.width = params.width || 100;
    params.height = params.height || 35;
    params.font = params.font || {};
    params.font.family = params.font.family || "sans";
    params.font.size = params.font.size || 20;
    params.font.style = params.font.style || "normal";
    params.font.weight = params.font.weight || "normal";
    params.dx = params.dx || 5;
    params.dy = params.dy || 20;
    params.letterSpacing = params.letterSpacing || 25;

    //params.obstructionist = params.obstructionist || 3;


    return function(req, res, next){
        if(urlParse(req.url).pathname != params.url)
            return next();

        var canvas = new Canvas(params.width, params.height);
        var ctx = canvas.getContext('2d');
        ctx.antialias = 'gray';
        ctx.fillStyle = params.background;
        ctx.fillRect(0, 0, params.width, params.height);

        //ctx.lineWidth = 8;
        console.log(params.font.style);
        ctx._setFont(params.font.weight, params.font.style, params.font.size, "px", params.font.family);
        //ctx.font = params.font.size + "px " + params.font.family;

        /*
        for (var i = 0; i < 2; i++) {
            ctx.moveTo(20, Math.random() * 150);
            ctx.bezierCurveTo(80, Math.random() * 150, 160, Math.random() * 150, 230, Math.random() * 150);
            ctx.stroke();
        }
        */

        var text = getCode(params.length, params.type);


        ctx.strokeStyle = "rgb(255,0,255)";
        for (i = 0; i < text.length; i++) {
            var color = "rgb(" + _.random(20, 200) + "," + _.random(20, 200) + "," + _.random(20, 200) + ")";
            ctx.fillStyle = color;
            ctx.setTransform(Math.random() * 0.5 + 1, Math.random() * 0.4, Math.random() * 0.4, Math.random() * 0.5 + 1, params.letterSpacing * i + params.dx, params.dy);
            ctx.fillText(text.charAt(i), 0, 0);
        }

        canvas.toBuffer(function(err, buf) {
            if(req.session)
                req.session.captcha = text;
            res.end(buf);
        });
    };
}

var connect = Npm.require("connect");
var app = __meteor_bootstrap__.app;

app.use(connect.cookieParser());
app.use(connect.session({ secret: 'keyboard cat'}));
var params = {url: '/captcha.jpg',
    width: 78,
    height: 35,
    length: 4,
    type: 4,
    dx: 8,
    dy: 24,
    letterSpacing: 16,
    font:{
        family: "Helvetica",
        size: 18,
        style: "normal",
        weight: "normal"
    }
}

app.use(captcha(params))

app.use(function(req, res, next){
    next();
})

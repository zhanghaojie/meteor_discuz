Package.describe({
    summary: "Generate captcha image"
})

//console.log(arguments);

Npm.depends({connect: "2.7.10", captcha2: "0.0.3"});

Package.on_use(function(api) {
    api.use("webapp");
    api.add_files("captcha.js", "server");
})
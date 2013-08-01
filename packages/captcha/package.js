Package.describe({
    summary: "Generate captcha image"
})


Npm.depends({captcha2: "0.0.3"});

Package.on_use(function(api) {
    api.add_files("captcha.js", "server");
})
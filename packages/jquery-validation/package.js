
Package.describe({
    summary: "jquery validate plugin"
})

Package.on_use(function(api) {
    api.use("jquery");
    api.add_files(["jquery.validate.js", "additional-methods.js", "messages_zh.js"], "client");
})
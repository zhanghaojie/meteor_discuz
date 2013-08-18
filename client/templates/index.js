Router.configure({
    layout: "layout",
    notFoundTemplate: "tpl_error404"
})

Router.map(function() {
    var self = this;
    this.route("index", {
        path: "/"
    }, function() {
        self.go("forums");
    })
})
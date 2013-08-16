Package.describe({
    summary: "Makes the application auto crawlable to web spiders."
});

Package.on_use(function (api) {
    api.use('webapp', 'server');
    api.use('routepolicy', 'server');
    api.use(['templating'], 'client');
    api.use(['underscore'], ['client', 'server']);

    api.add_files('spiderable.html', 'client');
    api.add_files('autospider.js', 'server');
});

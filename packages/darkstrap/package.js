Package.describe({
	summary: "A dark theme for Twitter Bootstrap 2."
})



Package.on_use(function(api) {
	api.add_files("darkstrap.css", "client");
    api.add_files("darkstrap-override.css", "client");
})

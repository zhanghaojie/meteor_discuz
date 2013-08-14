

Package._transitional_registerBuildPlugin({
  name: "myplugin",
  use: [],
  sources: [
    'plugin/plugin.js'
  ]
});

Package.on_use(function(api) {
	api.use("webapp");
	api.add_files("test.widget", 'client');
	api.add_files("test.js", "server");
})
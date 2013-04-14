
AppRouter = Backbone.Router.extend({
	routes: {
		"forum/:request": "viewForum",
		"thread/:request": "viewThread",
		"*actions": "defaultRoute"
	},
})

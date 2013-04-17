/*
AppRouter = Backbone.Router.extend({
	routes: {
		"forum/:request": "viewForum",
		"thread/:request": "viewThread",
		"*actions": "defaultRoute"
	},
})
 */

/*
init = function () {
 	appRouter = new AppRouter();

	appRouter.on("route:defaultRoute", function(url) {
		console.log("default route:" + url);
		var contentDiv = $("#content");
		contentDiv.html(Meteor.render(Template.tpl_forumlist));
	});

	appRouter.on("route:viewForum", function(forumId) {
		console.log("route view forum : " + forumId);
		Session.set("currentForumId", forumId);
		var contentDiv = $("#content");
		contentDiv.html(Meteor.render(Template.tpl_threadlist));
	});

	appRouter.on("route:viewThread", function(threadId) {
		console.log("route view thread : ", threadId);
		Session.set("currentThreadId", threadId);
		var contentDiv = $("#content");
		contentDiv.html(Meteor.render(Template.tpl_viewthread));
	});

	Backbone.history.start();
 }
 */

AppRouter = function(routes) {
	self = this;
	self.routeMap = {};
	self.routes = routes;
	self.defaultRoute = null;
}

_.extend(AppRouter.prototype, {
	on: function(route, callback) {
		if (callback) {
			self.routeMap[route] = callback;
		}
		else if (route) {
			delete self.routeMap[route];
		}
	},

	start: function() {
		History.Adapter.bind(window, "statechange", function() {
			var state = History.getState();
			self.route(window.location.pathname);
		})
		History.Adapter.bind(window, "hashchange", function() {
			var state = History.getState();

			//去掉anchor
			history.replaceState(state.id, state.title, state.url);
		})
		History.Adapter.trigger(window, "statechange");
	},

	stop: function() {
		History.Adapter.bind(window, "statechange", null);
		History.Adapter.bind(window, "hashchange", null);
	},

	route: function(path) {
		_.each(self.routes, function(reg, key) {
			if (reg.test(path)) {
				var v = path.replace(reg, "$1");
				var fn = self.routeMap[key];
				fn && fn(v);
				return;
			}
		})
		self.defaultRoute && self.defaultRoute(path);
	}
})

Meteor.startup (function() {
	var appRouter = new AppRouter({
		"rootRoute": /^\/$/gi,
		"forumRoute": /^\/forum\/(\S+)/gi,
		"threadRoute": /^\/thread\/(\S+)/gi
		//"otherRoute": /(.*)/
	})

	appRouter.on("forumRoute", function(forumId) {
		console.log("route view forum : " + forumId);
		Session.set("currentForumId", forumId);
		var contentDiv = $("#content");
		contentDiv.html(Meteor.render(Template.tpl_threadlist));
	})

	appRouter.on("threadRoute", function(threadId) {
		console.log("route view thread : ", threadId);
		Session.set("currentThreadId", threadId);
		var contentDiv = $("#content");
		contentDiv.html(Meteor.render(Template.tpl_viewthread));
	})

	appRouter.on("rootRoute", function() {
		console.log("default route:");
		var contentDiv = $("#content");
		contentDiv.html(Meteor.render(Template.tpl_forumlist));
	})

	appRouter.defaultRoute = function(path) {
		console.log("other route: " + path);
	}

	appRouter.start();
})






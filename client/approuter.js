/*
AppRouter = function (routes) {
	this.routeMap = {};
	this.routes = routes;
	this.defaultRoute = null;
}

_.extend(AppRouter.prototype, {
	on: function(route, callback) {
		if (callback) {
			this.routeMap[route] = callback;
		}
		else if (route) {
			delete this.routeMap[route];
		}
	},

	start: function() {
		var self = this;
		History.Adapter.bind(window, "statechange", function() {
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
		var self = this;
		var isMatch = false;
		_.each(this.routes, function(reg, key) {
			if (reg.test(path)) {
				var v = path.replace(reg, "$1");
				var fn = self.routeMap[key];
				fn && fn(v);
				isMatch = true;
			}
		})
		if (!isMatch)
			self.defaultRoute && self.defaultRoute(path);
	}
})

Meteor.startup (function() {
	var appRouter = new AppRouter({
		"rootRoute": /^\/$/gi,
		"forumRoute": /^\/forum\/(\S+)/gi,
		"threadRoute": /^\/thread\/(\S+)/gi,
		"testRoute": /^\/test\/(\S*)/gi
	})

	appRouter.on("forumRoute", function(forumId) {
		console.log("route view forum : " + forumId);
		Meteor.call("isForumExisted", forumId, function(error, result) {
			if (!error) {
				var contentDiv = $("#content");
				if (result) {
					Session.set("currentForumId", forumId);
					contentDiv.html(Meteor.render(Template.tpl_threadlist));
				}
				else {
					Session.set("currentForumId", undefined);
					contentDiv.html(Meteor.render(Template.tpl_error404))
				}
			}
			else {
				console.log("Server Error: " + error);
			}
		})
	})

	appRouter.on("threadRoute", function(threadId) {
		console.log("route view thread : ", threadId);
		Meteor.call("isThreadExisted", threadId, function(error, result) {
			if (!error) {
				var contentDiv = $("#content");
				if (result) {
					Session.set("currentThreadId", threadId);
					contentDiv.html(Meteor.render(Template.tpl_viewthread));
				}
				else {
					Session.set("currentThreadId", undefined);
					contentDiv.html(Meteor.render(Template.tpl_error404))
				}
			}
			else {
				console.log("Server Error: " + error);
			}
		})
	})

	appRouter.on("rootRoute", function() {
		console.log("root route:");
		var contentDiv = $("#content");
		contentDiv.html(Meteor.render(Template.tpl_forumlist));
	})

	appRouter.on("testRoute", function() {
		var contentDiv = $("#content");
		contentDiv.html(Meteor.render(Template.tpl_test))
	})

	appRouter.defaultRoute = function(path) {
		console.log("default route");
		var contentDiv = $("#content");
		contentDiv.html(Meteor.render(Template.tpl_error404))
	}

	appRouter.start();
})
*/

Meteor.Router.add({
    '/': 'tpl_index',

    '/forum/:id': {to: 'tpl_threadlist',
                   and: function(forumId) {
                       Meteor.call("isForumExisted", forumId, function(error, result) {
                           if (!error) {
                               //var contentDiv = $("#content");
                               if (result) {
                                   Session.set("currentForumId", forumId);
                                   //contentDiv.html(Meteor.render(Template.tpl_threadlist));
                               }
                               else {
                                   Session.set("currentForumId", undefined);
                                   //contentDiv.html(Meteor.render(Template.tpl_error404))
                               }
                           }
                           else {
                               console.log("Server Error: " + error);
                           }
                       })
                   }},
    '/thread/:id': {to: 'tpl_viewthread',
                    and: function(threadId) {
                        Meteor.call("isThreadExisted", threadId, function(error, result) {
                            if (!error) {
                                //var contentDiv = $("#content");
                                if (result) {
                                    Session.set("currentThreadId", threadId);
                                    //contentDiv.html(Meteor.render(Template.tpl_viewthread));
                                }
                                else {
                                    Session.set("currentThreadId", undefined);
                                    //contentDiv.html(Meteor.render(Template.tpl_error404))
                                }
                            }
                            else {
                                console.log("Server Error: " + error);
                            }
                        })
                    }},
    '/admin': {
        to: 'tpl_admin',
        and: function() {}
    },

    '/test': {
        to: 'tpl_test',
        and: function() {}
    }
})






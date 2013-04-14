
Meteor.subscribe("online-users");

Meteor.subscribe("all-forums");

forumCollection = new Meteor.Collection("forums");

threadCollection = new Meteor.Collection("threads");

postCollection = new Meteor.Collection("posts");

broadcastCollection = new Meteor.Collection("broadcast");

Deps.autorun(function() {
	var currentForumId = Session.get("currentForumId");
	if (currentForumId) {
		Meteor.subscribe("forum-threads", currentForumId);
	}
})

Deps.autorun(function() {
	var currentThreadId = Session.get("currentThreadId");
	if (currentThreadId) {
		console.log("rerun:" + currentThreadId);
		Meteor.subscribe("thread-posts", currentThreadId);
	}
})

Deps.autorun(function() {
	Meteor.subscribe("broadcast", Meteor.userId());
})

init = function () {
 	appRouter = new AppRouter();

	appRouter.on("route:defaultRoute", function() {
		console.log("default route`");
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

broadcastCursor = broadcastCollection.find();
broadcastCursor.observe({
	added: function(event) {
		console.log(event);
		//处理所有服务器发送的广播
		var eventName = event["event_name"];
		Meteor.broadcast.handler[eventName]();
	}
});



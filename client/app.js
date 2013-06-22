
Meteor.subscribe("online-users");

Meteor.subscribe("all-forums");

forumCollection = new Meteor.Collection("forums");

threadCollection = new Meteor.Collection("threads");

postCollection = new Meteor.Collection("posts");

broadcastCollection = new Meteor.Collection("broadcast");

Session.set("threadListLimit", 10);

Deps.autorun(function() {
	var currentForumId = Session.get("currentForumId");
	if (currentForumId) {
		Meteor.subscribe("forum-threads", currentForumId, Session.get("threadListLimit"));
	}
})

Session.set("postListLimit", 10);

Deps.autorun(function() {
	var currentThreadId = Session.get("currentThreadId");
	if (currentThreadId) {
		Meteor.subscribe("thread-posts", currentThreadId, Session.get("postListLimit"));
	}
})

Deps.autorun(function() {
	Meteor.subscribe("broadcast", Meteor.userId());
})

broadcastCollection.find().observe({
    added: function() {
        console.log(arguments);
    }
})

Meteor._printSentDDP = true;



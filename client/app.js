
Meteor.users.find({ "profile.online": true }).observe({
    added: function(doc) {
        //console.log(doc);
    }
})

Meteor.subscribe("userStatus");

Meteor.subscribe("all-forums");

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



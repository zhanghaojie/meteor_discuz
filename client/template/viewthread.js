
Template.tpl_viewthread.currentThread = function() {
	var currentThreadId = Session.get("currentThreadId");
	var cursor = threadCollection.findOne({"_id": currentThreadId});
	return cursor;
}

Template.tpl_viewthread.posts = function() {
	var cursor = postCollection.find();
	return cursor;
}

Template.tpl_viewthread.events({
	"click #submit": function (event) {
		var postInput = $("#post_input");
		var postText = postInput.val();
		postCollection.insert({"content": postText, "thread_id": Session.get("currentThreadId")});
		postInput.val("");
	},

	"click #invite": function (event) {
		Meteor.call("postEvent", "invite", {"user_id": "all", "to": Session.get("currentThreadId")});
	},

	"click #alerts": function (event) {
		var postInput = $("#post_input").val();
		Meteor.call("postEvent", "alert", postInput);
	}
})
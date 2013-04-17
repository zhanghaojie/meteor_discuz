
Template.tpl_viewthread.currentThread = function() {
	var currentThreadId = Session.get("currentThreadId");
	var cursor = threadCollection.findOne({"_id": currentThreadId});
	return cursor;
}

Template.tpl_viewthread.posts = function() {
	var cursor = postCollection.find({tid: Session.get("currentThreadId")});
	return cursor;
}

Template.tpl_viewthread.events({
	"click #submit": function (event) {
		var postInput = $("#post_input");
		var postText = postInput.val();
		postCollection.insert({
			"fid": Session.get("currentForumId"),
			"tid": Session.get("currentThreadId"),
			"author_id": Meteor.userId(),
			"author": Meteor.user().emails[0].address,
			"message": postText,
		});
		
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
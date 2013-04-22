
function formateThreads(thread) {
	var date = new Date;
	date.setTime(thread.created_time);
	thread.created_time = date.toLocaleString();
	return thread;
}

Template.tpl_threadlist.threads = function() {
	var cursor = threadCollection.find({}, {sort:{created_time:-1}, transform:formateThreads});
	return cursor;
}

Template.tpl_threadlist.currentForum = function() {
	var forumId = Session.get("currentForumId");
	var cursor = forumCollection.findOne({"_id": forumId});
	return cursor;
}

Template.tpl_threadlist.created = function() {
	console.log("tpl_threadlist.created");
}

Template.tpl_threadlist.rendered = function() {
	$('#loading_div').waypoint(function() {
  		console.log("abc");
  		Session.set("threadListLimit", Session.get("threadListLimit") + 10);
	}, {offset: '99%'});
	console.log("tpl_threadlist.rendered");
}

Template.tpl_threadlist.destroyed = function() {
	console.log("tpl_threadlist.destroyed");
}
Template.tpl_post_thread.events({
	"click #btn_post_thread": function(event) {
		var subject = $("#post_subject").val();
		var content = $("#txt_post_content").val();
		console.log(subject, content);
		if (subject && content) {
			threadCollection.insert({
				fid: Session.get("currentForumId"),
				author_id: Meteor.userId(),
				author: Meteor.user().emails[0].address,
				created_time: (new Date()).getTime(),
				subject: subject,
				first_post: content,
				lastpost: Meteor.userId(),
				lastposter: Meteor.user().emails[0].address
			})
		}
		else {
			
		}
	}
})

Meteor.startup(function() {
	
})


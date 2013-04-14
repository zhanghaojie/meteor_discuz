
Template.tpl_threadlist.threads = function() {
	var cursor = threadCollection.find();
	return cursor;
}

Template.tpl_threadlist.currentForum = function() {
	var forumId = Session.get("currentForumId");
	var cursor = forumCollection.findOne({"_id": forumId});
	return cursor;
}

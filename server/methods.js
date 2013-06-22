

Meteor.methods({
	isUserExisted: function(userName) {
		var cursor = Meteor.users.find({username: userName});
		if (cursor.count() > 0) {
			return true;
		}
		else {
			return false;
		}
	},
	isForumExisted: function(forumId) {
		var cursor = forumCollection.find({_id: forumId});
		if (cursor.count() > 0) {
			return true;
		}
		return false;
	},
	isThreadExisted: function(threadId) {
		var cursor = threadCollection.find({_id: threadId});
		if (cursor.count() > 0) {
			return true;
		}
		return false;
	}
})
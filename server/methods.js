

Meteor.methods({
	isUserExisted: function(userName) {
        console.log(userName);
		var cursor = Meteor.users.find({"emails.address": userName});
		if (cursor.count() > 0) {
			return true;
		}
		else {
			return false;
		}
	},
	isForumExisted: function(forumId) {
		var cursor = CollectionManager.create("forums").find({_id: forumId});
		if (cursor.count() > 0) {
			return true;
		}
		return false;
	},
	isThreadExisted: function(threadId) {
		var cursor = CollectionManager.create("threads").find({_id: threadId});
		if (cursor.count() > 0) {
			return true;
		}
		return false;
	}
})

Meteor.publish("forum-threads", function(forumId, limit) {
    var cursor = threadCollection.find({"fid": forumId},{limit: limit, sort:{created_time: -1}});
    return cursor;
})

threadCollection.allow({
	insert: function(userId, threadDoc) {
		postCollection.insert({
			fid: threadDoc.fid,
			tid: threadDoc._id,
			author_id: threadDoc.author_id,
			author: threadDoc.author,
			message: threadDoc.first_post
		})
		return true;
	},
	update: function() {
		return true;
	},
	remove: function() {
		return true;
	}
})
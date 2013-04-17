threadCollection = new Meteor.Collection("threads");

Meteor.publish("forum-threads", function(forumId, limit) {
	var cursor = threadCollection.find({"fid": forumId},{limit: limit, sort:{created_time: -1}});
	//observeThreadCursor(cursor);
	return cursor;
})



threadCollection.allow({
	insert: function(userId, threadDoc) {
		return true;
	},
	update: function() {
		return true;
	},
	remove: function() {
		return true;
	}
})






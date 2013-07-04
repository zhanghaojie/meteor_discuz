

Meteor.publish("thread-posts", function(threadId, limit) {
	return postCollection.find({"tid": threadId}, {sort:{created_time: -1}});
})

postCollection.allow({
	insert: function() {
		return true;
	},
	update: function() {
		return true;
	},
	remove: function() {
		return true;
	}
})

postCollection = new Meteor.Collection("posts");
Meteor.publish("thread-posts", function(threadId) {
	return postCollection.find({"thread_id": threadId});
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
threadCollection = new Meteor.Collection("threads");
Meteor.publish("forum-threads", function(forumId) {
	return threadCollection.find({"forum_id": forumId});
})
threadCollection.allow({
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
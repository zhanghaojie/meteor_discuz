
forumCollection = new Meteor.Collection("forums");
Meteor.publish("all-forums", function() {
	var cursor = forumCollection.find();
	return cursor;
})
forumCollection.allow({
	insert: function () {
		return true;
	},
	update: function() {
		return true;
	},
	remove: function() {
		return true;
	} 
})
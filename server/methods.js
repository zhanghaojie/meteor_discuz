

Meteor.methods({
	isUserExisted: function(userName) {
		var cursor = Meteor.users.find({username: userName});
		if (cursor.count() > 0) {
			return true;
		}
		else {
			return false;
		}
	}
})
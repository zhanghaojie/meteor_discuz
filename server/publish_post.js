
postCollection = new Meteor.Collection("posts");
Meteor.publish("thread-posts", function(threadId, limit) {
	return postCollection.find({"tid": threadId}, {sort:{created_time: -1}});
})


function observeThreadCursor(cursor) {
	cursor.observe({
		added: function(thread) {
			console.log(thread);
			postCollection.insert({
				fid: thread.fid,
				tid: thread._id,
				author_id: thread.author_id,
				author: thread.author,
				message: thread.first_post,
			})
		}
	})
}

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

broadcastCollection = new Meteor.Collection("broadcast");

// 在服务器启动时清空collection
broadcastCollection.remove();

Meteor.publish("broadcast", function(userId) {
	return broadcastCollection.find(
		{$or:
			[{"to": userId},
			 {"to": "all"}]
		});
})


// event_name:
// from:
// to:
// msg

Meteor.methods({
	broadcast: function(eventName, from, to, args) {
		console.log(arguments);
		if (Meteor.userId() !== from) {
			console.log("unknow user from:" + from);
		} 
		if (to === "all" || Meteor.users.find({"_id": to}).count() == 1) {
			broadcastCollection.insert({"event_name": eventName, "from": from, "to": to,"args": args}, function(error, eventId) {
				if (!error) {
					Meteor.defer(function() {
						broadcastCollection.remove({"_id": eventId});
					})
				}
			})
		}
		return true;
	}
})


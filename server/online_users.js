
// 服务器启动设置所有用户为offline
Meteor.users.update({}, {$set:{online: false}});

Meteor.publish("online-users", function() {
	var cursor = Meteor.users.find({online: true});
	return cursor;
})

Meteor.startup(function() {
	//Meteor.keepalive = Meteor.keepalive || {};
	Meteor.onlineUser = Meteor.onlineUser || {};

	Meteor.methods ({
		keepalive: function(params) {
			var userId = Meteor.userId();
			console.log(userId);
			if (!userId) return false;
			if (!Meteor.onlineUser[userId]) {
				Meteor.users.update({"_id": userId}, {$set: {"online": true}})
			}
			Meteor.onlineUser[userId] = (new Date()).getTime();
		}
	})
})

Meteor.setInterval(function () {
	var now = (new Date()).getTime();
	var onlineUser = Meteor.onlineUser;
	//console.log("clear offline user");
	for(var key in onlineUser) {
		var lastHeartBeat = onlineUser[key];
		if (now - lastHeartBeat > 2000) {
			Meteor.users.update({"_id": key}, {$set: {"online": false}});
			delete onlineUser[key];
		}
	}
}, 5000)




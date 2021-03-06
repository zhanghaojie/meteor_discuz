/*
// 服务器启动设置所有用户为offline
Meteor.users.update({}, {$set:{online: false}}, {multi: true});

Meteor.publish("online-users", function() {
	var cursor = Meteor.users.find({online: true});
	return cursor;
})

Meteor.startup(function() {
	//Meteor.keepalive = Meteor.keepalive || {};
	Meteor.onlineUser = Meteor.onlineUser || {};

	Meteor.methods ({
		keepalive: function() {
			var userId = Meteor.userId();
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
	for(var key in onlineUser) {
		var lastHeartBeat = onlineUser[key];
		if (now - lastHeartBeat > 10000) {
			Meteor.users.update({"_id": key}, {$set: {"online": false}});
			delete onlineUser[key];
		}
	}
    //var util = Npm.require("util");
    //console.log(util.inspect(Meteor.default_server,{showHidden:true}));
}, 10000)
*/

Meteor.publish("userStatus", function() {
    return Meteor.users.find({"profile.online": true});
})
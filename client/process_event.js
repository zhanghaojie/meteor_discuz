
Meteor.broadcast = {};
Meteor.broadcast.handler = {};

var eventHandler = Meteor.broadcast.handler;

eventHandler.invite = function(from, to, args) {
	var threadId = args["to"];
	appRouter.navigate("thread/"+threadId, {trigger:true, replace:true});
}

eventHandler.alert = function(from, to, args) {
	alert(args);
}
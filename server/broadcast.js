/*
var _broadcastListener = new Deps.Dependency;

Meteor.publish("broadcast", function() {
    var self = this;
    next = 0;
    next1 = 0;
    Deps.autorun(function() {
        _broadcastListener.depend();
        self.added("broadcast", "broadcast_id" + next1++, {event: "fuck" + next++});
    })

})
*/
broadcastCollection = new Meteor.Collection("broadcast");

Meteor.publish("broadcast", function() {
    var self = this;
    var broadcastHandle = broadcastCollection.find({is_broadcast: false}).observe({
        added: function(doc) {
            var id = doc._id;
            delete doc['_id'];
            self.added("broadcast", id, doc);
            broadcastCollection.update({_id: id}, {$set: {is_broadcast: true}});
        }
    })
    this.ready();

    this.onStop(function() {
        broadcastHandle.stop();
    })
})

Meteor.methods({
	broadcast: function(eventName, from, args) {
        var userId = Meteor.userId();
        var result = false;
        if (!!userId && userId === from) {
            broadcastCollection.insert({event_name: eventName, is_broadcast: false,
                from: from, args: args}, function(error, id) {
                if (!error && id) {
                    result = true;
                }
                else
                    result = false;
            })
        }
        return result;
	}
})




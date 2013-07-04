/**
 * Created with JetBrains WebStorm.
 * User: zhanghaojie
 * Date: 13-6-24
 * Time: AM5:21
 * To change this template use File | Settings | File Templates.
 */

chatCollection = new Meteor.Collection("chat");

Meteor.publish("chat", function(userId) {
    var self = this;
    if (!!self.userId && self.userId === userId) {
        var chatHandle = chatCollection.find({to: self.userId, is_send: false}).observe({
            added: function(doc) {
                var id = doc._id;
                delete doc['_id'];
                self.added("chat", id, doc);
                chatCollection.update({_id: id}, {$set: {is_send: true}});
            }
        })
    }
    self.ready();

    self.onStop(function() {
        chatHandle.stop();
    })
})

Meteor.methods({
    chat: function(from, to, args) {
        console.log(arguments);
        var userId = Meteor.userId();
        if (!!userId && userId === from) {
            chatCollection.insert({is_send: false,
                from: from, to: to, args: args})
            return true;
        }
        return false;
    }
})
/**
 * Created with JetBrains WebStorm.
 * User: zhanghaojie
 * Date: 13-6-23
 * Time: AM6:49
 * To change this template use File | Settings | File Templates.
 */

postCollection = new Meteor.Collection("posts");

Meteor.methods({
    replyThread: function(args) {
        postCollection.insert(args, function(error, id) {
            if (!error) {
                //TODO
            }
        });
    }
})
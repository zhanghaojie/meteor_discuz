/**
 * Created with JetBrains WebStorm.
 * User: zhanghaojie
 * Date: 13-6-23
 * Time: AM5:59
 * To change this template use File | Settings | File Templates.
 */


threadCollection = new Meteor.Collection("threads");

Meteor.methods({
    createThread: function(args) {
        threadCollection.insert(args);
    }
})
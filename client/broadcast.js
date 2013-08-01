/**
 * Created with JetBrains WebStorm.
 * User: zhanghaojie
 * Date: 13-6-23
 * Time: AM7:03
 * To change this template use File | Settings | File Templates.
 */


broadcastCollection = new Meteor.Collection("broadcast");

Deps.autorun(function() {
    Meteor.subscribe("broadcast");
})

broadcastCollection.find().observe({
    added: function() {
        console.log(arguments);
    }
})


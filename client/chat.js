/**
 * Created with JetBrains WebStorm.
 * User: zhanghaojie
 * Date: 13-6-24
 * Time: AM5:26
 * To change this template use File | Settings | File Templates.
 */

chatCollection = new Meteor.Collection("chat");

Deps.autorun(function() {
    if (Meteor.userId()) {
        Meteor.subscribe("chat", Meteor.userId());
    }
})

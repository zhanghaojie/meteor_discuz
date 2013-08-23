var testCollection = CollectionManager.create("test");

var subs = {};

/*
Meteor.setInterval(function(){
    _.forEach(subs, function(sub, key) {
        console.log(key);
        sub.added(key, Random.id(), "abc");
    })
}, 3000);
*/

Meteor.publish("test", function(arg) {
    var cursor = testCollection.find();
    return cursor;
})


testCollection.allow({
    insert: function () {
        return true;
    },
    update: function() {
        return true;
    },
    remove: function() {
        return true;
    }
})
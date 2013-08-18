/*
testCollection = new Meteor.Collection("test");

if (Meteor.isServer){

    testCollection.remove({});
    for (var i = 0; i < 10; i ++) {
        testCollection.insert({test: "test" + i, name: "name"+i, age: "age"+i});
    }

    Meteor.publish("test", function() {
        return testCollection.find({}, {fields: {test: true}});
    })

    Meteor.publish("name", function() {
        return testCollection.find({}, {fields: {name: true}});
    })

    testCollection.allow({
        insert: function() {
            return true;
        },
        remove: function() {
            return true;
        }
    })
}
*/


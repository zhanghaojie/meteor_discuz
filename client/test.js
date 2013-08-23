

Meteor.startup(function() {
    var sub1 = "sub1";
    var sub2 = "sub2";
    sub1Collection = new Meteor.Collection(sub1);
    sub2Collection = new Meteor.Collection(sub2);
Deps.autorun(function(){
    Meteor.userId();

    console.log("aaaa");
    Meteor.subscribe("test", sub1);
    Meteor.subscribe("test", sub2);

    var cursor1 = sub1Collection.find();

    cursor1.observe({
        added: function(arg) {
            console.log("sub1", arg[0]);
        }
    });

    var cursor2 = sub1Collection.find();

    cursor2.observe({
        added: function() {
            console.log(arguments);
        }
    });
})

})



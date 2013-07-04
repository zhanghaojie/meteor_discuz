
Session.set("text", "aaaa");

Template.tpl_text.helpers({
    text: function() {
        return Session.get("text");
    }
})

Template.tpl_test.events({
    "click div": function(e, tmpl) {

    }


})

Meteor.startup(function() {
    $("#draggable").draggable();
    $("#droppable").droppable({
        accept: function() { console.log(arguments)},
        drop: function(){
            console.log(arguments);
        }
    });
})
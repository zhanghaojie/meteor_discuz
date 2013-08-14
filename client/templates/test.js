

Meteor.startup(function() {
    $("#droppable").each(function() {
        this.ondrop = function(e) {
            console.log(e.dataTransfer);
            e.preventDefault();
        }
        this.ondragover = function() {return false;}
        this.ondragend = function() {return false;};
    })
})
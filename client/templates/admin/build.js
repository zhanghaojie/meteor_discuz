/**
 * Created with JetBrains WebStorm.
 * User: zhanghaojie
 * Date: 13-6-28
 * Time: PM12:08
 * To change this template use File | Settings | File Templates.
 */

Template.tpl_build.helpers({
    sidebarList: function() {
        return {
            "GRID_SYSTEM":[
                "12", "6 6", "8 4", "4 4 4", "2 6 4"
            ],
            "BASE_CSS":[
                "Title", "Paragraph", "Address", "Blockquote",
                "Unordered List", "Form", "Table"
            ],
            "COMPONENTS":  [
                "Button Group", "Navs"
            ],
            "JAVASCRIPT": [
                "Modal", "Navbar", "Tabs", "Alerts"
            ]
        }
    }
})

Template.tpl_build.events({
    "click .drag": function() {
        //console.log(arguments);
    }
})


Template.tpl_build.rendered = function() {
    var draggableNodes = this.findAll(".drag");
    var dragHelper = function(node) {
        return function() {
            return $($(node).next()).clone().removeClass("hide");
        }
    };
    _.each(draggableNodes, function(node) {
        $(node).draggable({helper: dragHelper(node)});
    })
}




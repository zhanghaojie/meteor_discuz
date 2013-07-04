/**
 * Created with JetBrains WebStorm.
 * User: zhanghaojie
 * Date: 13-6-28
 * Time: PM12:08
 * To change this template use File | Settings | File Templates.
 */

var list = ["GRID_SYSTEM", "BASE_CSS", "COMPONENTS", "JAVASCRIPT"];
var sublist = {
    "GRID_SYSTEM": [
        "12", "6 6", "8 4", "4 4 4", "2 6 4"
    ],
    "BASE_CSS": [
        "Title", "Paragraph", "Address", "Blockquote",
        "Unordered List", "Form", "Table"
    ],
    "COMPONENTS": [
        "Button Group", "Navs"
    ],
    "JAVASCRIPT": [
        "Modal", "Navbar", "Tabs", "Alerts"
    ]
}

Template.tpl_build.helpers({
    sidebarList: function() {
        return list;
    },

    sidebarSublist: function(key) {
        return sublist[key];
    }
})

Meteor.startup(function() {

})


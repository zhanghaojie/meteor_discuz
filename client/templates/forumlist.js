
var ForumController = RouteController.extend({
    template: "tpl_forumlist",
    waitOn: [
        Meteor.subscribe("forums"),
        Meteor.subscribe("forum-group")
    ],
    onBeforeRun: function() {
        this.forumGroupCollection = CollectionManager.create("forum_group");
        this.forumCollection = CollectionManager.create("forums");
    },
    data: function() {
        var self = this;
        return {
            forumGroup: function() {
                return self.forumGroupCollection.find();
            },
            forums: function(gid) {
                return self.forumCollection.find({gid:gid});
            }
        }
    }
})

Router.map(function() {
    this.route("forums", {
        path: "/forums",
        controller: ForumController
    })
})


Template.tpl_forumlist.helpers({

})

Template.tpl_forumlist.events ({
	"change #attachment": function(event) {
		var file = event.currentTarget.files[0];
		var reader = new FileReader();
		reader.readAsArrayBuffer(file);
		reader.onload = function() {
			console.log("file onload");
		}
		reader.onloadstart = function() {
			//console.log("file onloadstart");
		}
		reader.onabort = function() {
			//console.log("file onabort");
		}
		reader.onerror = function() {
			//console.log("file onerror");
		}
		reader.onloadend = function() {
			//console.log("file onloadend");
		}
		reader.onprogress = function() {
			//console.log("file onprogress");
		}
	}
}) 
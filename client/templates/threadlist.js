
Router.map(function() {
    this.route("forum", {
        path: "/forum/:id",
        controller: "ThreadsController"
    })
})

ThreadsController = RouteController.extend({
    template: "tpl_threadlist",
    waitOn: function() {
        return [
            Meteor.subscribe("threads", this.params.id),
            Meteor.subscribe("forums")
        ];
    },
    onBeforeRun: function() {
        //this.threadCollection = new Meteor.Collection("threads");
        //this.forumCollection = new Meteor.Collection("forums");
        this.threadCollection = CollectionManager.create("threads");
        this.forumCollection = CollectionManager.create("forums");
    },
    data: function () {
        var self = this;
        return {
            threads: function() {
                return self.threadCollection.find({}, {sort:{created_time:-1}, transform:formateThreads});
            },
            currentForum: function() {
                var forum = self.forumCollection.findOne({_id:self.params.id});
                return forum;
            },
            currentForumId: function() {
                return self.params.id;
            }
        }
    }
})

function formateThreads(thread) {
    var date = new Date;
    date.setTime(thread.created_time);
    thread.created_time = date.toLocaleString();
    return thread;
}


Template.tpl_threadlist.helpers({

})

Template.tpl_post_thread.events({
	"click #btn_post_thread": function(event) {
        //提示用户登陆
        var self = this;
		if (!Meteor.userId()) {
            Meteor.showErrorModal("请先登陆");
            return;
		}

		var subject = $("#post_subject").val();
		var content = $("#txt_post_content").val();
		if (subject && content) {
            var msg = {
                fid: self.currentForumId(),
                author_id: Meteor.userId(),
                author: Meteor.user().emails[0].address,
                created_time: null,
                title: subject,
                content: content,
                lastpost: Meteor.userId(),
                lastposter: Meteor.user().emails[0].address
            }
            CollectionManager.create("threads").insert(msg);
		}
		else {
			
		}
	}
})


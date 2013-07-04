
function formateThreads(thread) {
    var date = new Date;
    date.setTime(thread.created_time);
    thread.created_time = date.toLocaleString();
    return thread;
}


Template.tpl_threadlist.helpers({
    isForumExisted: function() {
        return !!Session.get("currentForumId");
    },

    threads: function() {
        var cursor = threadCollection.find({}, {sort:{created_time:-1}, transform:formateThreads});
        return cursor;
    },

    currentForum: function() {
        var forumId = Session.get("currentForumId");
        var cursor = forumCollection.findOne({"_id": forumId});
        return cursor;
    },

    rendered: function() {
        $('#loading_div').waypoint(function() {
            console.log("abc");
            Session.set("threadListLimit", Session.get("threadListLimit") + 10);
        }, {offset: '99%'});
    }
})

Template.tpl_post_thread.events({
	"click #btn_post_thread": function(event) {
        //提示用户登陆
		if (!Meteor.userId()) {
            Meteor.showErrorModal("请先登陆");
            return;
		}
		var subject = $("#post_subject").val();
		var content = $("#txt_post_content").val();
		if (subject && content) {
            var msg = {
                fid: Session.get("currentForumId"),
                author_id: Meteor.userId(),
                author: Meteor.user().emails[0].address,
                created_time: (new Date()).getTime(),
                subject: subject,
                first_post: content,
                lastpost: Meteor.userId(),
                lastposter: Meteor.user().emails[0].address
            }
            Meteor.call("createThread", msg);
		}
		else {
			
		}
	}
})


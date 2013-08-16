

Meteor.Router.add({
    '/': 'tpl_index',

    '/forum/:id': {to: 'tpl_threadlist',
                   and: function(forumId) {
                       Meteor.call("isForumExisted", forumId, function(error, result) {
                           if (!error) {
                               //var contentDiv = $("#content");
                               if (result) {
                                   Session.set("currentForumId", forumId);
                                   //contentDiv.html(Meteor.render(Template.tpl_threadlist));
                               }
                               else {
                                   Session.set("currentForumId", undefined);
                                   //contentDiv.html(Meteor.render(Template.tpl_error404))
                               }
                           }
                           else {
                               console.log("Server Error: " + error);
                           }
                       })
                   }},
    '/thread/:id': {to: 'tpl_viewthread',
                    and: function(threadId) {
                        Meteor.call("isThreadExisted", threadId, function(error, result) {
                            if (!error) {
                                //var contentDiv = $("#content");
                                if (result) {
                                    Session.set("currentThreadId", threadId);
                                    //contentDiv.html(Meteor.render(Template.tpl_viewthread));
                                }
                                else {
                                    Session.set("currentThreadId", undefined);
                                    //contentDiv.html(Meteor.render(Template.tpl_error404))
                                }
                            }
                            else {
                                console.log("Server Error: " + error);
                            }
                        })
                    }},
    '/admin': {
        to: 'tpl_admin',
        and: function() {}
    },

    '/test': {
        to: 'tpl_test',
        and: function() {}
    }
})





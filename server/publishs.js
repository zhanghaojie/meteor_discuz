

var forumGroupCollection = CollectionManager.create("forum_group");

Meteor.publish("forum-group", function() {
    var cursor = forumGroupCollection.find();
    return cursor;
})

forumGroupCollection.allow({
    insert: function () {
        return true;
    },
    update: function() {
        return true;
    },
    remove: function() {
        return true;
    }
})

/**************************************************************************
 *                 forum publish                                          *
 **************************************************************************/

var forumCollection = CollectionManager.create("forums");

// gid: forum_group _id
Meteor.publish("forums", function() {
    var cursor = forumCollection.find();
    return cursor;
})

forumCollection.allow({
    insert: function () {
        return true;
    },
    update: function() {
        return true;
    },
    remove: function() {
        return true;
    }
})

/**************************************************************************
 *                 threads publish                                        *
 **************************************************************************/
var threadCollection = CollectionManager.create("threads");
// fid:   forum  _id
Meteor.publish("threads", function(fid) {
    var cursor = threadCollection.find({fid: fid});
    return cursor;
})

threadCollection.allow({
    insert: function () {
        return true;
    },
    update: function() {
        return true;
    },
    remove: function() {
        return true;
    }
})


/**************************************************************************
 *                 post publish                                          *
 **************************************************************************/
var postCollection = CollectionManager.create("posts");
// fid:   forum  _id
Meteor.publish("posts", function(tid) {
    if (this.userId) {
        var cursor = postCollection.find({tid: tid});
        return cursor;
    }
    else {
        throw new Error("a-------");
    }
})

postCollection.allow({
    insert: function () {
        return true;
    },
    update: function() {
        return true;
    },
    remove: function() {
        return true;
    }
})

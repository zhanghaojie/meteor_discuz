
var forumGroup = CollectionManager.create("forum_group");
var forum = CollectionManager.create("forums");

if (!forumGroup.find().count()) {
    forumGroup.insert({name: "论坛组1", group: 0, order: 0, created_time:(new Date).getTime()});
    forumGroup.insert({name: "论坛组2", group: 1, order: 2, created_time:(new Date).getTime()});
    forumGroup.insert({name: "论坛组3", group: 2, order: 1, created_time:(new Date).getTime()});

    var group1 = forumGroup.findOne({group: 0}, {fields: {_id: true}});
    var group2 = forumGroup.findOne({group: 1}, {fields: {_id: true}});
    var group3 = forumGroup.findOne({group: 2}, {fields: {_id: true}});

    forum.insert({name: "论坛1000", image_url: "forum_icon.jpg", gid: group1._id, created_time: (new Date).getTime(), order: 0});
    forum.insert({name: "论坛1001", image_url: "forum_icon.jpg", gid: group1._id, created_time: (new Date).getTime(), order: 0});
    forum.insert({name: "论坛1002", image_url: "forum_icon.jpg", gid: group1._id, created_time: (new Date).getTime(), order: 0});
    forum.insert({name: "论坛1003", image_url: "forum_icon.jpg", gid: group1._id, created_time: (new Date).getTime(), order: 0});
    forum.insert({name: "论坛1004", image_url: "forum_icon.jpg", gid: group1._id, created_time: (new Date).getTime(), order: 0});
    forum.insert({name: "论坛1005", image_url: "forum_icon.jpg", gid: group1._id, created_time: (new Date).getTime(), order: 0});

    forum.insert({name: "论坛2001", image_url: "forum_icon.jpg", gid: group2._id, created_time: (new Date).getTime(), order: 0});
    forum.insert({name: "论坛2002", image_url: "forum_icon.jpg", gid: group2._id, created_time: (new Date).getTime(), order: 0});
    forum.insert({name: "论坛2003", image_url: "forum_icon.jpg", gid: group2._id, created_time: (new Date).getTime(), order: 0});
    forum.insert({name: "论坛2004", image_url: "forum_icon.jpg", gid: group2._id, created_time: (new Date).getTime(), order: 0});
    forum.insert({name: "论坛2005", image_url: "forum_icon.jpg", gid: group2._id, created_time: (new Date).getTime(), order: 0});
    forum.insert({name: "论坛2006", image_url: "forum_icon.jpg", gid: group2._id, created_time: (new Date).getTime(), order: 0});

    forum.insert({name: "论坛3001", image_url: "forum_icon.jpg", gid: group3._id, created_time: (new Date).getTime(), order: 0});
    forum.insert({name: "论坛3002", image_url: "forum_icon.jpg", gid: group3._id, created_time: (new Date).getTime(), order: 0});
    forum.insert({name: "论坛3003", image_url: "forum_icon.jpg", gid: group3._id, created_time: (new Date).getTime(), order: 0});
    forum.insert({name: "论坛3004", image_url: "forum_icon.jpg", gid: group3._id, created_time: (new Date).getTime(), order: 0});
    forum.insert({name: "论坛3005", image_url: "forum_icon.jpg", gid: group3._id, created_time: (new Date).getTime(), order: 0});
    forum.insert({name: "论坛3006", image_url: "forum_icon.jpg", gid: group3._id, created_time: (new Date).getTime(), order: 0});
}
/*
if (!threadCollection.find().count())
{
	threadCollection.insert(
		{fid: "9GpZHWrZtbfCncsdt",
		 author_id: "fZBSsijuSjepxAWwi",
		 author: ""
		})
}
*/
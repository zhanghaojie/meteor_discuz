

Template.tpl_forumlist.helpers({
    forums: function(groupId) {
        var cursor = forumCollection.find({join_group: groupId});
        return cursor;
    },

    forumGroup: function() {
        var cursor = forumCollection.find(
            {group: {$exists:true}});
        return cursor;
    }
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
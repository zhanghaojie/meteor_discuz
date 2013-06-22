
Template.tpl_error_modal.helpers({
    message: function() {
        return Session.get("error_message");
    }
})

Meteor.showErrorModal = function (message) {
	Session.set("error_message", message);
	Meteor.flush();
	$("#error_modal").modal("show");
}

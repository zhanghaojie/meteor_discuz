
Template.tpl_error.message = function() {
	return Session.get("error_message");
}

showErrorModal = function (message) {
	Session.set("error_message", message);
	Meteor.flush();
	$("#error_modal").modal("show");
}

/*
Meteor.startup(function() {
	//init();
	Meteor.autorun(function() {
		if (Meteor.userId()) {
			Meteor.call("keepalive");
			Meteor.setTimeout(arguments.callee, 7000);
		}
	})
});

*/


Meteor.startup(function() {
	$.validator.setDefaults({
		errorClass: "validate-error",
		validClass: "validate-success",
		errorElement: "span"
	})
})

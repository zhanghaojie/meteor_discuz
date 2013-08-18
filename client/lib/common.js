
showDialog = function(template) {
	if ($("#dialog_div").size() <= 0) {
		$("<div id='dialog_div'></div>").appendTo('body');
	}
	var tpl;
	if (typeof template === "string") {
		tpl = Template[template];
	}
	else {
		tpl = template;
	}
	$("#dialog_div").empty().append(Meteor.render(tpl));
}

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

showTooltip = function(selector, option) {
    var $selector = $(selector);
    if (! _.has($selector.data(), "tooltip")) {
        $selector.tooltip(option);
    }
    $selector.tooltip("show")
    /*
    Meteor.clearTimeout(instance["hidePopoverHandle"]);
    var $login = $(instance.find("#btn_login"));
    $login.tooltip("show");

    var handle = Meteor.setTimeout(function() {
        $login.tooltip("hide");
    }, 3000);

    instance["hidePopoverHandle"] = handle;
    */
}
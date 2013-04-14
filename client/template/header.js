

Template.tpl_header.lang = function(key) {
	var curLang = Meteor.currentLanguage;
	if (!Meteor.languages[curLang]) {
		curLang = "zh-CN";
	}
	return Meteor.languages[curLang][key];
}

Template.tpl_header.events({
	"blur #user_name": function(event) {
		var target = event.currentTarget;
		console.log(target.value);
	},
	"blur #password": function(event) {
		var target = event.currentTarget;
		console.log(target.value);
	}
})


Template.tpl_login.events({
	"click #btn_login": function(event, instance) {
		var userName = instance.find("#login_username").value;
		var password = instance.find("#login_password").value;
		console.log(userName, password);
		Meteor.loginWithPassword(userName, password, function(error) {
			console.log(arguments);
		})
	}
})

Template.tpl_register.events({
	"click #btn_reg_submit": function(event, instance) {
		console.log(instance);
		var userName = instance.find("#user_name").value;
		var password = instance.find("#password").value;
		var options = {
			username: userName,
			password: password
		}
		Accounts.createUser(options, function(error) {
			if (error) {
				console.log("create user failed:" + error);
			}
			else {
				console.log("create user success");
				$("#dlg_register").modal("hide");
			}
		})
	}
})

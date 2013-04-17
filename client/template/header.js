
//--------------tpl_header--------------
Template.tpl_header.lang = function(key) {
	var curLang = Meteor.currentLanguage;
	if (!Meteor.languages[curLang]) {
		curLang = "zh-CN";
	}
	return Meteor.languages[curLang][key];
}

Template.tpl_header.isLogin = function() {
	return Meteor.userId();
}

Template.tpl_header.events({
	
})

//------------tpl-login--------------
Template.tpl_login.events({
	"click #btn_login": function(event, instance) {
		var userName = instance.find("#login_username").value;
		var password = instance.find("#login_password").value;
		console.log(userName, password);
		Meteor.loginWithPassword(userName, password, function(error) {
			console.log(arguments);
		})
	},

	"click #btn_register": function(event, instance) {
		Session.set("showRegisterDlg", true);
	},

	"blur #login_username": function(event) {
		var target = event.currentTarget;
		var value = target.value;
		
		if (value) {
			var parentControl =$(target).closest("div.control-group");
			if (target.validity.valid) {
				parentControl.addClass("success");
			}
			else {
				parentControl.addClass("error");
			}
		}
	},

	"focus #login_username": function(event) {
		var target = event.currentTarget;
		var parentControl =$(target).closest("div.control-group");
		parentControl.removeClass("success");
		parentControl.removeClass("error");
	},

	"blur #login_password": function(event) {
		var target = event.currentTarget;
		console.log(target.value);
	}
})

//------------tpl_register--------------
Template.tpl_register.events({
	"click #btn_reg_submit": function(event, instance) {
		console.log(instance);
		var userName = instance.find("#reg_user_name").value;
		var password = instance.find("#reg_password").value;
		
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
	},
	"blur #reg_user_name": function(event) {
		var target = event.currentTarget;
		var value = target.value;
		
		if (value) {
			var parentControl =$(target).closest("div.control-group");
			if (target.validity.valid) {
				parentControl.addClass("success");
			}
			else {
				parentControl.addClass("error");
			}
		}
	},

	"focus #reg_user_name": function(event) {
		var target = event.currentTarget;
		var parentControl =$(target).closest("div.control-group");
		parentControl.removeClass("success");
		parentControl.removeClass("error");
	}
})

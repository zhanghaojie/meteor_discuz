
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
		event.preventDefault();
		var userName = instance.find("#login_username").value;

		var password = instance.find("#login_password").value;
		//console.log(userName, password);
		if (userName && password) {
			Meteor.loginWithPassword(userName, password, function(error) {
				if (error) {
					if (error.reason === "User not found") {
						showErrorModal("用户不存在");
						return;
					}
					console.log(error);
					showErrorModal("用户名或者密码错误");
				}
			})
		}
		else {
			if (!userName) {
				showErrorModal("请输入用户名");
				return ;
			}
			if (!password) {
				showErrorModal("请输入密码");
				return ;
			}
		}

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
	}
})

//------------tpl_register--------------
Template.tpl_register.events({
	"click #btn_reg_submit": function(event, instance) {
		var userNameInput = instance.find("#reg_user_name");
		var passwordInput = instance.find("#reg_password");

		var userName = userNameInput.value;
		var password = passwordInput.value;
		
		var options = {
			username: userName,
			password: password
		}

		Accounts.createUser(options, function(error) {
			if (error) {
				//console.log("create user failed:" + error);
				console.log(error);
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
			if (verifyEmail(value)) {
				Meteor.call("isUserExisted", value, function(error, result) {
					if (!error) {
						if (result) {
							$("#reg_user_name_info").text("用户已存在！");
							parentControl.addClass("error");
						}
						else {
							$("#reg_user_name_info").text("用户可用！");
							parentControl.addClass("success");

						}
					}
					else {
						// TODO
					}
				})
			}
			else {
				$("#reg_user_name_info").text("用户名格式不正确");
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

function verifyEmail(email) {
	if (email.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)) {
		return true;
	}
	return false;
}


Template.tpl_header.helpers({
    lang: function(key) {
        var curLang = Meteor.currentLanguage;
        if (!Meteor.languages[curLang]) {
            curLang = "zh-CN";
        }
        return Meteor.languages[curLang][key];
    },

    isLogin: function() {
        return !!Meteor.userId();
    }
})

//------------tpl-login--------------
Template.tpl_login.events({
	"click #btn_login": function(event, instance) {
        //event.preventDefault();
		var userName = instance.find("#login_username").value;
		var password = instance.find("#login_password").value;

		if (userName && password) {
			Meteor.loginWithPassword(userName, password, function(error) {
                if (error) {
                    Meteor.clearTimeout(instance["hidePopoverHandle"]);
                    var $login = $(instance.find("#btn_login"));
                    $login.tooltip("show");

                    var handle = Meteor.setTimeout(function() {
                        $login.tooltip("hide");
                    }, 3000);

                    instance["hidePopoverHandle"] = handle;
				}
			})
		}
		else {
			if (!userName) {
                Meteor.clearTimeout(instance["hidePopoverHandle1"]);
                var $loginUserName = $(instance.find("#login_username"));
                $loginUserName.tooltip("show");

                var handle = Meteor.setTimeout(function() {
                    $loginUserName.tooltip("hide");
                }, 3000);

                instance["hidePopoverHandle1"] = handle;

			} else if (!password) {
                Meteor.clearTimeout(instance["hidePopoverHandle1"]);
                var $loginPassword = $(instance.find("#login_password"));
                $loginPassword.tooltip("show");

                var handle = Meteor.setTimeout(function() {
                    $loginPassword.tooltip("hide");
                }, 3000);

                instance["hidePopoverHandle1"] = handle;
			}
		}
        return false;
	}
})

Template.tpl_login.rendered = function() {
    var userName = this.find("#login_username");
    var password = this.find("#login_password");
    var btnLogin = this.find("#btn_login");

    $(btnLogin).tooltip({
        title: "用户名或密码错误",
        //content: "用户名或密码错误",
        placement: "bottom",
        trigger: "manual"
    })

    $(userName).tooltip({
        title: "用户名不能为空",
        placement: "bottom",
        trigger: "manual"
    })

    $(password).tooltip({
        title: "密码不能为空",
        placement: "bottom",
        trigger: "manual"
    })
}

//------------tpl_register--------------
Template.tpl_register.events({
	"click #btn_reg_submit": function(event, instance) {
		var userNameInput = instance.find("#reg_user_name");
		var passwordInput = instance.find("#reg_password");

		var userName = userNameInput.value;
		var password = passwordInput.value;
		
		var options = {
			email: userName,
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
						// TODO  服务器返回错误
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

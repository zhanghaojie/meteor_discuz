
Template.tpl_header.rendered = function() {

}

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
                Meteor.clearTimeout(instance["hidePopoverHandle2"]);
                var $loginPassword = $(instance.find("#login_password"));
                $loginPassword.tooltip("show");

                var handle = Meteor.setTimeout(function() {
                    $loginPassword.tooltip("hide");
                }, 3000);

                instance["hidePopoverHandle2"] = handle;
			}
		}
        return false;
	},

    "click #btn_register": function(event, instance) {
    	showDialog("tpl_register");
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

	"blur #reg_user_name": function(event, instance) {
		var target = event.currentTarget;
		var value = target.value;
        var parentControl =$(target).closest("div.control-group");
        parentControl.removeClass("error");
        parentControl.removeClass("success");
		if ($(target).valid()) {
            var validator = $(instance.find("form")).validate();
            Meteor.call("isUserExisted", value, function(error, result) {
                if (!error) {
                    if (result) {
                        validator.showErrors({username: "用户名已注册"});
                        parentControl.addClass("error");
                    }
                    else {
                        validator.showErrors({username: "用户名可用"});
                        parentControl.addClass("success");
                    }
                }
                else {
                    // TODO  服务器返回错误
                }
            })
	    }
        else {
            var parentControl =$(target).closest("div.control-group");
            parentControl.addClass("error");
        }
    }
/*
	"focus #reg_user_name": function(event) {
		var target = event.currentTarget;
		var parentControl =$(target).closest("div.control-group");
		parentControl.removeClass("success");
		parentControl.removeClass("error");
	}
	*/
})

Template.tpl_register.rendered = function() {
    //var form = this.find("form");
    //invalidator = $(form).validate();
    //invalidator.showErrors();
    //console.log(invalidator.invalidElements());
}


var pointer = "api/login/login.php";
//checks if token is present if not loads in login content

//loads in and changes via async the register and login content
$(document).on("change", "#newUser", function () {
    if (document.getElementById("newUser").checked) {
        $("<div id='temp'>").load("/Resources/html/loads.html #regEmail").prependTo("#loginForm").height(0).animate({ height: 47 }, 500);
        $("#tacDiv").css("display", "block").animate({ height: 40, opacity: 100, marginBottom: 10 }, 500);
        pointer = "api/reg/registartion.php";
        document.loginForm.action = pointer;
        document.loginForm.login_reg_but.innerHTML = "Register";
    }
    else {
        $("#temp").slideToggle(500, function (e) { $("#temp").remove(); });
        $("#tacDiv").animate({ height: 0, opacity: 0, marginBottom: -6 }, 500, function () {
            $("#tacDiv").css("display", "none")
        });
        pointer = "api/login/login.php";
        document.loginForm.action = pointer;
        document.loginForm.login_reg_but.innerHTML = "Login";
    }
});

function preSubmit(){
    if ($("#newUser").prop('checked')) {
        if ($("#tac").prop('checked')) {
            $.ajax({
                type: "POST",
                url: '/api/reg/prereg.php',
                data: $("#loginForm").serialize(),
                cache: false,
                processData: false,
                success: function (data) {
                    if (data) {
                        var results = JSON.parse(data);

                        if ($("#newUser").prop('checked')) {
                            if (results.success) {
                                grecaptcha.execute();
                            } else {
                                switch (results.error_code) {
                                    case 1:
                                        errorMessageDsp("You are missing something from the form");
                                        break;
                                    case 2:
                                        errorMessageDsp("Someone with tat username already excists");
                                        break;
                                    case 3:
                                        errorMessageDsp("There is a problems with your captcha");
                                        break;
                                    default:
                                        errorMessageDsp("Something has gone very wrong");
                                }

                            }
                        }
                    }
                }

            });
        } else {
            errorMessageDsp("You must agree to are T&C's");
        }
    } else {
        onSubmit();
    }
}

function onSubmit() {
    $.ajax({
        type: "POST",
        url: pointer,
        data: $("#loginForm").serialize(),
        cache: false,
        processData: false,
        beforeSend: function () { $('[name = "login_reg_but"]').html('Connecting...'); },
        success: function (data) {
            if (data) {
                var results = JSON.parse(data);
                if ($("#newUser").prop('checked')) {
                    if (results.success) {
                        localStorage.setItem("userToken", results.token);
                        loadCre();
                    } else {
                        switch (results.error_code) {
                            case 1:
                                errorMessageDsp("You are missing something from the form");
                                break;
                            case 2:
                                errorMessageDsp("Someone with tat username already excists");
                                break;
                            case 3:
                                errorMessageDsp("There is a problems with your captcha");
                                break;
                            default:
                                errorMessageDsp("Something has gone very wrong");
                        }
                    }

                } else {
                    if (results.success) {
                        localStorage.setItem("userToken", results.token);
                        $("#acount").remove();
                        loadHome();
                    } else {
                        switch (results.error_code) {
                            case 1:
                                errorMessageDsp("You are missing something from the form");
                                break;
                            case 2:
                                errorMessageDsp("Your username or password is incorrect");
                                break;
                            case 3:
                                errorMessageDsp("There is a problems with your captcha");
                                break;
                            default:
                                errorMessageDsp("Something has gone very wrong");
                        }
                    }
                }
            } else {
                errorMessageDsp("Something has gone wrong");
            }
        }

    });
}

function errorMessageDsp(error){
 	$("#error").html("<span style='color:#cc0000'>Error:</span> "+error+". ");	
	$('#loginForm').effect( "shake" );
}
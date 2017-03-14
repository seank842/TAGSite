var pointer = "api/login/login.php";
//checks if token is present if not loads in login content

//loads in and changes via async the register and login content
$(document).on("change", "#newUser", function () {
    if (document.getElementById("newUser").checked) {
        $("<div id='temp'>").load("/Resources/html/loads.html #regEmail").prependTo("#loginForm").height(0).animate({ height: 47 }, 500);
        $("#tacDiv").css("display", "block").animate({ height: 40, opacity: 100, marginBottom: 10 }, 500)/*.prop('required', true)*/;
        pointer = "api/reg/registartion.php";
        document.loginForm.action = pointer;
        document.loginForm.login_reg_but.innerHTML = "Register";
    }
    else {
        $("#temp").slideToggle(500, function (e) { $("#temp").remove(); });
        $("#tacDiv").animate({ height: 0, opacity: 0, marginBottom: -6 }, 500, function () {
            $("#tacDiv").css("display", "none")/*.prop('required', false)*/;
        });
        pointer = "api/login/login.php";
        document.loginForm.action = pointer;
        document.loginForm.login_reg_but.innerHTML = "Login";
    }
});
/*
$("#loginForm").submit(function (event) {
    console.log("Handler for .submit() called.");
    event.preventDefault();
});
*/

function preSubmit(){
    var reg;
    if ($("#newUser").prop('checked')) {
        reg=true;
        if ($("#tac").prop('checked')) {
            if (isValidEmailAddress($("input[name = Email]").val())) {
                $.ajax({
                    async: true,
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
                                    //onSubmit(reg);
                                } else
                                    errorHandeler(results.error_code, reg);
                            }
                        }
                    }
                });
            } else {
                errorMessageDsp("Email not valid!");
            }
        } else
            errorMessageDsp("You must agree to are T&C's");
    } else {
        reg=false;
        onSubmit(reg);
    }
}

function onSubmit(reg) {
    $.ajax({
        async: true,
        type: "POST",
        url: pointer,
        data: $("#loginForm").serialize(),
        cache: false,
        processData: false,
        beforeSend: function () { $('[name = "login_reg_but"]').html("Connecting..."); },
        success: function (data) {
            if (data) {
                var results = JSON.parse(data);
                if ($("#newUser").prop('checked')) {
                    if (results.success) {
                        localStorage.setItem("userToken", results.Token);
                        changeLoc("charaCre");
                    } else {
                        errorHandeler(results.error_code, reg);
                    }
                } else {
                    if (results.success) {
                        localStorage.setItem("userToken", results.token);
                        changeLoc("home");
                    } else {
                        errorHandeler(results.error_code, reg);
                    }
                }
            } else
                errorMessageDsp("Something has gone wrong");
        }
    });
}

function errorMessageDsp(error){
    $("#error").html("<span style='color:#cc0000'>Error:</span> "+error+". ");	
    $('#loginForm').effect("shake");
    toastr['error']("Register/Login", error)
}

function errorHandeler(errorCode, reg){
    switch (errorCode) {
        case 1:
            changeButtDis(reg);
            errorMessageDsp("You are missing something from the form");
            break;
        case 2:
            changeButtDis(reg);
            if(reg)
                errorMessageDsp("Someone with that username already exists");
            else
                errorMessageDsp("Your username or password is incorrect");
            break;
        case 3:
            changeButtDis(reg);
            errorMessageDsp("There is a problems with your captcha");
            break;
        default:
            changeButtDis(reg);
            errorMessageDsp("Something has gone very wrong");
    }
}

function changeButtDis(reg){
    if(reg)
        $('[name = "login_reg_but"]').html("Register");
    else
        $('[name = "login_reg_but"]').html("Login");
}

function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
};
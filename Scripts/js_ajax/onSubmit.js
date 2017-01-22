function onSubmit() {
    console.log(1);
    var username = $("#username").val();
    var password = $("#password").val();
    var dataString = 'username=' + username + '&password=' + password;
    if ($.trim(username).length > 0 && $.trim(password).length > 0) {
        console.log(4);
        $.ajax({
            type: "POST",
            url: "login.php",
            data: dataString,
            cache: false,
            beforeSend: function () { $('[name = "login_reg_but"]').innerHTML('Connecting...'); },
            success: function (data) {
                if (data) {
                    console.log(5);
                } else {
                    console.log(3);
                    $('#loginForm').shake();    //Shake animation effect.
                    $("#error").html("<span style='color:#cc0000'>Error:</span> Invalid username and password. ");
                }
            }

        });
    }
    return false;
}

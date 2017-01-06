var home = true;
//checks if token is present if not loads in login content
$(window).on('load', function isLoggedIn() {
    var userToken = localStorage.getItem('userToken');
    if (userToken == null) {
        loadLogin();
    } else {
        var postD = { Token: userToken };
        $.ajax({
            type: "POST",
            url: "api/login/auth.php",
            data: postD,
            cache: false,
            processData: false,
            success: function (data) {
                var results = JSON.parse(data);
                if (results.success)
                    loadHome();
                else
                    loadHome();
            }
        });
    }
});

function loadLogin() {
    $("#mBody").load("/Resources/html/loads.html #account").hide().prependTo("#mBody").fadeIn(500);
    $("#mBody").append('<script src="https://www.google.com/recaptcha/api.js"></script>');
    home = false;
}

function loadHome() {
    $("#mBody").load("/Resources/html/homeLoads.html").hide().prependTo("#mBody").fadeIn(500);
    home = true;
}

function loadCre(){
    $("#mBody").load("/Resource/html/charaCreLoads.html").hide().prependTo("#mBody").fadeIn(500);
    home = false;
}

function loadList(){
    $("#mBody").load("/Resource/html/charaList.html").hide().prependTo("#mBody").fadeIn(500);
    listShow();
    home = false;
}

function showCre() {
    $("#homeMain").remove();
    loadCre();
}

function showList() {
    $("#homeMain").remove();
    $("#charaCre").remove();
    loadList();
}

function logout() {
    localStorage.clear();
    console.log("logged out");
    loadLogin();
}

history.pushState(null, null, document.URL);
window.addEventListener('popstate', function () {
    if (home) {

    } else {
        history.pushState(null, null, document.URL);
        $("#homeMain").remove();
        $("#charaCre").remove();
        $("#charaList").remove();
        loadHome();
    }
    
});
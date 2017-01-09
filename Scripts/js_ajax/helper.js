var currentLoc = "account";
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

function changeLoc(newLoc){
    $(currentLoc).remove();
    var newLocPath;
    switch(newLoc){
        case "account":
            newLocPath = "/Resources/html/loads.html #account";
            break;
        case "home":
            newLocPath = "/Resources/html/homeLoads.html";
            break;
        case "chaCre":
            newLocPath = "/Resource/html/charaCreLoads.html";
            break;
        case "chaList":
            newLocPath = "/Resource/html/charaList.html"
            break;
        default:
            console.error.log("new localtion not defined: "+newLocPath);
    }
    $("#mBody").load(newLocPath).hide().prependTo("#mBody").fadin(500);
    currentLoc=newLoc;
}

function showCre() {
    changeLoc("chaCre");
}

function showList() {
    changeLoc("chaList");
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
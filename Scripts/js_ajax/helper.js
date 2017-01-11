﻿var currentLoc;
//checks if token is present if not loads in login content
$(window).on('load', function isLoggedIn() {
    var userToken = localStorage.getItem('userToken');
    if (userToken == null) {
        changeLoc("account");
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
                    changeLoc("home");
                else{
                    localStorage.clear();
                    changeLoc("account");
                }
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
        case "charaCre":
            newLocPath = "/Resource/html/charaCreLoads.html";
            break;
        case "charaList":
            newLocPath = "/Resource/html/charaList.html"
            break;
        default:
            console.error.log("new localtion not defined: "+newLocPath);
    }
    $("#"+currentLoc).remove();
    $("#mBody").load(newLocPath).hide().prependTo("#mBody").fadin(500);
    currentLoc=newLoc;
}
/*
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
*/
function showCre() {
    changeLoc("charaCre");
}

function showList() {
    changeLoc("charaList");
}

function logout() {
    localStorage.clear();
    console.log("logged out");
    changeLoc("account");
}

history.pushState(null, null, document.URL);
window.addEventListener('popstate', function () {
    if (currentLoc=="home") {
        return 0;
    } else {
        history.pushState(null, null, document.URL);
        $("#home").remove();
        $("#charaCre").remove();
        $("#charaList").remove();
        loadHome();
    }
});

function getCharStats(char){
    var charaID=char.data("charid");
    var postData={charID:charaID};
    $.ajax({
        type: "POST",
        url: '/api/chara/getStat.php',
    	data: postData,
    	cache: false,
    	success: function (data) {
		 	var results = JSON.parse(data);
            if(results.success){

            }
        }
    });
}
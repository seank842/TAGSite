var currentLoc;
var newLoc;
var userToken = localStorage.getItem('userToken');
//checks if token is present if not loads in login content
$(window).on('load', function () {
    isLoggedIn();
});

function isLoggedIn() {
    if (userToken == null) {
        changeLoc("account");
    } else {
        var postD = { Token: userToken };
        $.ajax({
            async: true,
            type: "POST",
            url: "api/login/auth.php",
            data: postD,
            cache: false,
            processData: true,
            success: function (data) {
                var results = JSON.parse(data);
                if (results.success){
                    changeLoc("home");
					console.log(data);
				}
                else{
                    localStorage.clear();
                    changeLoc("account");
                }
            }
        });
    }
}

function setUsername() {
    if (!localStorage.getItem('userName')) {
        var postD = { Token: userToken };
        $.ajax({
            async: true,
            type: "POST",
            url: "api/user/getInfo.php",
            data: postD,
            cache: false,
            processData: true,
            success: function (data) {
                var results = JSON.parse(data);
                if (results.success) {
                    $("#userName").html(results.Users.UserName);
                    localStorage.setItem('userName', results.Users.UserName);
                }
                else {

                    //changeLoc("account");
                }
            }
        });
    } else {
        $("#userName").html(localStorage.getItem('userName'));
    }
}

function changeLoc(newLoc){
	userToken = localStorage.getItem('userToken');
    $(currentLoc).remove();
    var newLocPath;
    switch(newLoc){
        case "account":
            newLocPath = "/Resources/html/loads.html #account";
			barID="preLogin";
            flipMain(newLocPath, barID, function () { $("#mBody").append("<script src='https://www.google.com/recaptcha/api.js'></script>"); });
            break;
        case "home":
            newLocPath = "/Resources/html/homeLoads.html";
			barID="main";
            flipMain(newLocPath, barID, function () { setUsername(); });
            break;
        case "charaCre":
            newLocPath = "/Resources/html/charaCreLoads.html";
			barID="main";
            flipMain(newLocPath, barID, function () { setUsername(); });
            break;
        case "charaList":
            newLocPath = "/Resources/html/charaList.html";
			barID="main";
            flipMain(newLocPath, barID, function () { charListShow(); setUsername(); });
            break;
		 case "shop":
            newLocPath = "/Resources/html/shop.html";
			barID="main";
            flipMain(newLocPath, barID, function () { itemListShow(); setUsername(); });
            break;
         case "invent":
            newLocPath = "/Resources/html/inventoryList.html";
            barID = "main";
            flipMain(newLocPath, barID, function () { pollPlayerItems(); setUsername(); });
            break;
        default:
            console.error.log("new localtion not defined: "+newLocPath);
    }
}

function flipMain(path, barID, callback) {
    $("#mBody").fadeOut(500, function () {
        $("#" + currentLoc).remove();
        if (!$("#main").length || path == "/Resources/html/loads.html #account") {
            $(".navbar").load("/Resources/html/narBar.html #" + barID, function () {
                $("#mBody").load(path, function () {
                    currentLoc = newLoc;
                    if (callback != undefined) {
                        console.log("calback");
                        callback();
                    }
                }).fadeIn(500);
            });
        } else {
            $("#mBody").load(path, function () {
                currentLoc = newLoc;
                if (callback != undefined) {
                    console.log("calback");
                    callback();
                }
            }).fadeIn(500);
        }
    });

}


function showCre() {
    changeLoc("charaCre");
}

function showShop() {
    changeLoc("shop");
}

function showList() {
    changeLoc("charaList");
}

function showInvent() {
    changeLoc("invent");
}

function logoClick() {
    if (userToken) {
        changeLoc("home");
    } else {
        changeLoc("account");
    }
}

function logout() {
    localStorage.clear();
    console.log("logged out");
    changeLoc("account");
}

history.pushState(null, null, document.URL);
window.addEventListener('popstate', function () {
    if (currentLoc=="home") {
        return;
    } else {
        history.pushState(null, null, document.URL);
        $("#home").remove();
        $("#charaCre").remove();
        $("#charaList").remove();
       isLoggedIn();
    }
});

function getCharStats(char){
    var charaID=char.data("charid");
    var postData={charID:charaID};
    $.ajax({
        async: true,
        type: "POST",
        url: '/api/chara/getStat.php',
    	data: postData,
    	cache: false,
    	success: function (data) {
		 	var results = JSON.parse(data);
            if(results.success)
                return results;
            else
                console.log("error getting stats");
        }
    });
}


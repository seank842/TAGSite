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

function setGold() {
    var change = localStorage.getItem('changeG');
    if (!localStorage.getItem('gold') || change === "true") {
        localStorage.setItem('changeG', false);
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
                    $("#gold").html(results.Users.Money);
                    localStorage.setItem('gold', results.Users.Money);
                }
                else {

                    //changeLoc("account");
                }
            }
        });
    } else {
        $("#gold").html(localStorage.getItem('gold'));
    }
}


function changeLoc(newLoc){
	userToken = localStorage.getItem('userToken');
    $(currentLoc).remove();
    var newLocPath;
    switch(newLoc){
        case "account":
             newLocPath = "/Resources/html/loads.html #account";
             barID = "preLogin";
             flipMain(newLocPath, barID, function () { $("#mBody").append("<script src='https://www.google.com/recaptcha/api.js'></script>"); });
             break;
        case "home":
             newLocPath = "/Resources/html/homeLoads.html";
             barID = "main";
             flipMain(newLocPath, barID, function () { setUsername(); setGold(); loadSVG("Resources/image/background/TownFull.svg"); changeBg(""); navigation(); });
             break;
        case "charaCre":
             newLocPath = "/Resources/html/charaCreLoads.html";
             barID = "main";
             flipMain(newLocPath, barID, function () { setUsername(); setGold(); loadSVG("Resources/image/background/Bar.svg"); });
             break;
        case "shopfull":
             newLocPath = "/Resources/html/shop.html";
             barID = "main";
             flipMain(newLocPath, barID, function () { itemListShow(); setUsername(); setGold(); changeBg("Resources/image/backgrounds/shop/shop_bg.svg"); loadSVG("Resources/image/background/shop/shop_scroll.svg"); });
             break;
         case "invent":
             newLocPath = "/Resources/html/inventoryList.html";
             barID = "main";
             flipMain(newLocPath, barID, function () { pollPlayerItems(); setUsername(); setGold(); loadSVG("Resources/image/background/invent/invent_scroll.svg"); });
             break;
         case "charaEquip":
             newLocPath = "/Resources/html/charaEquip.html";
             barID = "main";
             flipMain(newLocPath, barID, function () { charaListShow(); setUsername(); setGold(); loadSVG("Resources/image/background/armory/armory_rack.svg"); });
             break;
         case "charaStats":
             newLocPath = "/Resources/html/charaStats.html";
             barID = "main";
             flipMain(newLocPath, barID, function () { charaListShow(); setUsername(); setGold(); });
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
    $.when(killDrags).then(changeLoc("shopfull"));
}

function showList() {
    changeLoc("charaList");
}

function showInvent() {
    $.when(killDrags).then(changeLoc("invent"));
}

function showCharaEquip() {
    $.when(killDrags).then(changeLoc("charaEquip"));
}

function showCharaStats() {
    changeLoc("charaStats");
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

function killDrags(){
    Draggable.get("#list").kill();
    return;
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

function changeBg(url) {
    $(document.body).css('background-image', 'url(' + url + ')');

}
function changeList(url) {
    $("#list").css('background-image', 'url(' + url + ')');

}

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

function showADl() {
    var retVal = confirm("Do you want to Download the Android game?");
    if (retVal == true) {
        window.location = 'https://drive.google.com/file/d/0B8Mo80EWaCAbVGlISWxaZlZyRm8/view?usp=sharing';
        return true;
    }
    else {

        return false;
    }
}

function showDDl() {
    var retVal = confirm("Do you want to Download the Desktop game?");
    if (retVal == true) {
        window.location = 'Resources/downloads/TAG-v-ALPHA-2.jar';
        return true;
    }
    else {
        
        return false;
    }
}
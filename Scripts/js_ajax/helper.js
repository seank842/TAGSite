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

function setUsername(){
 var postD = { Token: userToken };
        $.ajax({
            type: "POST",
            url: "api/user/getInfo.php",
            data: postD,
            cache: false,
            success: function (data) {
                var results = JSON.parse(data);
                if (results.success){
                    $("#userName").html(results.Users.UserName);   
                   }
                else{
                  
                    //changeLoc("account");
                }
            }
});
}

function changeLoc(newLoc){
    $(currentLoc).remove();
    var newLocPath;
    switch(newLoc){
        case "account":
            newLocPath = "/Resources/html/loads.html #account";
			barID="preLogin";
			flipMain(newLocPath,barID);
            break;
        case "home":
            newLocPath = "/Resources/html/homeLoads.html";
			barID="main";
			flipMain(newLocPath,barID,function(){setUsername();});
            break;
        case "charaCre":
            newLocPath = "/Resource/html/charaCreLoads.html";
			barID="main";
			flipMain(newLocPath,barID,function(){setUsername();});
            break;
        case "charaList":
            newLocPath = "/Resource/html/charaList.html"
			barID="main";
			flipMain(newLocPath,barID,function(){charListShow(); setUsername();});
            break;
        default:
            console.error.log("new localtion not defined: "+newLocPath);
    }
}

function flipMain(path,barID,callback){
	 $("#mBody").fadeOut(500,function(){
		$("#"+currentLoc).remove();
		$(".navbar").load("/Resource/html/narBar.html #"+barID,function(){
    		$("#mBody").load(path,function(){
                currentLoc=newLoc;
		        if(callback != undefined){
		            callback();
		        }
            }).fadeIn(500);
        });
	});	
	
}


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
       isLoggedIn();
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
            if(results.success)
                return results;
            else
                console.log("error getting stats");
        }
    });
}


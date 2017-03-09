var charid = null, buffRight = null, buffNum = null, stats = null, stre = null, agil = null, sta = null, magic=null;

function checkBuff() {
    postD = { CharID: charid };
    $.ajax({
        async: true,
        type: "POST",
        url: "api/chara/get.php",
        data: postD,
        cache: false,
        processData: true,
        success: function (data) {
            var results = JSON.parse(data);
            console.log(results);
            if (results.success) {
                if (results.Char.BuffTokens < 1) {
                    buffRight = false;
                } else {
                    buffRight = true;
                    buffNum = results.Char.BuffTokens;
                }
                showStats();
            } else {
                toastr['error']("Character Stats", "Please log back in and try again!")
                localStorage.clear();
                changeLoc("account");
            }
        }
    });
}
function showStats() {
    $.when(getStats()).then(loadStats());
}

function getStats() {
    $.ajax({
        async: true,
        type: "POST",
        url: "api/chara/getStat.php",
        data: postD,
        cache: false,
        processData: true,
        success: function (data) {
            var results = JSON.parse(data);
            console.log(results);
            if (results.success) {
                stats = results;
            } else {
                //send to error handler
            }
        }
    });
    return 0;
}

function loadStats() {
    $(function () {
        $.when(
            $.get("Resources/image/statLine_stre.svg", function (svg) {
                $("#stre_cont").append(svg.documentElement);
            }),
            $.get("Resources/image/statLine_agil.svg", function (svg) {
                $("#agil_cont").append(svg.documentElement);
            }),
            $.get("Resources/image/statLine_sta.svg", function (svg) {
                $("#sta_cont").append(svg.documentElement);
            }),
            $.get("Resources/image/statLine_magic.svg", function (svg) {
                $("#magic_cont").append(svg.documentElement);
            })
        ).then(init);

        function init() {
            $.each(stats.Starts.stat, function (index) {
                switch (index) {
                    case 0:
                        break;
                    case 1:
                        break;
                    case 2:
                        TweenLite.to("#stre", 1, { scale: 1, transformOrigin: "50% Left" });
                        break;
                    case 3:
                        TweenLite.to("#agil", 1, { scale: 1, transformOrigin: "50% Left" });
                        break;
                    case 4:
                        TweenLite.to("#sta", 1, { scale: 1, transformOrigin: "50% Left" });
                        break;
                    case 5:
                        TweenLite.to("#magic", 1, { scale: 1, transformOrigin: "50% Left" });
                        break;
                    default:
                        console.log("didn't enter");
                        break;
                }
                
            });
            return 0;
        }
    });
}

function addStat(element) {
    id = element.id;
    switch (id) {
        case "stre":
            stre++;
            console.log(stre);
            break;
        case "agil":
            agil++;
            console.log(agil);
            break;
        case "sta":
            sta++;
            console.log(sta);
            break;
        case "magic":
            magic++;
            console.log(magic);
            break;
        default:
            console.log("error");
    }
}

function lowerStat(element) {
    id = element.id;
    switch (id) {
        case "stre":
            if (stre === null) {
                console.log("can't remove points");
            } else {
                stre--;
            }
            console.log(stre);
            break;
        case "agil":
            if (agil === null) {
                console.log("can't remove points");
            } else {
                agil--;
            }
            console.log(agil);
            break;
        case "sta":
            if (sta === null) {
                console.log("can't remove points");
            } else {
                sta--;
            }
            console.log(sta);
            break;
        case "magic":
            if (magic === null) {
                console.log("can't remove points");
            } else {
                magic--;
            }
            console.log(magic);
            break;
        default:
            console.log("error");
    }
}

function save() {
    if (stre === null && agil === null && sta === null && magic == null) {
        console.log("nothing to save!");
    } else {
        var postD;
        if (!stre == null || !stre == 0) {
            postD = { CharID: charid, StatID: 2, Token: localStorage.getItem('userToken') };
        } else if (!agil == null || !agil == 0) {
            postD = { CharID: charid, StatID: 3, Token: localStorage.getItem('userToken') };
        } else if (!sta == null || !sta == 0) {
            postD = { CharID: charid, StatID: 4, Token: localStorage.getItem('userToken') };
        } else if (!magic == null || !magic == 0) {
            postD = { CharID: charid, StatID: 5, Token: localStorage.getItem('userToken') };
        } else {
            console.log("somthing really went wrong!!!!");
            return 0;
        }
        $.ajax({
            async: true,
            type: "POST",
            url: "api/chara/buff.php",
            data: postD,
            cache: false,
            processData: true,
            success: function (data) {
                var results = JSON.parse(data);
                console.log(results);
                if (results.success) {
                    
                } else {
                    //send to error handler
                }
            }
        });
    }
}
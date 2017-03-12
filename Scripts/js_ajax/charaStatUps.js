var charid = null, stre = null, agil = null, sta = null, magic = null;

function checkBuff(charid, tempDiv) {
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
                    toastr['warning']( "This character can not be buffed! stats will display", "Character Stats")
                    getStats(postD, tempDiv);
                    return true;
                } else {
                    toastr['info']("You have " + results.Char.BuffTokens + " Buff Tokens to spend on this character", "Character Buffing")
                    getStats(postD, tempDiv);
                    return true;
                }
            } else {
                toastr['error']( "Please log back in and try again!", "Character Stats")
                localStorage.clear();
                changeLoc("account");
            }
        }
    });
}

function getStats(postD, tempDiv) {
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
                loadStats(results, tempDiv);
            } else {
                toastr["error"]("Catastrophic error, contact support", "Character get stats")
                return false;
            }
        }
    });
}

function loadStats(stats, tempDiv) {
    $.each(stats.Starts.stat, function (index, v) {
        console.log(v);
        switch (index) {
            case 0:
                break;
            case 1:
                break;
            case 2:
                stre = v.Value;
                break;
            case 3:
                agil = v.Value;
                break;
            case 4:
                sta = v.Value;
                break;
            case 5:
                magic = v.Value;
                break;
            default:
                toastr["error"]("Catastrophic error, contact support", "Character load stats")
                break;
        }
    });
    setCard(tempDiv);
}

function addStat(stat, charidN) {
    console.log(stat);
    switch (stat) {
        case "str":
            var stre = $("#stats_" + charidN).find(".stre").attr('id');
            uploadStat(stre, 2, charidN);
            stre++
            var element = $("#stats_" + charidN).find(".stre");
            element.attr('id', stre);
            element.html(stre);
            break;
        case "agi":
            var agil = $("#stats_" + charidN).find(".agil").attr('id');
            uploadStat(agil, 3, charidN);
            agil++;
            var element = $("#stats_" + charidN).find(".agil");
            element.attr('id', agil);
            element.html(agil);
            break;
        case "stam":
            var sta = $("#stats_" + charidN).find(".sta").attr('id');
            uploadStat(sta, 4, charidN);
            sta++;
            var element = $("#stats_" + charidN).find(".sta");
            element.attr('id', sta);
            element.html(sta);
            break;
        case "magi":
            var magic = $("#stats_" + charidN).find(".magic").attr('id');
            uploadStat(magic, 5, charidN);
            magic++;
            var element = $("#stats_" + charidN).find(".magic");
            element.attr('id', magic);
            element.html(magic);
            break;
        default:
            console.log("error");
    }
}

function uploadStat(charid, statid, charidN) {
    postUD = { CharID: charidN, StatID: statid, Token: localStorage.getItem('userToken') };
    console.log(postUD);
    $.ajax({
        async: true,
        type: "POST",
        url: "api/chara/buff.php",
        data: postUD,
        cache: false,
        processData: true,
        success: function (data) {
            var results = JSON.parse(data);
            console.log(results);
            if (results.success) {
                toastr['success']("Buff applied!", "Buffing")
                return true;
            } else {
                toastr['error']("Unable to apply buff!", "Buffing error")
            }
        }
    });
}

/*
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
}*/
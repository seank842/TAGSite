function charaListShow() {
    pollPlayerEquipItems(localStorage.getItem('userToken'));
    var postData = { Token: localStorage.getItem('userToken') };
    $.ajax({
        async: true,
        type: "POST",
        url: '/api/chara/list.php',
        data: postData,
        cache: false,
        processData: true,
        success: function (data) {
            var results = JSON.parse(data);
            if (results.success) {
                var place=0;
                $.each(results.char.char, function (index, value) {
                    if (value.Pet === 0)
                        image = "charTemp";
                    else
                        image = "petTemp";
                    $("#charaL" + place).append("<div class='chara'  data-charid='" + value.CharacterID + "'><img class='charaImage' align='middle' src='Resources/image/Charas/" + value.Type +
                        ".png'><p id='" + value.CharacterID + "'>Name:" + value.Name + " <br> Health:" + value.CurrentHealth + "/" + value.MaxHealth + "<br><br><br></p><p id='stats_"+ value.CharacterID + "'></p>");
						place++;
						if(place===6){
							place=0;
						}
                });
                if ($("#charaStats").length) {
                    charCheckClick();
                } else {
                    charCheckClickA();
                }
            }
            else {
                toastr['error']("Character loading", "Please log back in and try again!")
                localStorage.clear();
                changeLoc("account");
            }
        }
    });
}

function pollPlayerEquipItems(user) {
    var change = localStorage.getItem('changeE');
    if (!localStorage.getItem('playerEquipment') ||change === "true") {
        localStorage.setItem('changeE', false);
        var postData = { Token: user };
        $.ajax({
            async: true,
            type: "POST",
            url: '/api/user/getEqipItems.php',
            data: postData,
            cache: false,
            success: function (data) {
                var results = JSON.parse(data);
                if (results.success) {
                    console.log(results);
                    localStorage.setItem('playerEquipment', JSON.stringify(results));
                    calcDisplay(JSON.parse(localStorage.getItem('playerEquipment')));
                } else {
                    loadLogin();
                }
            }
        });
    } else {
        return 0;
    }
}

function charCheckClick() {
    $('.chara').on("click", function () {
        var charid = $(this).data('charid');
        if (!$("#stats_" + charid).is(":empty")) {

        } else {
            checkBuff(charid, $(this));
        }
    });
}
function setCard(tempDiv) {
    var charid = tempDiv.data('charid');
    console.log("test");
    tempDiv.animate({ height: "200px" });
    $("#stats_" + charid).append(
        "Strength: <span id='" + stre + "' class='stre'>" + stre + "</span><span class='add' onclick='addStat($(this),\"str\")'><i class='fa fa-plus' aria-hidden='true'></i></span><br>" +
        "Agility: <span id='" + agil + "' class='agil'>" + agil + "</span><span class='add' onclick='addStat($(this),\"agi\")'><i class='fa fa-plus' aria-hidden='true'></i></span><br>" +
        "Stamina: <span id='" + sta + "' class='sta'>" + sta + "</span><span class='add' onclick='addStat($(this),\"stam\")'><i class='fa fa-plus' aria-hidden='true'></i></span><br>" +
        "Magic: <span id='" + magic + "' class='magic'>" + magic + "</span><span class='add' onclick='addStat($(this),\"magi\")'><i class='fa fa-plus' aria-hidden='true'></i></span>");
    tempDiv.removeClass('chara');
    tempDiv.addClass('charaC');
}

function charCheckClickA() {
    $('.chara').on("click", function () {
        charid = $(this).data('charid');
        changeBg("Resources/image/backgrounds/armory/armory_bg.svg");
        $("#fullArm").removeAttr("hidden");
        $("#charaList").hide();
        pollPlayerItems();
        setSlots();
    });
}
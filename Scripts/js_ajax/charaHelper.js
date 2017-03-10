function charListShow() {
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
                    if (value.Pet == 0)
                        image = "charTemp";
                    else
                        image = "petTemp";
                    $("#charaL"+place).append("<div class='chara'  data-charid='" + value.CharacterID + "'><img class='charaImage' align='middle' src='/Resources/image/Charas" + value.Type +
                        ".jpg'><p>Name:" + value.Name + "</p><p>Health:" + value.CurrentHealth + "/" + value.MaxHealth+"</p>"
                        + "<div class='charChara'></div></div>");
						place++;
						if(place==4){
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
        charid = $(this).data('charid');
        $("#stats").removeAttr("hidden");
        $("#charaList").hide();
        checkBuff();
    });
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
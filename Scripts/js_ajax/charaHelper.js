function charListShow() {
    pollPlayerEquipItems(localStorage.getItem('userToken'));
    console.log("CharList Show");
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
            console.log(data);
            if (results.success) {
                $.each(results.char.char, function (index, value) {
                    if (value.Pet == 0)
                        image = "charTemp";
                    else
                        image = "petTemp"

                    $("#charaList").append("<div class='chara'  data-charid='" + value.CharacterID + "'><img class='charaImage' align='middle' src='/Resources/image/" + image +
                        ".jpg'>Name:" + value.Name + "	Health:" + value.CurrentHealth + "/" + value.MaxHealth
                        + "<div class='charChara'></div></div>");
                });
                if ($("#charaStats").length) {
                    charCheckClick();
                } else {
                    charCheckClickA();
                }
            }
            else
                loadLogin();
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
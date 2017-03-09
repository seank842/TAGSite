function onSubmitCre() {
    var name = $("#Text_x5F_Name").val();
    var userToken = localStorage.getItem('userToken');
    var postD = { CharName: name, Token: userToken };
    if ($('#myMessage').val()) {
        $.ajax({
            async: true,
            type: "POST",
            url: "api/chara/new.php",
            data: postD,
            cache: false,
            beforeSend: function () { $('#Button').fadeOut(); },
            success: function (data) {
                $('[name = "cre_but"]').html('Create');
                var results = JSON.parse(data);
                if (results.success) {
                    $("#Text_x5F_XP").text("XP: " + results.Stats.xp);
                    $("#Text_x5F_Str").text("Strength: " + results.Stats.str);
                    $("#Text_x5F_Agi").text("Agility: " + results.Stats.agi);
                    $("#Text_x5F_Sta").text("Stanima: " + results.Stats.sta);
                    $("#Text_x5F_Mag").text("Magic: " + results.Stats.mag);
                    var type = "";
                    switch (results.Type) {
                        case 0:
                            type = "Rouge";
                            $("#Rouge").removeClass("chars");
                            break;
                        case 1:
                            type = "Mage";
                            $("#MAge").removeClass("chars");
                            break;
                        case 2:
                            type = "Necromancer";
                            $("#Nec").removeClass("chars");
                            break;
                        case 3:
                            type = "Knight";
                            $("#Knight").removeClass("chars");
                            break;
                        default:
                            toastr["error"]("Character Creation", "Catastrophic error, contact support")
                            break;
                    }
                    $("#Text_x5F_Type").text("Type: " + type);
                } else {
                    toastr['error']("Character Creation", "Please log back in and try again!")
                    localStorage.clear();
                    changeLoc("account");
                }
            }
        });
    } else {
        toastr['error']("Character Creation","Please name your character!")
    }
}
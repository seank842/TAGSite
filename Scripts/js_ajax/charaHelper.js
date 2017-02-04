function charListShow() {
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
                charCheckClick();
            }
            else
                loadLogin();
        }
    });
}

function charCheckClick() {
    $('.chara').on("click", function () {
        charid = $(this).data('charid');
        $("#stats").removeAttr("hidden");
        $("#charaList").hide();
        checkBuff();
    });
}
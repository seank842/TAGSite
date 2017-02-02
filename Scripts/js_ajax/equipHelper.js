var charid = null;
function getId(elem) {
    var name = $(elem).html(),
        data = JSON.parse(localStorage.getItem("playerItems")),
        id = null;
    $.each(data.items.item, function (i, v) {
        if (v.ItemName == name) {
            id = v.OwnershipID;
        }
    });
    equipItem(id);
}

function setSlots() {
    var offSetY = 40, offSetX = 40;
    var aYStand = $("#armorStand").height(), aXStand = $("#armorStand").width(), hYPos = 40 - offSetY, hXPos = (aXStand / 2) - offSetX, cYPos = 160 - offSetY, cXPos = (aXStand / 2) - offSetX,
        lYPos = ((aYStand / 3) * 2) - offSetY, lXPos = (aXStand / 2) - offSetX, handYPos = ((aYStand / 3) * 2) - 20 - offSetY, handXPos = (aXStand / 2) + 85 - offSetX;
    $("#head").css({ top: hYPos, left: hXPos });
    $("#chest").css({ top: cYPos, left: cXPos });
    $("#legs").css({ top: lYPos, left: lXPos });
    $("#hand").css({ top: handYPos, left: handXPos });
    var postD = { CharID: charid };
    $.ajax({
        async: true,
        type: "POST",
        url: "api/chara/getItems.php",
        data: postD,
        cache: false,
        processData: true,
        success: function (data) {
            var results = JSON.parse(data);
            console.log(results);
            if (results.success) {
                $.each(results.items.item, function (index) {
                    switch (results.items.item[index].SlotID) {
                        case "1":
                            $("#head").css('background-image', 'url(Resources/image/items/' + results.items.item[index].ImageURL + ')').html(results.items.item[index].ItemName);
                            console.log("entered3");
                            break;
                        case "2":
                            $("#chest").css('background-image', 'url(Resources/image/items/' + results.items.item[index].ImageURL + ')').html(results.items.item[index].ItemName);
                            console.log("entered2");
                            break;
                        case "3":
                            $("#hand").css('background-image', 'url(Resources/image/items/' + results.items.item[index].ImageURL + ')').html(results.items.item[index].ItemName);
                            console.log("entered");
                            break;
                        case "4":
                            $("#legs").css('background-image', 'url(Resources/image/items/' + results.items.item[index].ImageURL + ')').html(results.items.item[index].ItemName);
                            console.log("entered4");
                            break;
                        default:
                            console.log("error");
                            break;
                    }
                });
            } else {
                //send to error handler
            }
        }
    });
}

function equipItem(itemId) {

    var postD = { Token: localStorage.getItem('userToken'), OwnershipID: itemId, CharID: charid };
    console.log(postD);
    $.ajax({
        async: true,
        type: "POST", 
        url: "api/item/equip.php",
        data: postD,
        cache: false,
        processData: true,
        success: function (data) {
            var results = JSON.parse(data);
            console.log(results);
            if (results.success) {
                //do stuff
            } else {
                //send to error handler
            }
        }
    });
}

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
        charid=$(this).data('charid');
        $("#items").removeAttr("hidden");
        $("#charaList").hide();
        pollPlayerItems();
        setSlots();
    });
}
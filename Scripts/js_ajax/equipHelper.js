var charid = null, equipedId=null;

function getId(id) {
    equipItem(id);
}

function setSlots() {
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
                equipedId=results;
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
                console.log("item equiped");
            } else {
                errorReporting(results.error_code, itemId);
            }
        }
    });
}

function errorReporting(eCode, itemId) {
    switch (eCode) {
        case 3:
            console.log("This Item is already equiped.");
            break;
        case 4:
            console.log("This item cannot be equiped because you are too newbie.");
            break;
        case 5:
            console.log("There is an item already equiped in that slot will replace.");
            deEquip(itemId);
    }
}

function deEquip(itemId) {
    $.each(equipedId.items.item, function (index) {
        if (equipedId.items.item[index].OwnershipID == itemId) {
            var postD = { Token: localStorage.getItem('userToken'), EquipID: equipedId.items.item[index].EquipID };
            $.ajax({
                async: true,
                type: "POST",
                url: "api/item/deEquip.php",
                data: postD,
                cache: false,
                processData: true,
                success: function (data) {
                    var results = JSON.parse(data);
                    console.log(results);
                    if (results.success) {
                        equipItem(itemId);
                    } else {
                        console.log("Was unable to deequip item");
                    }
                }
            });
        }
    });
}
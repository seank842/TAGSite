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
                toastr["error"]("Item Slot Loading", "Catastrophic error, contact support")
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
            if (results.success) {
                setSlots();
                toastr["success"]("Item Equip", "Your new item has been equiped!")
            } else {
                errorReporting(results.error_code, itemId);
            }
        }
    });
}

function errorReporting(eCode, itemId) {
    switch (eCode) {
        case 3:
            toastr["error"]("Item Equip","This Item is already equiped!")
            break;
        case 4:
            toastr["error"]("Item Equip", "You are not worthy enough to use this item!")
            break;
        case 5:
            toastr["warning"]("Item Equip", "There is already an item in this slot, it will be replaced!")
            deEquip(itemId);
            break;
    }
}

function deEquip(itemId) {
    $.each(JSON.parse(localStorage.getItem('playerEquipment')).items.item, function (i, val) {
        if (val.OwnershipID == itemId) {
            var testCase = val.SlotID;
            $.each(equipedId.items.item, function (index, v) {
                if (v.SlotID == testCase) {
                    var postD = { Token: localStorage.getItem('userToken'), EquipID: v.EquipID };
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
                                toastr["success"]("Item Equip", "Item has been Successfully unequiped!")
                                equipItem(itemId);
                                return 0;
                            } else {
                                toastr["error"]("Item Equip", "Was unable to unequip item please contact support!")
                            }
                        }
                    });
                }
            });
        }
    });
}
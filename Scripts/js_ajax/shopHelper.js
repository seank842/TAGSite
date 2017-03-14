function getId(id) {
    displayItemText(id);
    shopBuy();
}

function buyItem(itemId) {
    
    var postD = { Token: localStorage.getItem('userToken'), ItemID: itemId };
    console.log(postD);
    $.ajax({
        async: true,
        type: "POST",
        url: "api/item/buy.php",
        data: postD,
        cache: false,
        processData: true,
        success: function (data) {
            var results = JSON.parse(data);
            if (results.success) {
                localStorage.setItem('changeE', true);
                localStorage.setItem('changeI', true);
                localStorage.setItem('changeG', true);
                setGold();
                toastr['success']("Item has been Purchased!", "Shop Buy")
            } else {
                if (results.error_code === 2)
                    toastr['error']("Shop Buy", "Not Enough Money!")
                else {
                    toastr['error']("Shop Buy", "Please log back in and try again!")
                    localStorage.clear();
                    changeLoc("account");
                }
            }
        }
    });
}

function displayItemText(id) {
    $("#Text0").text("");
    $("#Text1").text("");
    $("#Text2").text("");
    var data = JSON.parse(localStorage.getItem('shopData'));
    $.each(data.items.item, function (i, v) {
        if (v.ItemID == id) {
            $("#NameText").text(v.ItemName);
            $("#TypeText").text("Type: "+v.TypeName);
            $("#SlotText").text("Slot: " + v.SlotName);
            $("#ValText").text("Value: " + v.Value);
            $("#Button").attr("class", "");
            $("#Button").attr("class", id);
            getStats(id);
            return 0;
        }
    });
}

function getStats(itemID) {
    var postD = { ItemID: itemID };
    $.ajax({
        async: true,
        type: "POST",
        url: "api/item/getStat.php",
        data: postD,
        cache: true,
        processData: true,
        success: function (data) {
            var results = JSON.parse(data);
            if (results.success) {
                console.log(results);
                $.each(results.Starts.stat, function (i, v) {
                    $("#Text" + i).text(v.Name + ": " + v.Value);
                });
            } else {
                console.log("failed");
            }
        }
    })
}

function shopBuy() {
    $("#Button").click(function () {
        var id = this.className;
        buyItem(id.baseVal);
    });
}

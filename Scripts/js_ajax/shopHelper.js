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
            } else {
                //send to error handler
            }
        }
    });
}

function displayItemText(id) {
    var data = JSON.parse(localStorage.getItem('shopData'));
    $.each(data.items.item, function (i, v) {
        if (v.ItemID == id) {
            $("#NameText").text(v.ItemName);
            $("#TypeText").text("Type: "+v.TypeName);
            $("#SlotText").text("Slot: " + v.SlotName);
            $("#ValText").text("Value: " + v.Value);
            $("#Button").attr("class", id);
            return 0;
        }
    });
}

function shopBuy() {
    $("#Button").click(function () {
        var id = this.className;
        buyItem(id.baseVal);
    });
}
function getId(id) {
    displayItemText(id);
}

function displayItemText(id) {
    $("#Text0").text("");
    $("#Text1").text("");
    $("#Text2").text("");
    var data = JSON.parse(localStorage.getItem('playerItems'));
    $.each(data.items.item, function (i, v) {
        if (v.ItemID == id) {
            $("#NameText").text(v.ItemName);
            $("#TypeText").text("Type: " + v.TypeName);
            $("#SlotText").text("Slot: " + v.SlotName);
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
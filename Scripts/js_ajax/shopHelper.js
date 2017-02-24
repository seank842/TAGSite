function getId(elem) {
    var name = $(elem).html(),
        data = JSON.parse(localStorage.getItem("shopData")),
        id = null;
    $.each(data.items.item, function (i, v) {
        if (v.ItemName == name) {
            id = v.ItemID;
        }
    });
    buyItem(id);
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
            console.log(results);
            if (results.success) {
                localStorage.setItem('change',true);
            } else {
                //send to error handler
            }
        }
    });
}
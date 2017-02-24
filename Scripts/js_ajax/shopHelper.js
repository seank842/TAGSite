function getId(id) {
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
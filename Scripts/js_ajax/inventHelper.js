function pollPlayerItems() {
    if (!localStorage.getItem('playerItems')) {
        var postData = { Token: localStorage.getItem('userToken') };
        $.ajax({
            type: "POST",
            url: '/api/user/getItems.php',
            data: postData,
            cache: false,
            success: function (data) {
                var results = JSON.parse(data);
                if (results.success) {
                    console.log(results);
                    localStorage.setItem('playerItems', JSON.stringify(results));
                    calcDisplay(JSON.parse(localStorage.getItem('playerItems')));
                } else {
                    loadLogin();
                }
            }
        });
    } else {
        calcDisplay(JSON.parse(localStorage.getItem('playerItems')));
    }
}
function onSubmitCre() {
    var name = $('[name="CharName"]').val();
    var userToken = localStorage.getItem('userToken');
    var postD = { CharName: name, Token: userToken };
    console.log(postD);
    $.ajax({
        type: "POST",
        url: "api/chara/new.php",
        data: postD,
        cache: false,
        beforeSend: function () { $('[name = "cre_but"]').html('Connecting...'); },
        success: function (data) {
            showList();
        }
    });
}
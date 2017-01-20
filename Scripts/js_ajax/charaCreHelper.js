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
            $('[name = "cre_but"]').html('Create');
            var results = JSON.parse(data);
				 console.log(results); 
                if (results.success){
                    $("#xpVal").html(results.Stats.xp);
                    $("#strVal").html(results.Stats.str);
                    $("#agiVal").html(results.Stats.agi);
                    $("#stamVal").html(results.Stats.sta);
                    $("#magVal").html(results.Stats.mag);
                }
            //showList();
        }
    });
}
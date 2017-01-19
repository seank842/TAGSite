function listShow() {
    var postData = { Token: localStorage.getItem('userToken') };
    $.ajax({
        type: "POST",
        url: '/api/chara/list.php',
        data: postData,
        cache: false,
        success: function (data) {
            var results = JSON.parse(data);
            if (results.success) {
                $.each(results.char.char, function (index, value) {
                    if (value.Pet == 0)
                        image = "charTemp";
                    else
                        image = "petTemp"

                    $("#charaList").append("<div class='chara'  data-charid='" + value.CharacterID + "'><img class='charaImage' align='middle' src='/Resorces/img/" + image +
                        ".jpg'>Name:" + value.Name + "	Health:" + value.CurrentHealth + "/" + value.MaxHealth
                        + "<div class='stats'></div></div>");
                });
                checkClick();
            }
            else
                loadLogin();
        }
    });
}

function checkClick(){
	$('.chara').on("click",function(){
		var char=$(this);
		var statList = char.children(".stats");
		if(statList.height()==0){
		var charaID=char.data("charid");
		var postData={CharID:charaID};
	 	$.ajax({
       	 	type: "POST",
        	url: '/api/chara/getStat.php',
        	data: postData,
        	cache: false,
        	success: function (data) {
			 	var results = JSON.parse(data);
                if (results.success){
					statList.html("");
					$.each(results.starts.stat, function( index, value ){
							statList.append("<div>"+value.Name +":"+ value.Value+"</div>");
					});
					statList.css('display', 'block');
    				curHeight = 0;
   					autoHeight = statList.css('height', 'auto').height();
					statList.height(curHeight).animate({height: autoHeight,opacity: 100}, 200);
				}
			}
		});
		} else {statList.animate({height: 0,opacity: 0}, 200,function(){statList.css('display', 'none')});}
	});
}

/*
function checkClick(){
	$(".chara").on("click", function(){
		var char=$(this);
		var statList=char.children(".stats");
		if(statList.height()==0){
			statList.html("");
			$.each(getCharStats(char).starts.stat, function(index, value){
				statList.append("<div>"+value.Name+":"+value.Value+"</div>");
			});
			statList.css('display', 'block');
    		curHeight = 0;
   			autoHeight = statList.css('height', 'auto').height();
			statList.height(curHeight).animate({height: autoHeight,opacity: 100}, 200);
		}
		else
			statList.height({height:0, opacity:0}, 200, function(){statList.css("display", "none")});
	});
}*/
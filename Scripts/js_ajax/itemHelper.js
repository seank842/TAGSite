function itemListShow() {
    if (!localStorage.getItem('shopData')) {
        var postData = { Token: localStorage.getItem('userToken') };
        $.ajax({
            async: true,
            type: "POST",
            url: '/api/item/list.php',
            data: postData,
            cache: false,
            success: function (data) {
                var results = JSON.parse(data);
                if (results.success) {
                    console.log(results);
                    localStorage.setItem('shopData', JSON.stringify(results));
                    calcDisplay(JSON.parse(localStorage.getItem('shopData')));
                }
                else
                    loadLogin();
            }
        });
    } else {
        calcDisplay(JSON.parse(localStorage.getItem('shopData')));
    }
}

function pollPlayerItems() {
    if (!localStorage.getItem('playerItems')) {
        var postData = { Token: localStorage.getItem('userToken') };
        $.ajax({
            async: true,
            type: "POST",
            url: '/api/user/getItems.php',
            data: postData,
            cache: false,
            success: function (data) {
                var results = JSON.parse(data);
                if (results.success) {
                    console.log(results);
                    if ($("#charaEquip").length) {
                        var filtered = results.items.item.filter(function(index){
                            return index.TypeID !== 5;
                        });
                        localStorage.setItem('playerEquipment', JSON.stringify(filtered));
                        calcDisplay(JSON.parse(localStorage.getItem('playerEquipment')));
                    } else {
                        localStorage.setItem('playerItems', JSON.stringify(results));
                        calcDisplay(JSON.parse(localStorage.getItem('playerItems')));
                    }
                } else {
                    loadLogin();
                }
            }
        });
    } else {
        calcDisplay(JSON.parse(localStorage.getItem('playerItems')));
    }
}

function calcDisplay(data) {
    numItems = Object.keys(data.items.item).length;
    if (!numItems < 1) {
        loadItemGrid(numItems, data);
    } else {
        console.log("It's lonely here...")
    }
}

function itemCheckClick(){
	$('.item').on("click",function(){
		var char=$(this);
		
		var statList = char.children(".itemChara");
		if(statList.height()==0){
		var charaID=char.data("charid");
		var postData={ItemID:charaID};
        $.ajax({
            async: true,
       	 	type: "POST",
        	url: '/api/item/getStat.php',
        	data: postData,
        	cache: false,
        	success: function (data) {
			 	var results = JSON.parse(data);
				 console.log(data); 
                if (results.success){
					statList.html("");
					$.each(results.Starts.stat, function( index, value ){
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
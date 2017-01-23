function itemListShow() {
    if (!localStorage.getItem('shopData')) {
        var postData = { Token: localStorage.getItem('userToken') };
        $.ajax({
            type: "POST",
            url: '/api/item/list.php',
            data: postData,
            cache: false,
            success: function (data) {
                var results = JSON.parse(data);
                if (results.success) {
                    /*$.each(results.items.item, function (index, value) {
                        console.log(value);
                        $("#shop").append("<div class='item'  data-charid='" + value.ItemID + "'><img class='charaImage' align='middle' src='/Resources/image/items/" + value.ImageURL +
                            "'>Name:" + value.ItemName + "	Value:" + value.Value + " Type:" + value.TypeName + " Slot:" + value.SlotName
                            + "<div class='itemChara'></div></div>");
                        
                    });
    
                    itemCheckClick();*/
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
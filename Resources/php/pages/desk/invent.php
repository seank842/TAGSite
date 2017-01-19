<form style="display:inline;">
	<label><input type="checkbox" name="snap" id="snap" value="1" /> Snap to grid</label>
</form>
<div id="container" style="position:relative; height:601px; overflow:hidden;">
    <div id="box" class="box">Drag and throw me</div>
    <div id="box2" class="box" style="left:400px; background-color:red;">Drag and throw me too</div>
</div>
<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
<script src="https://selene.hud.ac.uk/js/gsap/plugins/ThrowPropsPlugin.min.js"></script>
<script src="https://selene.hud.ac.uk/js/gsap/utils/Draggable.min.js"></script>
<script src="https://selene.hud.ac.uk/js/gsap/TweenMax.min.js"></script>
<script type="text/javascript">
    $(function() {
        //create the grid (feel free to tweak any of these numbers)
        var $snap = $("#snap"),
            $container = $("#container"),
            gridWidth = 200,
            gridHeight = 100,
            gridRows = 6,
            gridColumns = 6,
            leftNotches = [], //we could easily just hard-code the values in leftNotches and topNotches but to make things more dynamic and accommodate the variable-based gridWidth/gridHeight/gridRows/gridColumns, I populate this data in the loop below.
            topNotches = [],
            i, top, left;
        for (i = 0; i < gridRows * gridColumns; i++) {
            top = ((i / gridColumns) | 0) * gridHeight;
            left = (i * gridWidth) % (gridColumns * gridWidth);
            if (i < gridColumns) { //populates once per column coordinate
                leftNotches.push(left);
            }
            if (i % gridColumns === 0) { //this ends up populating once for each row coordinate
                topNotches.push(top);
            }
            $("<div/>").css({position:"absolute", border:"1px solid #454545", width:gridWidth-1, height:gridHeight-1, top:top, left:left}).prependTo($container);
        }
        
        //set the container's size to match the grid
        TweenLite.set($container, {height: gridRows * gridHeight + 1, width: gridColumns * gridWidth + 1});
        //now make both boxes draggable.
        Draggable.create(".box", {
            bounds:$("#container"), 
            edgeTolerance:0.2, 
            type:"top,left", 
            onDragEnd: function() { 
                var snap = ($snap.prop("checked") == true);
                //note: "this" refers to the Draggable instance inside callbacks like this, making it easy to get the target, xMax, xMin, yMax, and yMin. 
                ThrowPropsPlugin.to(this.target, {
                    throwProps:{
                        resistance:1000, //increase or decrease this number to add more or less friction/resistance.
                        top:{
                            velocity:"auto", //since we're tracking "top", the tracked value will be calculated and used automatically.
                            min:this.yMin, //Draggable instances auto-populate xMax, yMax, xMin, and yMin if you define "bounds" which makes it easy to tap into.
                            max:this.yMax,
                            end:(snap ? topNotches : "auto")
                        },
                        left:{
                            velocity:"auto", //since we're tracking "left", the tracked value will be calculated and used automatically.
                            min:this.xMin,
                            max:this.xMax,
                            end:(snap ? leftNotches : "auto")
                        }
                    }, ease:Power3.easeOut}, 2, 0.2, 0.4); //set maximum duration to 2 seconds, minimum duration to 0.2 seconds, and an overshoot threshold of 0.4
                }
            });
        //when the user selects "snap to grid", we should immediately snap to the grid...
        $snap.on("change", function() {
            if ($snap.prop("checked")) {
                TweenLite.to(".box", 0.35, {
                    throwProps:{
                        top:{end:topNotches},
                        left:{end:leftNotches}
                    },
                    ease:Power3.easeOut
                });
            }
        });
    });
</script>

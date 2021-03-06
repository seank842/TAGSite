﻿function loadItemGrid(numItems, data) {
    var rowSize = 115,
        colSize = 115,
        spacerSize = 25,
        fixedSize = true,
        oneColumn = false,
        threshold = "50%",
        $list = $("#list"),
        //Live node list of items
        items = $list[0].getElementsByClassName("item"),
        zIndex = 1000,
        startWidth = "100%",
        startSize = colSize,
        singleWidth = colSize * 3,
        colCount = null,
        rowCount = null,
        spacerStep = null,
        shadow1 = "0 1px 3px  0 rgba(0, 0, 0, 0.5), 0 1px 2px 0 rgba(0, 0, 0, 0.6)",
        shadow2 = "0 6px 10px 0 rgba(0, 0, 0, 0.3), 0 2px 2px 0 rgba(0, 0, 0, 0.2)";

    $(window).resize(resize);

    init();

    function init() {

       

        // This value is defined when this function 
        // is fired by a radio button change event

        fixedSize = true;
        colSize = startSize;
        $("#list").height(200);
        var width = startWidth;

        $(".item").remove();

        TweenLite.to($list, 0.2, { width: width });
        TweenLite.delayedCall(0.25, populateBoard);

        function populateBoard() {

            label = 0;
            resize();

            for (var i = 0; i < numItems; i++) {
                createItem();
            }
        }
    }

    function resize() {

        colCount = oneColumn ? 1 : Math.floor($list.outerWidth() / (colSize + spacerSize));
        spacerStep = colCount == 1 ? spacerSize : (spacerSize * (colCount - 1) / colCount);
        rowCount = 0;

        layoutInvalidated();
    }

    function changePosition(from, to, rowToUpdate) {

        var $items = $(".item");
        var insert = from > to ? "insertBefore" : "insertAfter";

        // Change DOM positions
        $items.eq(from)[insert]($items.eq(to));

        layoutInvalidated(rowToUpdate);
    }

    function createItem() {
        var colspan = fixedSize || oneColumn ? 1 : Math.floor(Math.random() * 2) + 1;
        if ($("#charaEquip").length) {
            var element = $("<div></div>").addClass("item")
                .attr({
                    id: data.items.item[label].OwnershipID,
                    'data-toggle': "tooltip",
                    title: "",
                    onclick: "getId(this.id)"
                }).css("background",
                    "url(Resources/image/items/" + data.items.item[label].ImageURL + ") right no-repeat")
                .css("background-size", "contain").html(data.items.item[label].ItemName)
                .tooltip({
                    html: true,
                    title: data.items.item[label].SlotName +
                        ':<br> &nbsp;Type: ' +
                        data.items.item[label].TypeName +
                        '<br> &nbsp;<i class="glyphicon glyphicon-xbt"></i>: ' +
                        data.items.item[label++].Value
                });
        } else if ($("#shop").length) {
            var element = $("<div></div>").addClass("item").attr({id: data.items.item[label].ItemID, 'data-toggle': "tooltip",title: "",onclick: "getId(this.id)"}).css("background",
                "url(Resources/image/items/" + data.items.item[label].ImageURL + ") right no-repeat")
                .css("background-size", "contain").html(data.items.item[label].ItemName)
                .tooltip({
                    html: true,
                    title: data.items.item[label].SlotName +
                    ':<br> &nbsp;Type: ' +
                    data.items.item[label].TypeName +
                    '<br> &nbsp;<i class="glyphicon glyphicon-xbt"></i>: ' +
                    data.items.item[label++].Value
                });
        } else {
            var element = $("<div></div>").addClass("item").attr({ id: data.items.item[label].ItemID, 'data-toggle': "tooltip", title: "", ondblclick: "getId(this.id)" })
                .css("background",
                    "url(Resources/image/items/" + data.items.item[label].ImageURL + ") right no-repeat")
                .css("background-size", "contain").html(data.items.item[label].ItemName)
                .tooltip({
                    html: true,
                    title: data.items.item[label].SlotName +
                        ':<br> &nbsp;Type: ' +
                        data.items.item[label].TypeName +
                        '<br> &nbsp;<i class="glyphicon glyphicon-xbt"></i>: ' +
                        data.items.item[label++].Value
                });
        }
        lastX = 0;

        //background: green url(images/shadow.gif) right no-repeat

        var mDraggable = Draggable.create(element, {
            onDrag: onDrag,
            onPress: onPress,
            onRelease: onRelease,
            zIndexBoost: false,
        });

        var item = {
            col: null,
            colspan: colspan,
            element: element,
            height: 0,
            inBounds: true,
            index: null,
            isDragging: false,
            lastIndex: null,
            newItem: true,
            positioned: false,
            row: null,
            rowspan: 1,
            width: 0,
            x: 0,
            y: 0
        };


        if (!$("#inventory").length) {
            mDraggable[0].disable();
        }

        element[0].item = item;

        $list.append(element);
        layoutInvalidated();

        function onPress() {

            lastX = this.x;
            item.isDragging = true;
            item.lastIndex = item.index;

            TweenLite.to(element, 0.2, {
                autoAlpha: 0.75,
                boxShadow: shadow2,
                scale: 0.95,
                zIndex: "+=1000"
            });
        }

        function onDrag() {

            // Move to end of list if not in bounds
            if (!this.hitTest($list, 0)) {
                item.inBounds = false;
                changePosition(item.index, items.length - 1);
                return;
            }

            item.inBounds = true;

            for (var i = 0; i < items.length; i++) {

                // Row to update is used for a partial layout update
                // Shift left/right checks if the item is being dragged 
                // towards the the item it is testing
                var testItem = items[i].item;
                var onSameRow = (item.row === testItem.row);
                var rowToUpdate = onSameRow ? item.row : -1;
                var shiftLeft = onSameRow ? (this.x < lastX && item.index > i) : true;
                var shiftRight = onSameRow ? (this.x > lastX && item.index < i) : true;
                var validMove = (testItem.positioned && (shiftLeft || shiftRight));

                if (this.hitTest(items[i], threshold) && validMove) {
                    changePosition(item.index, i, rowToUpdate);
                    break;
                }
            }

            lastX = this.x;
        }

        function onRelease() {

            // Move item back to last position if released out of bounds
            this.hitTest($list, 0) ? layoutInvalidated() : changePosition(item.index, item.lastIndex);

            TweenLite.to(element, 0.2, {
                autoAlpha: 1,
                boxShadow: shadow1,
                scale: 1,
                x: item.x,
                y: item.y,
                zIndex: ++zIndex
            });

            item.isDragging = false;
        }
    }

    function layoutInvalidated(rowToUpdate) {

        var timeline = new TimelineMax();
        var partialLayout = (rowToUpdate > -1);

        var height = 0;
        var col = 0;
        var row = 0;
        var time = 0.35;

        $(".item").each(function (index, element) {

            var item = this.item;
            var oldRow = item.row;
            var oldCol = item.col;
            var newItem = item.newItem;

            // PARTIAL LAYOUT: This condition can only occur while a item is being 
            // dragged. The purpose of this is to only swap positions within a row, 
            // which will prevent a item from jumping to another row if a space
            // is available. Without this, a large item in column 0 may appear 
            // to be stuck if hit by a smaller item, and if there is space in the 
            // row above for the smaller item. When the user stops dragging the 
            // item, a full layout update will happen, allowing items to move to
            // available spaces in rows above them.

            if (partialLayout) {
                row = item.row;
                if (item.row !== rowToUpdate) return;
            }

            // Update trackers when colCount is exceeded 
            if (col + item.colspan > colCount) {
                col = 0; row++;
            }

            $.extend(item, {
                col: col,
                row: row,
                index: index,
                x: col * spacerStep + (col * colSize),
                y: row * spacerStep + (row * rowSize),
                width: item.colspan * colSize + ((item.colspan - 1) * spacerStep),
                height: item.rowspan * rowSize
            });

            col += item.colspan;

            // If the item being dragged is in bounds, set a new
            // last index in case it goes out of bounds
            if (item.isDragging && item.inBounds) {
                item.lastIndex = index;
            }

            if (newItem) {
                // Clear the new item flag
                item.newItem = false;

                var from = {
                    autoAlpha: 0,
                    boxShadow: shadow1,
                    height: item.height,
                    scale: 0,
                    width: item.width
                };

                var to = {
                    autoAlpha: 1,
                    scale: 1,
                    zIndex: zIndex
                }
                timeline.fromTo(element, time, from, to, "reflow");
            }

            // Don't animate the item that is being dragged and
            // only animate the items that have changes
            if (!item.isDragging && (oldRow !== item.row || oldCol !== item.col)) {

                var duration = newItem ? 0 : time;

                // Boost the z-index for items that will travel over 
                // another item due to a row change
                if (oldRow !== item.row) {
                    timeline.set(element, { zIndex: ++zIndex }, "reflow");
                }

                timeline.to(element, duration, {
                    x: item.x,
                    y: item.y,
                    onComplete: function () { item.positioned = true; },
                    onStart: function () { item.positioned = false; }
                }, "reflow");
            }
        });

        if (row !== rowCount) {
            rowCount = row;
            height = rowCount * spacerStep + (++row * rowSize);
            timeline.to($list, 0.2, { height: height }, "reflow");
        }
    }
}
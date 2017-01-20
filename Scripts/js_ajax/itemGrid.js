var rowSize = 100,
    colSize = 100,
    spacerSize = 7,
    numItems,
    fixedSize = true,
    threshold = "50%",
    $list = $("list"),
    //Live node list of items
    items = $list[0].getElementsByClassName("item"),
    label = 1,
    zIndex = 1000,
    width = "100%",
    startSize = colSize,
    singleWidth = colSize * 3,
    colCount = null,
    rowCount = null,
    spacerStep = null,
    shadow1 = "0 1px 3px  0 rgba(0, 0, 0, 0.5), 0 1px 2px 0 rgba(0, 0, 0, 0.6)",
    shadow2 = "0 6px 10px 0 rgba(0, 0, 0, 0.3), 0 2px 2px 0 rgba(0, 0, 0, 0.2)";

$(window).resize(resize);

$(".item").remove();

TweenLite.to($list, 0.2, { width: width });
TweenLite.delayedCall(0.25, populateBoard);

function populateBoard() {
    resize();

    for (var i = 0; i < numItems; i++) {
        createItemSlot();
    }
}

function resize() {
    colCount = Math.floor($list.outerWidth() / (colSize + spacerSize));
    spacerStep = colCount == 1 ? spacerSize : (spacerSize * (colCount - 1) / colCount);
    rowCount = 0;

    layoutInvalidated();
}

function changePostion(from, to, rowToUpdate) {
    var $items = $(".item"),
        insert = from > to ? "insertBefore" : "insertAfter";
    $items.eq(from)[insert]($items.eq(to));
    layoutInvalidated(rowToUpdate);
}

function createItemSlot() {
    var colspan = Math.floor(math.random() * 2) + 1,
        element = $("<div></div>").addClass("item").html(label++),
        lastX = 0;

    Draggable.create(element, {
        onDrag: onDrag,
        onPress: onPress,
        onRelease: onRelease,
        zIndexBoost: false
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
        if (!this.hitTest($list, 0)) {
            item.inBounds = false;
            changePosition(item.index, items.length - 1);
            return;
        }

        item.inBounds = true;

        for (var i = 0; i < items.length; i++){
            var testItem = items[i].item,
                onSameRow = (item.row === testItem.row),
                rowToUpdate = onSameRow ? tile.row : -1,
                shiftLeft = onSameRow ? (this.x < lastX && item.index > i) : true,
                shiftRight = onSameRow ? (this.x > lastX && item.index < i) : true,
                validMove = (testItem.positioned && (shiftLeft || shiftRight));

            if (this.hitTest(items[i], threshold) && validMove) {
                changePostion(item.index, i, rowToUpdate);
                break;
            }
        }

        lastX = this.x;
    }

    function onRelease() {
        this.hitTest($list, 0) ? layoutInvalidated : changePostion(item.index, item.lastIndex);

        TweenLite.to(element, 0.2{
            autoAlpha: 1,
            boxShadow: shadow1,
            scale: 1,
            x: this.x,
            y: this.y,
            zIndex: ++zIndex
        });

        item.isDragging = false;
    }
}

function layoutInvalidated(rowToUpdate) {
    var timeline = new TimelineMax(),
        partialLayout = (rowToUpdate > -1);

    var height = 0,
        col = 0,
        row = 0,
        time = 0.35;

    $(".item").each(function (index, element) {
        var item = this.item,
            oldRow = item.row,
            oldCol = item.col,
            newItem = item.newItem;

        if (partialLayout) {
            row = item.row;
            if (item.row !== rowToUpdate)
                return;
        }

        if (col + item.colspan > colCount) {
            col = 0;
            row++;
        }

        $.extend(item, {
            col: col,
            row: row,
            index: index,
            x: col + spacerStep + (col * colSize),
            y: row + spacerStep + (col * rowSize),
            width: item.colspan * colSize + ((item.colspan - 1) * spacerStep),
            height: item.rowspan * rowSize
        });
        col += item.colspan;

        if (item.isDragging && item.inBounds) {
            item.lastIndex = index;
        }

        if (newItem) {
            item.newItem = falsel

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

        if (!item.isDragging && (oldRow !== ite.row || oldCol !== item.col)) {
            var duration = newItem ? 0 : time;

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
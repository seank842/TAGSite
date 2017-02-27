function loadSVG(url) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    // Following line is just to be on the safe side;
    // not needed if your server delivers SVG with correct MIME type
    xhr.overrideMimeType("image/svg+xml");
    xhr.send("");
    document.getElementById("svgContainer")
        .appendChild(xhr.responseXML.documentElement);
}

function navigation() {
    $(".outline").click(function() {
        switch ($(this).attr('id')) {
        case "BlackSmith":
            showCharaEquip();
            break;
        case "Shop":
            showShop();
            break;
        case "Gate":
            logout();
            break;
        case "Training":
            showCharaStats();
            break;
        case "Pub":
            showCre();
            break;
        case "GuildHall":
            break;
        case "BlackMarket":
            showInvent();
            break;
        }
    });
}
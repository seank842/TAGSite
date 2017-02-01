var master = new TimelineMax(),
    bg = $("#featureBackground");

master.add(control())

function control() {
    var dots = new TimelineLite(),
        qty = 5760,
        duration = 60,
        colors = ["#F1C40F", "#F39C12", "#F4D03F", "#F5B041"];

    for (i = 0; i < qty; i++) {
        dot = $("<div class='dot'/>").appendTo(bg)[0];
        var color = colors[(Math.random() * colors.length) | 0];
        TweenLite.set(dot, { backgroundColor: color, x: 460, y: 300 });
        delay = Math.random() * duration;
        dots.to(dot, duration, { physics2D: { velocity: Math.random() * 400 + 150, angle: Math.random() * 40 + 250 } }, delay);
    }
    return dots;

}

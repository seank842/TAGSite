<!DOCTYPE html>
<html lang="en">
<head>
    <title>The Adventurer's Guild</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="Content/bootstrap.min.css" rel="stylesheet" />
    <link href="Content/main.css" rel="stylesheet" />
    <script src="Scripts/jquery-3.1.1.min.js"></script>
    <script src="Scripts/bootstrap.min.js"></script>
    <!--Load in gsap base-->
    <script src="https://selene.hud.ac.uk/js/gsap/TweenMax.min.js"></script>
    <!--Load in Content specific gsap plugins/utils-->
    <?php
        
    ?>
    <script src="https://selene.hud.ac.uk/js/gsap/plugins/ThrowPropsPlugin.min.js"></script>
    <script src="https://selene.hud.ac.uk/js/gsap/utils/Draggable.min.js"></script>
</head>
<body>
    <div class="container-fluid">
        <h1>My First Bootstrap Page</h1>
        <p>This is some text.</p>
        <row>
            <div class="col-sm-2" style="background-color:aqua">logo</div>
            <div class="col-sm-8" style="background-color:blueviolet"></div>
            <div class="col-sm-2" style="background-color:aqua"></div>
        </row>
        <row>
            <div id="see" class="col-sm-12" style="background-color:black"></div>
        </row>
        <?php
        phpinfo();
        ?>
    </div>
</body>
</html>
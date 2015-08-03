<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <title>Mirror Estándar</title>
        <link rel="shortcut icon" href="../img/icon.ico" type="image/x-icon" />
        <link rel="stylesheet" href="../css/style.css" />
        <script src="../libs/jquery-2.1.3.min.js"></script>        
        <script src="../libs/jquery-ui.min.js"></script>
        <script src="../libs/jquery.ui.touch-punch.min.js"></script>
        <script src="../libs/hammer.min.js"></script>
        <script src="../libs/jquery.mousewheel.min.js"></script>
        <script src="../libs/jquery-resizeEnd.min.js"></script>
        <script src="../libs/jquery.tothtip.js"></script>
        <script src="../libs/perfect-scrollbar.jquery.min.js"></script>
        <script src="../libs/bootstrap.min.js"></script>
        <script src="../libs/math.min.js"></script>
        <script src="../libs/pixi.min.js"></script>
        <script src="app/language.js"></script>
        <script src="app/mirror-std-v2.min.js"></script>
        <script type="text/javascript">
            /* global MIRROR */
            $(function () {
                var studyId = 3934;
                var make = new MIRROR.maker (studyId);
                make.init ();
            });
        </script>
    </head>
    <body>
        <div id="renderers" style="display: none;"></div>
        <div id="main"></div>
    </body>
</html>
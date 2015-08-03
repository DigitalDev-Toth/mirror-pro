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
        <script src="src/language.js"></script>
        <script src="src/ui.js"></script>
        <script src="src/filter.js"></script>
        <script src="src/mirror.js"></script>
        <script src="src/maker.js"></script>
        <script src="src/layer.js"></script>
        <script src="src/loader.js"></script>
        <script src="src/serie.js"></script>
        <script src="src/measuring.js"></script>
        <script src="src/hounsfield.js"></script>
        <script type="text/javascript">
            /* global MIRROR */
            $(function () {
//                XA (X-Ray Angiography)
//                var studyId = 3934;
//                PR/MR (Presentation State / Magnetic Resonance)
//                var studyId = 4327; //4323, 4327
//                CT (Computed Tomography), bitsStored = 12, (with HU)
//                var studyId = 4338;                
//                US (Ultrasound) , bitsStored = 8
//                var studyId = 49088;
//                CR (Computed Radiography), bitsStored = 8, (with HU)
//                var studyId = 49086;
//                MR (Magnetic Resonance), bitsStored = 12
//                var studyId = 4907;   // extractIntensity: no pixel data found
//                var studyId = 4899;   // getStudy: 500
//                Different dimensions
//                var studyId = 5199; // 5199, 5198
                var studyId = <?php echo $_GET['study'] ? $_GET['study'] : 4338; ?>;
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

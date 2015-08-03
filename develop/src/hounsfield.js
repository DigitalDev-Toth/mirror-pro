/**
 * @file        Functions of the hounsfield class
 * @author      Toth Limitada <contacto@toth.cl>
 * @copyright   2015 Toth Limitada
 * @license     {@link http://www.toth.cl}
 */

/**
 * @namespace MIRROR
 */

/* global MIRROR, PIXI */

/********************************************/
/************* CLASES AND SHAPES ************/
/********************************************/
/*
 * Class that contains a Point over the layer (contains the coordinates and draw the "dot").
 *
 * @memberof hounsfield.
 * @param evtParsed {object} : a mouse/touch event parsed (see MIRROR.hounsfield.prototype.parseMouseData).
 * @param parentShape {ShapePoint/ShapeEllipse/ShapePolygon instance}.
 * @param hounsfield {MIRROR.hounsfield instance}.
 */
MIRROR.hounsfield.Point = function Point(evtParsed, parentShape, hounsfield){
    this.parentShape = parentShape;
    this.circle = new PIXI.Graphics();
    this.circle.beginFill(0xD58512);
    this.circle.drawCircle(0, 0, 3);
    this.circle.endFill();
    // Coords of the drawning
    this.circle.x = evtParsed.stage.x;
    this.circle.y = evtParsed.stage.y;
    // Coords in the child
    this.child = {
        x: evtParsed.child.x,
        y: evtParsed.child.y
    };

    hounsfield.layer.stage.addChild(this.circle);

    /*
     * Check mouse/touch event close enough to a Point.
     *
     * @memberof hounsfield.Point
     * @param evtParsed {object} : a mouse/touch event parsed (see MIRROR.hounsfield.prototype.parseMouseData).
     */
    this.isNear = function(evtParsed){
        // ToDo: set a mayor distance on mobile devices
        // the position must me +/- 15px near the current point
        return evtParsed.stage.x>=(this.circle.x-15)
            && evtParsed.stage.x<=(this.circle.x+15)
            && evtParsed.stage.y>=(this.circle.y-15)
            && evtParsed.stage.y<=(this.circle.y+15);
    };
    /*
     * Check Point event close enough to another Point.
     *
     * @memberof hounsfield.Point
     * @param evtParsed {object} : a mouse/touch event parsed (see MIRROR.hounsfield.prototype.parseMouseData).
     */
    this.isNearOfPoint = function(point){
        return point.circle.x>=(this.circle.x-15)
            && point.circle.x<=(this.circle.x+15)
            && point.circle.y>=(this.circle.y-15)
            && point.circle.y<=(this.circle.y+15);
    };
    /*
     * Move a point to a new position.
     *
     * @memberof hounsfield.Point
     * @param evtParsed {object} : a mouse/touch event parsed (see MIRROR.hounsfield.prototype.parseMouseData).
     */
    this.moveTo = function(evtParsed){
        // move image
        this.circle.x = evtParsed.stage.x;
        this.circle.y = evtParsed.stage.y;
        // move child coords
        this.child.x = evtParsed.child.x;
        this.child.y = evtParsed.child.y;

        // tell to the parent, to update his view
        this.parentShape.pointUpdated();
    };
    /*
     * Remove the Point from the layer and his parent shape.
     *
     * @memberof hounsfield.Point
     */
    this.destroy = function(){
        hounsfield.layer.stage.removeChild(this.circle);
        var index = this.parentShape.points.indexOf( this );
        this.parentShape.points.splice(index, 1);
    };
};

/**************** Point ****************/
/*
 * Shape that represents a single point in the dicom image.
 *
 * @memberof hounsfield.
 * @param evtParsed {object} : a mouse/touch event parsed (see MIRROR.hounsfield.prototype.parseMouseData).
 * @param hounsfield {MIRROR.hounsfield instance}.
 */
MIRROR.hounsfield.ShapePoint = function ShapePoint(evtParsed, hounsfield) {
    this.shapeType = 'ShapePoint';
    this.$label = null;
    this.done = true;
    // add the first (and only point)
    this.points = [new MIRROR.hounsfield.Point(evtParsed, this, hounsfield)];
    // the canvas of the shape
    this.graphics = new PIXI.Graphics();
    hounsfield.layer.stage.addChild(this.graphics);

    /*
     * Remove the PointShape and his points from the layer.
     *
     * @memberof ShapePoint.
     */
    this.destroy = function () {
        this.removeLabel();
        // destroy each point from the canvas
        for(var pindex=this.points.length-1; pindex>=0; pindex--){
            this.points[pindex].destroy();
        }
        // remove graphics from the stage
        hounsfield.layer.stage.removeChild(this.graphics);

        // remove from the shapes list
        var shapeIndex = hounsfield.shapes.indexOf(this);
        hounsfield.shapes.splice(shapeIndex, 1);
    };
    /*
     * Mark the ShapePoint as a closed, and refresh his graphical representation.
     *
     * @memberof ShapePoint.
     */
    this.__closeShape = function (){
        this.done = true;
        this.pointUpdated();
    };
    /*
     * Try to close the ShapePoint, if cannot be closed, then remove it from the layout.
     *
     * @memberof ShapePoint.
     */
    this.closeOrDelete = function () {};
    /*
     * Executed after one of his Points has changed.
     *
     * @memberof ShapePoint.
     */
    this.pointUpdated = function () {
        this.removeLabel();
    };
    /*
     * After the shape has ended his movement, make some validation.
     *
     * @memberof ShapePolygon.
     */
    this.releaseOnPosition = function () {};
    /*
     * Obtain and show the hounsfield value of the Point.
     *
     * @memberof ShapePoint.
     */
    this.fetchHounsfield = function () {
        this.removeLabel();
        var serieCharged = hounsfield.layer.make.load.series[hounsfield.layer.serieIdCharged];
        var layerWidth   = serieCharged.dimensions[hounsfield.layer.positionInSerie].columns;
        var layerHeight  = serieCharged.dimensions[hounsfield.layer.positionInSerie].rows;
        var px = this.points[0].child.x;
        var py = this.points[0].child.y;

        if(px<0 || px>=layerWidth || py<0 || py>=layerHeight){
            return;
        }
        var index = layerWidth*py + px;
        var rowsArray = [[index, index]];

        var changeLabel = this.labelBuilder(this.points[0].circle.x+10, this.points[0].circle.y+10);
        hounsfield.getHounsfieldValues(rowsArray).done(function(data){
            if(data.hounsfield){
                changeLabel(MIRROR.language.hounsfield['hu'] +': '+data.hounsfield.avg);
            }else{
                changeLabel(MIRROR.language.hounsfield['intensity'] +': '+data.intensity.avg);
            }
        }).fail(function(error, xhr){
            changeLabel('');
            console.log("Error: "+error);
            xhr.retry();
        });
    };
    /*
     * Create a label to show information. Returns a function that set the final text of the label.
     *
     * @memberof ShapePoint.
     * @param px {integer}: X coordinates of the label in the layer.
     * @param py {integer}: Y coordinates of the label in the layer.
     */
    this.labelBuilder = function (px, py){
        this.removeLabel();
        this.$label = $('<h5><span style="z-index: 200; color: #fff; background-color: rgba(0, 0, 0, 0.5); border-radius: 3px; border: 1px solid #505050; position: absolute; top: '+py+'px; left: '+px+'px;"></span></h5>');
        var $span = $('span', this.$label);
        $('#'+ hounsfield.layer.layerId).append(this.$label);

        // loading dots
        var msg = '..';
        $span.html( msg );
        function loop(){
            setTimeout(function(){
                if(!fixedText){
                    $span.html( msg+='.' );
                    loop();
                }
            },500);
        }
        loop();

        var fixedText = false;
        // expose the function to change the text
        return function setText(text){
            fixedText = true;
            $span.html(text);
        }
    };
    /*
     * Remove the label of the shape from the layer.
     *
     * @memberof ShapePoint.
     */
    this.removeLabel = function (){
        if( this.$label ){
            this.$label.detach();
            this.$label = null;
        }
    };

    // USE TO TEST
    //this.__drawPoint = function(px, py, color){
    //    var color = color || 0xff4c4c;
    //    var dot = new PIXI.Graphics();
    //    dot.beginFill(color);
    //    dot.drawRect(0,0,1,1);
    //    dot.endFill();
    //    dot.x = px;
    //    dot.y = py;
    //    hounsfield.layer.textureSprite.addChild(dot);
    //    this.PTOS.push(dot);
    //};
};

/*************** Ellipse ***************/
/*
 * Shape that represents a Ellipse wich contains a area in the dicom image.
 *
 * @memberof hounsfield.
 * @param evtParsed {object} : a mouse/touch event parsed (see MIRROR.hounsfield.prototype.parseMouseData).
 * @param hounsfield {MIRROR.hounsfield instance}.
 */
MIRROR.hounsfield.ShapeEllipse = function ShapeEllipse(evtParsed, hounsfield){  // class ShapeEllipse
    MIRROR.hounsfield.ShapePoint.call(this, evtParsed, hounsfield);             // this.super()
    this.shapeType = 'ShapeEllipse';
    // add the anchor point
    this.points.push( new MIRROR.hounsfield.Point(evtParsed, this, hounsfield) );

    //this.destroy = function(){};
    //this.closeOrDelete = function(){};
    /*
     * Executed after one of his Points has changed. Updates the graphicasl representation of the Shape.
     *
     * @memberof ShapeEllipse.
     */
    this.pointUpdated = function(){
        this.removeLabel();

        var center = this.points[0];
        var anchor = this.points[1];
        var width  = center.circle.x-anchor.circle.x;
        var height = center.circle.y-anchor.circle.y;

        this.graphics.clear();
        this.graphics.lineStyle(2, 0xD58512, 1);
        this.graphics.beginFill(0xD58512, 0.3);
        this.graphics.drawEllipse(0, 0, width, height);
        this.graphics.endFill();
        this.graphics.x = center.circle.x;
        this.graphics.y = center.circle.y;
    };
    /*
     * After the shape has ended his movement, check if the center is far enough from the anchor.
     *
     * @memberof ShapeEllipse.
     */
    this.releaseOnPosition = function(){
        var center = this.points[0];
        var anchor = this.points[1];
        // is the center is too close to the anchor, move the anchor a few pixels
        if(center.isNearOfPoint(anchor)){
            var scale = hounsfield.layer.scale;
            anchor.moveTo({
                stage: {
                    x: anchor.circle.x+15,
                    y: anchor.circle.y+15
                },
                child: {
                    x: anchor.child.x+15/scale,
                    y: anchor.child.y+15/scale
                }
            });
            this.pointUpdated();
        }
    };
    /*
     * Move the ShapeEllipse to a new position.
     *
     * @memberof ShapeEllipse.
     * @param evtParsed {object} : a mouse/touch event parsed (see MIRROR.hounsfield.prototype.parseMouseData).
     */
    this.moveShapeTo = function(evtParsed){
        var center = this.points[0];
        var anchor = this.points[1];

        // move the anchor
        anchor.moveTo({
            stage:{
                x: anchor.circle.x + (evtParsed.stage.x - center.circle.x),
                y: anchor.circle.y + (evtParsed.stage.y - center.circle.y)
            },
            child: {
                x: anchor.child.x + (evtParsed.child.x - center.child.x),
                y: anchor.child.y + (evtParsed.child.y - center.child.y)
            }
        });
        // move the center
        center.moveTo(evtParsed);
    };
    /*
     * Obtain and show the hounsfield value of the ShapeEllipse.
     *
     * @memberof ShapeEllipse.
     */
    this.fetchHounsfield = function(){
        // the size of the DICOM image
        var serieCharged = hounsfield.layer.make.load.series[hounsfield.layer.serieIdCharged];
        var layerWidth   = serieCharged.dimensions[hounsfield.layer.positionInSerie].columns;
        var layerHeight  = serieCharged.dimensions[hounsfield.layer.positionInSerie].rows;

        // angle of image rotation, center and anchor of the ellypse
        var angle  = hounsfield.layer.rotation;
        var center = this.points[0].child;
        var anchor = this.points[1].child;

        //  1° normalize the pivot, to the axe (rotate the pivot) // get the child ellypse paralel to the child axes
        var rotatedAnchor = this.__rotatePoint(anchor.x, anchor.y, center.x, center.y, angle);
        // then, calculate the width, and the height of the child ellipse
        var ellipseWidth  = Math.abs(rotatedAnchor.x-center.x);
        var ellipseHeight = Math.abs(rotatedAnchor.y-center.y);

        // 2° Find the boundaries of the zone to check points
        var rightVertex  = {x: center.x+ellipseWidth, y: center.y};
        var bottomVertex = {x: center.x, y: center.y+ellipseHeight};
        // normalize the point (turn it back to the original axis);
        var rightVertexNormalized  = this.__rotatePoint(rightVertex.x, rightVertex.y, center.x, center.y, -angle);
        var bottomVertexNormalized = this.__rotatePoint(bottomVertex.x, bottomVertex.y, center.x, center.y, -angle);
        // once the vertex is on the original axis, we can calculate the "box" with the limits of the shape
        var maxBoundsWidth  = Math.max( Math.abs(center.x-rightVertexNormalized.x), Math.abs(center.x-bottomVertexNormalized.x));
        var maxBoundsHeight = Math.max( Math.abs(center.y-rightVertexNormalized.y), Math.abs(center.y-bottomVertexNormalized.y));

        // 3° evaluate each point inside the boundaries and generate the intervals of points inside the shape
        var rowsArray = [];
        var contains = this.__ellipseChecker(center, ellipseWidth, ellipseHeight, layerWidth, layerHeight, angle);
        for(var py=Math.floor(center.y-maxBoundsHeight); py<=center.y+maxBoundsHeight; py++){
            var rangeStart = -1, rangeEnd = -1;
            for(var px=Math.floor(center.x-maxBoundsWidth); px<=center.x+maxBoundsWidth; px++){
                if( contains(px, py) ){
                    var index = layerWidth*py + px;
                    rangeStart = rangeStart===-1? index : rangeStart;
                    rangeEnd  = index;
                    //this.__drawPoint(px, py, 0xa2cd5a);
                }
            }
            // push to the array if the rows contains points
            if( rangeStart!==-1 && rangeEnd!==-1){
                // somethimes, the Math.round() produces 2 rows with the same values, avoid it..
                // if is the first item, or it's diferent from the last one, add it
                var lastRow = rowsArray[rowsArray.length-1];
                if(!lastRow || (lastRow[0]!==rangeStart && lastRow[1]!==rangeEnd) ){
                    rowsArray.push( [rangeStart, rangeEnd] );
                }
            }
        }
        // if the shape doesn't have points (is outside of the shape), do nothing
        if(rowsArray.length===0){
            return;
        }
//        console.log(rowsArray);

        // boundrais
        //this.__drawPoint(center.x-maxBoundsWidth, center.y+maxBoundsHeight, 0xf27cba); //pink
        //this.__drawPoint(center.x-maxBoundsWidth, center.y-maxBoundsHeight, 0xf27cba); //pink
        //this.__drawPoint(center.x+maxBoundsWidth, center.y+maxBoundsHeight, 0xf27cba); //pink
        //this.__drawPoint(center.x+maxBoundsWidth, center.y-maxBoundsHeight, 0xf27cba); //pink
        //this.__drawPoint(rotatedAnchor.x, rotatedAnchor.y, 0x00bf20); // green anchor
        // Vertices
        //this.__drawPointP(rightVertexNormalized, 0x4da2ee);   //celeste
        //this.__drawPointP(bottomVertexNormalized, 0x51ee4d);  //verde
        var labelX = this.points[0].circle.x + Math.abs(this.points[0].circle.x - this.points[1].circle.x) + 5;
        var labelY = this.points[0].circle.y + 10;
        var changeLabel = this.labelBuilder(labelX, labelY);
        hounsfield.getHounsfieldValues(rowsArray).done(function(data){
            if(data.hounsfield){
                changeLabel(
                    MIRROR.language.hounsfield['HUavg'] +': '+data.hounsfield.avg+'<br>'+
                    MIRROR.language.hounsfield['HUmin'] +': '+data.hounsfield.min+'<br>'+
                    MIRROR.language.hounsfield['HUmax'] +': '+data.hounsfield.max
                );
            }else{
                changeLabel(
                    MIRROR.language.hounsfield['Iavg'] +': '+data.intensity.avg+'<br>'+
                    MIRROR.language.hounsfield['Imin'] +': '+data.intensity.min+'<br>'+
                    MIRROR.language.hounsfield['Imax'] +': '+data.intensity.max
                );
            }
        }).fail(function(error){
            changeLabel('');
            console.log("Error: "+error);
            xhr.retry();
        });
    };
    /*
     * Returns a function, used to check if a particular coordenates (px, py) exists inside a ellipse.
     *
     * @memberof ShapeEllipse.
     * @param origin {x:integer, y:integer}: center of the ellipse.
     * @param ellipseWidth {integer}: width of the ellipse.
     * @param ellipseheight {integer}: height of the ellipse.
     * @param layerWidth {integer}: width of the layer wich contains the ellipse.
     * @param layerheight {integer}: height of the layer wich contains the ellipse.
     * @param angle {float}: rotation in radians (centered in the origin).
     */
    this.__ellipseChecker = function(origin, ellipseWidth, ellipseHeight, layerWidth, layerHeight, angle){
        var w2 = ellipseWidth*ellipseWidth;
        var h2 = ellipseHeight*ellipseHeight;
        var cosAng = Math.cos(-angle);
        var senAng = Math.sin(-angle);

        return function(px, py){
            if(px>=0 && px<layerWidth && py>=0 && py<layerHeight) {
                // normalize the coords, to an ellipse with center 0,0, and apply the rotated angle
                var normx = cosAng * (px - origin.x) + senAng * (py - origin.y);
                var normy = senAng * (px - origin.x) - cosAng * (py - origin.y);
                // if the radius is less or equal to 1, then the point is inside the ellipse
                return (normx * normx) / w2 + (normy * normy) / h2 <= 1;
            }else{
                return false;
            }
        }
    };
    /*
     * Obtains the new coordinates of a point when it's rotated on a pivot.
     *
     * @memberof ShapeEllipse.
     * @param px {integer}: X coordinates of the point of interest.
     * @param py {integer}: Y coordinates of the point of interest.
     * @param ox {integer}: X coordinates of the pivot.
     * @param oy {integer}: X coordinates of the pivot.
     * @param angle {float}: rotation in radians (centered in the pivot).
     */
    this.__rotatePoint = function __rotatePoint(px, py, ox, oy, angle){
        return {
            x: Math.cos(angle)*(px-ox) - Math.sin(angle)*(py-oy) + ox,
            y: Math.sin(angle)*(px-ox) + Math.cos(angle)*(py-oy) + oy
        };
    };
};
MIRROR.hounsfield.ShapeEllipse.prototype = Object.create( MIRROR.hounsfield.ShapePoint.prototype );   // ShapeEllipse extends ShapePoint

/*************** Polygon ***************/
/*
 * Shape that represents a Polygon, wich contains a area in the dicom image.
 *
 * @memberof hounsfield.
 * @param evtParsed {object} : a mouse/touch event parsed (see MIRROR.hounsfield.prototype.parseMouseData).
 * @param hounsfield {MIRROR.hounsfield instance}.
 */
MIRROR.hounsfield.ShapePolygon = function ShapePolygon(evtParsed, hounsfield){   // class ShapePolygon...
    MIRROR.hounsfield.ShapePoint.call(this, evtParsed, hounsfield);              // this.super()
    this.shapeType = 'ShapePolygon';
    this.done = false;

    /*
     * Add a Point to the ShapePolygon
     *
     * @memberof ShapePolygon.
     * @param evtParsed {object} : a mouse/touch event parsed (see MIRROR.hounsfield.prototype.parseMouseData).
     */
    this.addPoint = function(evtParsed){
        var newPoint = new MIRROR.hounsfield.Point(evtParsed, this, hounsfield);
        this.points.push(newPoint);
        this.pointUpdated();
        return newPoint;
    };
    //this.destroy = function(){};
    /*
     * Try to close the ShapePolygon, if cannot be closed, then remove it from the layout.
     *
     * @memberof ShapePolygon.
     */
    this.closeOrDelete = function(){
        if( !this.__isValidPolygon() ){
            this.destroy();
        } else if( !this.done ){
            this.__closeShape();
            this.fetchHounsfield();
        }
    };
    /*
     * Executed after one of his Points has changed. Updates the graphical representation of the shape.
     *
     * @memberof ShapePolygon.
     */
    this.pointUpdated = function(){
        this.removeLabel();

        // remove the previous canvas
        hounsfield.layer.stage.removeChild(this.graphics);
        this.graphics = new PIXI.Graphics();
        this.graphics.clear();

        // generate and re-draw the polygon
        this.graphics.beginFill(0xD58512, 0.3);
        var polygonPath = [];
        for(var pindex = 0; pindex<this.points.length; pindex++){
            polygonPath.push( this.points[pindex].circle.x );
            polygonPath.push( this.points[pindex].circle.y );
        }
        this.graphics.drawPolygon( polygonPath );
        this.graphics.endFill();

        // draw the lines
        this.graphics.lineStyle(2, 0xD58512, 1);
        this.graphics.moveTo(this.points[0].circle.x, this.points[0].circle.y);
        for(var pindex = 1; pindex<this.points.length; pindex++){
            this.graphics.lineTo( this.points[pindex].circle.x, this.points[pindex].circle.y );
        }
        // draw to the origin, only if the shape is closed (done)
        if(this.done){
            this.graphics.lineTo( this.points[0].circle.x, this.points[0].circle.y );
        }

        hounsfield.layer.stage.addChild(this.graphics);
    };
    /*
     * Mark the ShapePolygon as a closed, and update his graphical representation.
     *
     * @memberof ShapePolygon.
     */
    this.__closeShape = function(){
        if(this.__isValidPolygon()){
            this.done = true;
            this.pointUpdated();
        }
    };
    /*
     * Check if the current Polygon is valid or not.
     *
     * @memberof ShapePolygon.
     */
    this.__isValidPolygon = function(){
        // valid if the polygon has more than 2 points
        return this.points.length>=3;
    };
    /*
     * After the shape has ended his movement, close the ShapePolygon if the first and last Points are too close.
     *
     * @memberof ShapePolygon.
     * @param point {Point}: (optional) last point created in the Polygon.
     */
    this.releaseOnPosition = function(point){
        var pindex = this.points.indexOf(point);
        // if the point doesn't belongs to the shape, or is the center... do nothing
        if( pindex===-1 || pindex===0 ){
            return;
        }
        // if the last point is near of the origin, then the shape is done
        var lastPoint = this.points[ this.points.length-1 ];
        if( this.points[0].isNearOfPoint(lastPoint) ){
            lastPoint.destroy();
            // if the second point is in the origin, delete it
            if( this.__isValidPolygon() ){
                this.__closeShape();
            }
            this.pointUpdated();
        }
    };
    /*
     * Obtain and show the hounsfield value of the Shapepolygon.
     *
     * @memberof ShapePolygon.
     */
    this.fetchHounsfield = function(){
        // remove the label if exist
        this.removeLabel();

        var serieCharged = hounsfield.layer.make.load.series[hounsfield.layer.serieIdCharged];
        var layerWidth   = serieCharged.dimensions[hounsfield.layer.positionInSerie].columns;
        var layerHeight  = serieCharged.dimensions[hounsfield.layer.positionInSerie].rows;
        var xmin = 9999999999, xmax = 0;
        var ymin = 9999999999, ymax = 0;

        // #1: generate the polygon and get his boundry
        var polygonPoints = [];
        this.points.forEach(function(point){
            var childX = point.child.x;
            var childY = point.child.y;
            // find the min and max to set a boundry of the shape
            xmin = childX<xmin? childX: xmin;
            ymin = childY<ymin? childY: ymin;
            xmax = childX>xmax? childX: xmax;
            ymax = childY>ymax? childY: ymax;
            // generate the "flat point array" from the coordinates
            polygonPoints.push( point.child.x, point.child.y );
        });
        var polygon = new PIXI.Polygon(polygonPoints);

        // #2 check the points inside the polygon and generate the intervals of points inside the polygon
        var rowsArray = [];
        for(var y=ymin; y<=ymax; y++){
            var rangeStart = -1, rangeEnd = -1;
            for(var x=xmin; x<=xmax; x++){
                // check if the point is inside the shapeChild and inside the polygon
                if( x>=0 && y>=0 && x<layerWidth && y<layerHeight && polygon.contains(x, y) ){
                    var index = layerWidth*y + x;
                    rangeStart = rangeStart===-1? index : rangeStart;
                    rangeEnd  = index;
                    //this.__drawPoint(x, y);
                }
            }
            // push to the array if the rows contains points
            if( rangeStart!==-1 && rangeEnd!==-1){
                // somethimes, the Math.round() produces 2 rows with the same values, avoid it..
                // if is the first item, or it's diferent from the last one, add it
                var lastRow = rowsArray[rowsArray.length-1];
                if(!lastRow || (lastRow[0]!==rangeStart && lastRow[1]!==rangeEnd) ){
                    rowsArray.push( [rangeStart, rangeEnd] );
                }
            }
        }
        // if the shape doesn't have points (is outside of the shape), do nothing
        if(rowsArray.length === 0){
            return;
        }

        // 3° Finally fetch the values from the server
        var changeLabel = this.labelBuilder(this.points[0].circle.x+10, this.points[0].circle.y+10);
        hounsfield.getHounsfieldValues(rowsArray).done(function(data){
            if(data.hounsfield){
                changeLabel(
                    MIRROR.language.hounsfield['HUavg'] +': '+data.hounsfield.avg+'<br>'+
                    MIRROR.language.hounsfield['HUmin'] +': '+data.hounsfield.min+'<br>'+
                    MIRROR.language.hounsfield['HUmax'] +': '+data.hounsfield.max+'<br>'
                );
            }else{
                changeLabel(
                    MIRROR.language.hounsfield['Iavg'] +': '+data.intensity.avg+'<br>'+
                    MIRROR.language.hounsfield['Imin'] +': '+data.intensity.min+'<br>'+
                    MIRROR.language.hounsfield['Imax'] +': '+data.intensity.max
                );
            }
        }).fail(function(error){
            changeLabel('');
            console.log("Error: "+error);
            xhr.retry();
        });
    };
};
MIRROR.hounsfield.ShapePolygon.prototype = Object.create( MIRROR.hounsfield.ShapePoint.prototype );   // ShapePolygon extends ShapePoint

/******* private Utility functions *****/
/*
 * Sets the initial state of the hounsfield tool.
 *
 * @memberof hounsfield.
 */
MIRROR.hounsfield.prototype.initialize = function(){
    this.selectedTool = this.TOOL.NONE;
    this.shapes = [];
    this.currentShape = null;
    this.selectedPoint = null;
};
/*
 * Remove all the shapes (PointShape, EllipseShape and PolygonShape) from the layer, and set a unselect the tools.
 *
 * @memberof hounsfield.
 */
MIRROR.hounsfield.prototype.clear = function(){
    this.unselectTool();
    // remove all childs
    for(var sindex = this.shapes.length-1; sindex>=0; sindex--){
        this.shapes[sindex].destroy();
    }
    //this.shapes = [];
    this.currentShape = null;
    this.selectedPoint = null;
};
/*
 * Fetch from a service, the hounsfield values.
 *
 * @memberof hounsfield.
 * @param rowsArray { array([start:integer, end:integer]) }: array with intervals of indexs whitin the shape.
 * A index is the transformation from x,y coordenates, to a unidimentional array.
 */
MIRROR.hounsfield.prototype.getHounsfieldValues = function getHounsfieldValues(rowsArray){
    var serieCharged = this.layer.make.load.series[this.layer.serieIdCharged];
    var path  = serieCharged.dicomsPath[this.layer.positionInSerie];
    var frame = serieCharged.imagesFrame[this.layer.positionInSerie];

    var def = $.Deferred();
    $.ajax({
        url: '../services/extractIntensity.py',
        type: 'post',
        datatype: 'json',
        data: {
            'path': path,
            'frame': frame,
            'rowsArray': JSON.stringify(rowsArray)
        }
    }).done(function(data){
        /*
        // the modalities ECG, XA, MR and US doesn't have hounsfield
        var validModality = data.modality!=="ECG" && data.modality!=="XA" && data.modality!=="MR" && data.modality!=="US";
        if(validModality){
            // if the bitsStored is less or equal 8 bits, then already have the HU value.
            if(serieCharged.rescaleSlope) {
                data.hounsfield = {
                    avg: data.averageIntensity * serieCharged.rescaleSlope + serieCharged.rescaleIntercept,
                    min: data.minIntensity * serieCharged.rescaleSlope + serieCharged.rescaleIntercept,
                    max: data.maxIntensity * serieCharged.rescaleSlope + serieCharged.rescaleIntercept
                };
            }else{
                // if it doen't have the rescaleSlope, then show the Intensity
            }
        }*/
        def.resolve(data);
    }).fail(function(error){
        console.error('Unable to get the dicom information of: ', rowsArray);
        def.reject(error);
    });
    return def.promise();
};

/********************************************/
/** methods related to the Tools Selection **/
/********************************************/
/*
 * Mark the Point, as the hounsfield tool selected.
 *
 * @memberof hounsfield.
 */
MIRROR.hounsfield.prototype.selectPointTool = function(){
    this.__selectTool(this.TOOL.POINT);
};
/*
 * Verify if the Point is the current hounsfield tool selected.
 *
 * @memberof hounsfield.
 */
MIRROR.hounsfield.prototype.isPointToolSelected = function (){
    return this.selectedTool === this.TOOL.POINT;
};
/*
 * Mark the Ellipse, as the hounsfield tool selected.
 *
 * @memberof hounsfield.
 */
MIRROR.hounsfield.prototype.selectElipseTool = function(){
    this.__selectTool(this.TOOL.ELIPSE);
};
/*
 * Verify if the Ellipse is the current hounsfield tool selected.
 *
 * @memberof hounsfield.
 */
MIRROR.hounsfield.prototype.isElipseToolSelected = function(){
    return this.selectedTool === this.TOOL.ELIPSE;
};
/*
 * Mark the Polygon, as the hounsfield tool selected.
 *
 * @memberof hounsfield.
 */
MIRROR.hounsfield.prototype.selectPolygonTool = function(){
    this.__selectTool(this.TOOL.POLYGON);
};
/*
 * Verify if the Polygon is the current hounsfield tool selected.
 *
 * @memberof hounsfield.
 */
MIRROR.hounsfield.prototype.isPolygonToolSelected = function(){
    return this.selectedTool === this.TOOL.POLYGON;
};
/*
 * Verify if there's a hounsfield tool selected.
 *
 * @memberof hounsfield.
 */
MIRROR.hounsfield.prototype.isSomeToolSelected = function(){
    return this.selectedTool !== this.TOOL.NONE;
};
/*
 * Select a hounsfield tool, and close any unfinished PolygonShape.
 *
 * @memberof hounsfield.
 */
MIRROR.hounsfield.prototype.__selectTool = function(tool){
    // if is the same tool, do nothing
    if(this.selectedTool===tool){
        return;
    }
    // on tool change, close all the shapes (inverse order, because the shape are remover from the array)
    for(var sindex = this.shapes.length-1; sindex>=0; sindex--){
        this.shapes[sindex].closeOrDelete();
    }
    this.selectedTool = tool;

};
/*
 * Unselect the current hounsfield tool.
 *
 * @memberof hounsfield.
 */
MIRROR.hounsfield.prototype.unselectTool = function(){
    this.selectedTool = this.TOOL.NONE;
};

/****************************************/
/** methods related to the user Events **/
/****************************************/
/*
 * Parse the Pixi event coordinates, getting the position relative to the textureSprite (dicom image) and the stage (the 'frame').
 *
 * @memberof hounsfield.
 * @param mouseData {event} : a mouse/touch event generated by Pixi's InteractionManager
 */
MIRROR.hounsfield.prototype.parseMouseData = function(mouseData){
    var childPosition = mouseData.data.getLocalPosition(this.layer.textureSprite);
    var stagePosition = mouseData.data.getLocalPosition(this.layer.stage);
    return {
        stage:{
            x: Math.floor(stagePosition.x),
            y: Math.floor(stagePosition.y)
        },
        child: {
            x: Math.floor(childPosition.x),
            y: Math.floor(childPosition.y)
        }
    };
};
/*
 * Handle the mouseDown/touchStart events
 *
 * @memberof hounsfield.
 * @param mouseData {event} : a mouse/touch event generated by Pixi's InteractionManager
 */
MIRROR.hounsfield.prototype.__pressAction = function(mouseData){
    var evtParsed = this.parseMouseData(mouseData);
    this.selectedPoint = this.__findPoint(evtParsed);

    // the currentShape, is the shape of the point selected, or the last one created
    if(this.selectedPoint){
        this.currentShape = this.selectedPoint.parentShape;
    }else{
        this.currentShape = this.shapes[ this.shapes.length-1 ];
    }

    if( this.isPointToolSelected() ) {
        // if nothing is selected, create a new point
        if(!this.selectedPoint){
            this.currentShape = new MIRROR.hounsfield.ShapePoint(evtParsed, this);
            this.shapes.push(this.currentShape);
            this.selectedPoint = this.currentShape.points[0];
        }
        this.layer.stage.on('mousemove', this.__moveAction.bind(this));
        this.layer.stage.on('touchmove', this.__moveAction.bind(this));
    }
    else if( this.isElipseToolSelected() ){
        if( !this.selectedPoint ){
            this.currentShape = new MIRROR.hounsfield.ShapeEllipse(evtParsed, this);
            this.shapes.push(this.currentShape);
            // select the anchor
            this.selectedPoint = this.currentShape.points[1];
        }
        this.layer.stage.on('mousemove', this.__moveAction.bind(this));
        this.layer.stage.on('touchmove', this.__moveAction.bind(this));
    }
    else if( this.isPolygonToolSelected() ){
        if( this.selectedPoint ){
            var firstPoint = this.currentShape.points[0];
            // if the selected point is the first, complete the shape
            //if( this.selectedPoint.isNearOfPoint(firstPoint) && this.currentShape.__isValidPolygon() ){   /// y el tipo es el mismo
            if( this.selectedPoint.child===firstPoint.child ){
                this.currentShape.__closeShape();
            }
        }else{
            // if is the first shape, or the last one is done, then create a new shape
            if( !this.currentShape || this.currentShape.done ){
                // create a new polygon
                this.currentShape = new MIRROR.hounsfield.ShapePolygon(evtParsed, this);
                this.shapes.push(this.currentShape);
                // create the second point
                this.selectedPoint = this.currentShape.addPoint(evtParsed);
//                console.log('new Polygon');
            }else{
                // add a point on the current shape
                this.selectedPoint = this.currentShape.addPoint(evtParsed);
            }
        }
        this.layer.stage.on('mousemove', this.__moveAction.bind(this));
        this.layer.stage.on('touchmove', this.__moveAction.bind(this));
    }
};
/*
 * Handle the mouseMove/touchMove events
 *
 * @memberof hounsfield.
 * @param mouseData {event} : a mouse/touch event generated by Pixi's InteractionManager
 */
MIRROR.hounsfield.prototype.__moveAction = function(mouseData){
    var evtParsed = this.parseMouseData(mouseData);

    // if the shape if a Ellipse, and he point is his center, then move his anchor too
    if(this.selectedPoint.parentShape.shapeType==='ShapeEllipse' && this.currentShape.points[0]===this.selectedPoint){
        this.selectedPoint.parentShape.moveShapeTo(evtParsed);
    }else{
        this.selectedPoint.moveTo(evtParsed);
    }
};
/*
 * Handle the mouseUp/touchEnd events
 *
 * @memberof hounsfield.
 * @param mouseData {event} : a mouse/touch event generated by Pixi's InteractionManager
 */
MIRROR.hounsfield.prototype.__releaseAction = function(mouseData){
    var evtParsed = this.parseMouseData(mouseData);

    this.layer.stage.off('mousemove');
    this.layer.stage.off('touchmove');
    if( !this.currentShape ) return;

    this.currentShape.releaseOnPosition(this.selectedPoint);

    if( this.currentShape.done ){
        this.currentShape.fetchHounsfield();
    }
};
/*
 * Find a Point near the event in all the Shapes of the layer.
 *
 * @memberof hounsfield.
 * @param evtParsed {object} : a mouse/touch event parsed (see MIRROR.hounsfield.prototype.parseMouseData).
 */
MIRROR.hounsfield.prototype.__findPoint = function(evtParsed){
    // check on each shape
    for(var sindex=0; sindex<this.shapes.length; sindex++){
        var shape = this.shapes[sindex];
        for(var pindex=0; pindex<shape.points.length; pindex++){
            var point = shape.points[pindex];
            if( point.isNear(evtParsed) )
                return point;
        }
    }
    return null;
};

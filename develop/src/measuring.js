/**
 * @file        Functions of the measuring class
 * @author      Toth Limitada <contacto@toth.cl>
 * @copyright   2015 Toth Limitada
 * @license     {@link http://www.toth.cl}
 */

/**
 * @namespace MIRROR
 */

/* global MIRROR, math */

/*
 * Initialized and triggered the necessary events.
 * 
 * @memberof measuring
 */
MIRROR.measuring.prototype.initializedTriggered = function () {
    if ($('#canvas_measuring_'+ this.layer.layerId).length === 0) {
        var layerDOM = document.getElementById (this.layer.layerId);
        layerDOM.appendChild (this.canvas);
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        var t = this;        
        if (t.layer.make.environment === 'desktop') {
            $('#canvas_measuring_'+ t.layer.layerId).on ('mousedown', {measuring: t}, t.__downActions);
            $('#canvas_measuring_'+ t.layer.layerId).on ('mousemove', {measuring: t}, t.__moveActions);
            $('#canvas_measuring_'+ t.layer.layerId).on ('mouseup', {measuring: t}, t.__upActions);
        } else {
            $('#canvas_measuring_'+ t.layer.layerId).bind ('touchstart', {measuring: t}, t.__downActions);
            $('#canvas_measuring_'+ t.layer.layerId).bind ('touchmove', {measuring: t}, t.__moveActions);
            $('#canvas_measuring_'+ t.layer.layerId).bind ('touchend', {measuring: t}, t.__upActions);
        }   
    }    
};
/*
 * Actions for mousedown/touchstart event.
 * 
 * @memberof measuring
 * @param event {object}
 */
MIRROR.measuring.prototype.__downActions = function (event) {
    var t = event.data.measuring,
        pointDown = {};
    pointDown.x = ((t.layer.make.environment === 'desktop') ? event.clientX : event.originalEvent.touches[0].pageX) - $(this).offset().left;
    pointDown.y = ((t.layer.make.environment === 'desktop') ? event.clientY : event.originalEvent.touches[0].pageY) - $(this).offset().top;              
    
    t.down = true;
    t.point = t.__findPoint (pointDown.x, pointDown.y);
    
    if (!t.point) {        
        if (t.shapes.length === 0 || t.shapes[t.shapes.length - 1].done) {
            var s  = new t.shape ();
            t.shapes.push (s);            
            t.shapes[t.shapes.length - 1].type = t.layer.make.measuringTool;
            t.shapes[t.shapes.length - 1].making = true;
            t.shapes[t.shapes.length - 1].points.push(pointDown);
            t.shapes[t.shapes.length - 1].points.push(pointDown);            
        } else {
            t.shapes[t.shapes.length - 1].points.push(pointDown);
        }
        t.__paintEdges ();
        t.__paintPoints ();
        t.__paintLabels ();  
    } else {
        if (!t.shapes[t.shapes.length - 1].done) {
            if (t.__checkingIfIdenticalForCloseArea (t.shapes.length - 1, pointDown)) {
                t.shapes[t.shapes.length - 1].points.push(pointDown);
            }            
        }
    }
};
/*
 * Actions for mousemove/touchmove event.
 * 
 * @memberof measuring
 * @param event {object}
 */
MIRROR.measuring.prototype.__moveActions = function (event) {
    var t = event.data.measuring;
    if (t.layer.make.environment !== 'desktop') {
        event.preventDefault ();
    }
    if (!t.point && t.down) {
        if (t.shapes.length !== 0) {
            var pointMove = {};
            pointMove.x = ((t.layer.make.environment === 'desktop') ? event.clientX : event.originalEvent.touches[0].pageX) - $(this).offset().left;
            pointMove.y = ((t.layer.make.environment === 'desktop') ? event.clientY : event.originalEvent.touches[0].pageY) - $(this).offset().top;

            t.__paintEdges ();
            t.__paintPoints ();
            t.__paintLabels ();

            if (t.shapes[t.shapes.length - 1].points.length > 1) {
                t.context.beginPath();
                t.context.moveTo(
                    t.shapes[t.shapes.length - 1].points[t.shapes[t.shapes.length - 1].points.length - 2].x, 
                    t.shapes[t.shapes.length - 1].points[t.shapes[t.shapes.length - 1].points.length - 2].y
                );
                t.context.lineTo(pointMove.x, pointMove.y);
                t.context.lineWidth = '2';
                t.context.strokeStyle= 'rgba(213, 133, 18, 1)'; 
                t.context.stroke();
                t.context.closePath();
                t.shapes[t.shapes.length - 1].points[t.shapes[t.shapes.length - 1].points.length - 1] = pointMove;
            }                             
        }
    } else if (t.point !== false && t.down) {
        var pointMove = {};
        pointMove.x = ((t.layer.make.environment === 'desktop') ? event.clientX : event.originalEvent.touches[0].pageX) - $(this).offset().left;
        pointMove.y = ((t.layer.make.environment === 'desktop') ? event.clientY : event.originalEvent.touches[0].pageY) - $(this).offset().top;
        
        if (t.shapes[t.point.indexShape].type === 'area') {
            if ((t.point.indexPoint === (t.shapes[t.point.indexShape].points.length - 1) || t.point.indexPoint === 0) && 
                t.__checkingIfIdenticalForCloseArea (t.point.indexShape, t.shapes[t.point.indexShape].points[t.shapes[t.point.indexShape].points.length - 1])) {
                t.shapes[t.point.indexShape].points[0].x = pointMove.x;
                t.shapes[t.point.indexShape].points[0].y = pointMove.y;
                t.shapes[t.point.indexShape].points[t.shapes[t.point.indexShape].points.length - 1].x = pointMove.x;
                t.shapes[t.point.indexShape].points[t.shapes[t.point.indexShape].points.length - 1].y = pointMove.y;
            } else {
                t.shapes[t.point.indexShape].points[t.point.indexPoint].x = pointMove.x;
                t.shapes[t.point.indexShape].points[t.point.indexPoint].y = pointMove.y;
            }    
        } else {
            t.shapes[t.point.indexShape].points[t.point.indexPoint].x = pointMove.x;
            t.shapes[t.point.indexShape].points[t.point.indexPoint].y = pointMove.y;   
        }                                       

        t.__paintEdges ();
        t.__paintPoints ();
        t.__paintLabels ();
        t.__calculate (t.point.indexShape);
    } else if (t.layer.make.environment === 'desktop' && t.shapes.length !== 0 && !t.down) {
        if (!t.shapes[t.shapes.length - 1].done) {
            var pointMove = {};
            pointMove.x = ((t.layer.make.environment === 'desktop') ? event.clientX : event.originalEvent.touches[0].pageX) - $(this).offset().left;
            pointMove.y = ((t.layer.make.environment === 'desktop') ? event.clientY : event.originalEvent.touches[0].pageY) - $(this).offset().top;

            t.__paintEdges ();
            t.__paintPoints ();
            t.__paintLabels ();

            t.context.beginPath();               
            t.context.moveTo(
                t.shapes[t.shapes.length - 1].points[t.shapes[t.shapes.length - 1].points.length - 1].x, 
                t.shapes[t.shapes.length - 1].points[t.shapes[t.shapes.length - 1].points.length - 1].y
            );
            t.context.lineTo(pointMove.x, pointMove.y);
            t.context.lineWidth = '2';
            t.context.strokeStyle= 'rgba(213, 133, 18, 1)'; 
            t.context.stroke();
            t.context.closePath();
            t.__calculate (t.shapes.length - 1, pointMove);
        }        
    }
};
/*
 * Actions for mouseup/touchend event.
 * 
 * @memberof measuring
 */
MIRROR.measuring.prototype.__upActions = function (event) { 
    var t = event.data.measuring;
    if (t.__checkingIfIdentical (t.shapes.length - 1)) {
        t.shapes[t.shapes.length - 1].points.pop ();
    } 
    t.__checkingIfDone ();
    t.down = false;
};
/*
 * Check if point 1 and point 2 are identical.
 * 
 * @memberof measuring
 * @return boolean
 */
MIRROR.measuring.prototype.__checkingIfIdentical = function (index) {
    if (this.shapes[index].points.length === 2) {
        if (this.shapes[index].points[1].x >= (this.shapes[index].points[0].x - 15) &&
            this.shapes[index].points[1].x <= (this.shapes[index].points[0].x + 15) &&
            this.shapes[index].points[1].y >= (this.shapes[index].points[0].y - 15) &&
            this.shapes[index].points[1].y <= (this.shapes[index].points[0].y + 15)) {
            return true;
        }
    }    
    return false;
};
/*
 * Check if point 1 and point n are identical for close area.
 * 
 * @memberof measuring
 * @return boolean
 */
MIRROR.measuring.prototype.__checkingIfIdenticalForCloseArea = function (index, point) {
    if (this.shapes[index].points.length > 1) {
        if (point.x >= (this.shapes[index].points[0].x - 15) &&
            point.x <= (this.shapes[index].points[0].x + 15) &&
            point.y >= (this.shapes[index].points[0].y - 15) &&
            point.y <= (this.shapes[index].points[0].y + 15)) {
            return true;
        }
    }    
    return false;
};
/*
 * Check if the shape is done.
 * 
 * @memberof measuring
 */
MIRROR.measuring.prototype.__checkingIfDone = function () {
    var identical = this.__checkingIfIdentical (this.shapes.length - 1);
    if (!identical) {
        if ((this.layer.make.measuringTool === 'segment' && this.shapes[this.shapes.length - 1].points.length === 2) || 
            (this.layer.make.measuringTool === 'angle' && this.shapes[this.shapes.length - 1].points.length === 3)) {  

            this.shapes[this.shapes.length - 1].done = true;    
            this.shapes[this.shapes.length - 1].making = false;

            this.__paintEdges ();
            this.__paintPoints (); 
            this.__paintLabels ();            
        } else if (this.layer.make.measuringTool === 'area' && this.shapes[this.shapes.length - 1].points.length > 1) {
            if ((this.shapes[this.shapes.length - 1].points[this.shapes[this.shapes.length - 1].points.length - 1].x >= (this.shapes[this.shapes.length - 1].points[0].x - 15) && 
                this.shapes[this.shapes.length - 1].points[this.shapes[this.shapes.length - 1].points.length - 1].x <= (this.shapes[this.shapes.length - 1].points[0].x + 15)) &&
                (this.shapes[this.shapes.length - 1].points[this.shapes[this.shapes.length - 1].points.length - 1].y >= (this.shapes[this.shapes.length - 1].points[0].y - 15) &&
                this.shapes[this.shapes.length - 1].points[this.shapes[this.shapes.length - 1].points.length - 1].y <= (this.shapes[this.shapes.length - 1].points[0].y + 15))) {  

                this.shapes[this.shapes.length - 1].points[this.shapes[this.shapes.length - 1].points.length - 1].x = this.shapes[this.shapes.length - 1].points[0].x;
                this.shapes[this.shapes.length - 1].points[this.shapes[this.shapes.length - 1].points.length - 1].y = this.shapes[this.shapes.length - 1].points[0].y;

                this.shapes[this.shapes.length - 1].done = true;    
                this.shapes[this.shapes.length - 1].making = false;

                this.__paintEdges ();
                this.__paintPoints ();   
                this.__paintLabels ();
            }  
        }
    }    
};
/*
 * Looking for if last shape is undone and remove them if his type is not equals to measuringTool.
 * 
 * @memberof measuring
 */
MIRROR.measuring.prototype.findLastUndoneShapes = function () {
    if (this.shapes.length > 0 && !this.shapes[this.shapes.length - 1].done) {
        if (this.shapes[this.shapes.length - 1].type !== this.layer.make.measuringTool) {
            this.shapes.pop ();
            this.__paintEdges ();
            this.__paintPoints ();
            this.__paintLabels ();
        }
    }    
};
/*
 * Looking for if the point exists.
 * 
 * @memberof measuring
 */
MIRROR.measuring.prototype.__findPoint = function (x, y) {
    if (this.shapes.length !== 0) {
        for (var i = 0; i < this.shapes.length; i++) {
            for (var j = 0; j < this.shapes[i].points.length; j++) {                     
                if (((x >= (this.shapes[i].points[j].x - 15) && x <= (this.shapes[i].points[j].x + 15)) && 
                (y >= (this.shapes[i].points[j].y - 15) && y <= (this.shapes[i].points[j].y + 15)))) {
                    return {
                        indexShape: i,
                        indexPoint: j
                    };
                }
            }
        }
    }    
    return false;
};
/*
 * Drawing edges.
 * 
 * @memberof measuring
 */
MIRROR.measuring.prototype.__paintEdges = function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);   
    $('#'+ this.layer.layerId +' h5').remove ();    
    for (var i = 0; i < this.shapes.length; i++) {
        this.context.beginPath (); 
        this.context.moveTo (this.shapes[i].points[0].x, this.shapes[i].points[0].y);
        for (var j = 1; j < this.shapes[i].points.length; j++) {                     
            this.context.lineTo (this.shapes[i].points[j].x, this.shapes[i].points[j].y);                  
        }
        this.context.lineWidth = '2';
        if (this.shapes[i].type === 'segment' || this.shapes[i].type === 'angle') {
            this.context.fillStyle = 'rgba(255, 255, 255, 0)';
        } else if (this.shapes[i].type === 'area') {
            this.context.fillStyle = 'rgba(213, 133, 18, 0.3)';
        }
        this.context.fill (); 
        if (this.shapes[i].done || this.shapes[i].making) {
            this.context.strokeStyle= 'rgba(213, 133, 18, 1)';
        } else {
            this.context.strokeStyle= 'rgba(213, 133, 18, 0)';
        }    
        this.context.stroke ();          
    }                              
};    
/*
 * Drawing points.
 * 
 * @memberof measuring
 */
MIRROR.measuring.prototype.__paintPoints = function () {
    for (var i = 0; i < this.shapes.length; i++) {
        for (var j = 0; j < this.shapes[i].points.length; j++) {                     
            this.context.beginPath ();
            this.context.arc (this.shapes[i].points[j].x, this.shapes[i].points[j].y, 3, 0, Math.PI * 2, true);
            this.context.fillStyle = '#D58512';
            this.context.fill ();
            this.context.closePath ();              
        }
    }                
};
/*
 * Drawing labels.
 * 
 * @memberof measuring
 */
MIRROR.measuring.prototype.__paintLabels = function () {
    for (var i = 0; i < this.shapes.length; i++) {
        if ((this.shapes[i].type === 'segment' && this.shapes[i].points.length === 2 && !this.__checkingIfIdentical (i)) || 
            (this.shapes[i].type === 'angle' && this.shapes[i].points.length === 3) || 
            (this.shapes[i].type === 'area' && this.shapes[i].done)) {
            this.__calculate (i);
        }
    }
};
/*
 * Calculating the measure.
 * 
 * @memberof measuring
 * @param indexShape {integer}: position within the record of points.
 * @param pointMove {boolean}
 */
MIRROR.measuring.prototype.__calculate = function (indexShape, pointMove) {
    if (this.shapes[indexShape].type === 'segment') {
        if (this.shapes[indexShape].points.length === 1) {
            var slope = (pointMove.y - this.shapes[indexShape].points[0].y) / (pointMove.x - this.shapes[indexShape].points[0].x),
                halfPositionX = ((pointMove.x + this.shapes[indexShape].points[0].x) / 2).toFixed(0),
                halfPositionY = ((pointMove.y + this.shapes[indexShape].points[0].y) / 2).toFixed(0),
                deltaX = (this.shapes[indexShape].points[0].x - pointMove.x),
                deltaY = (this.shapes[indexShape].points[0].y - pointMove.y);
        } else {
            var slope = (this.shapes[indexShape].points[1].y - this.shapes[indexShape].points[0].y) / (this.shapes[indexShape].points[1].x - this.shapes[indexShape].points[0].x),
                halfPositionX = ((this.shapes[indexShape].points[1].x + this.shapes[indexShape].points[0].x) / 2).toFixed(0),
                halfPositionY = ((this.shapes[indexShape].points[1].y + this.shapes[indexShape].points[0].y) / 2).toFixed(0),
                deltaX = (this.shapes[indexShape].points[0].x - this.shapes[indexShape].points[1].x),
                deltaY = (this.shapes[indexShape].points[0].y - this.shapes[indexShape].points[1].y);
        }    
        var sum = (deltaX * deltaX) + (deltaY * deltaY),
            pixelSpacing = (this.layer.make.load.series[this.layer.serieIdCharged].pixelSpacing !== null) ? this.layer.make.load.series[this.layer.serieIdCharged].pixelSpacing : 1;
        this.shapes[indexShape].calcule = Math.sqrt(sum) / this.layer.scale * pixelSpacing;
        if (slope > 0) {
            halfPositionY = parseInt(halfPositionY) - 20;
        } else {
            halfPositionY = parseInt(halfPositionY) + 5;
        }
        $('#'+ this.layer.layerId).append(
            '<h5>'+
                '<span style="z-index: 200; color: #fff; background-color: rgba(0, 0, 0, 0.5); border-radius: 3px; border: 1px solid ##505050; position: absolute; top: '+ halfPositionY +'px; left: '+ halfPositionX +'px;">'+ 
                    this.shapes[indexShape].calcule.toFixed (0) +''+ ((this.layer.make.load.series[this.layer.serieIdCharged].pixelSpacing !== null) ? '[mm]' : '[px]') +''+
                '</span>'+
            '</h5>'
        );
    } else if (this.shapes[indexShape].type === 'angle') {
        if (this.shapes[indexShape].points.length > 1) {
            if (this.shapes[indexShape].points.length === 2) {
                var cSum = ((this.shapes[indexShape].points[0].x - pointMove.x) * (this.shapes[indexShape].points[0].x - pointMove.x)) + ((this.shapes[indexShape].points[0].y - pointMove.y) * (this.shapes[indexShape].points[0].y - pointMove.y)),
                    c = Math.sqrt(cSum),
                    bSum = ((this.shapes[indexShape].points[1].x - pointMove.x) * (this.shapes[indexShape].points[1].x - pointMove.x)) + ((this.shapes[indexShape].points[1].y - pointMove.y) * (this.shapes[indexShape].points[1].y - pointMove.y)),
                    b = Math.sqrt(bSum),
                    aSum = ((this.shapes[indexShape].points[0].x - this.shapes[indexShape].points[1].x) * (this.shapes[indexShape].points[0].x - this.shapes[indexShape].points[1].x)) + ((this.shapes[indexShape].points[0].y - this.shapes[indexShape].points[1].y) * (this.shapes[indexShape].points[0].y - this.shapes[indexShape].points[1].y)),
                    a = Math.sqrt(aSum),
                    ang = Math.acos(((a * a) + (b * b) - (c * c)) / (2 * a * b)); 
            } else {
                var cSum = ((this.shapes[indexShape].points[0].x - this.shapes[indexShape].points[2].x) * (this.shapes[indexShape].points[0].x - this.shapes[indexShape].points[2].x)) + ((this.shapes[indexShape].points[0].y - this.shapes[indexShape].points[2].y) * (this.shapes[indexShape].points[0].y - this.shapes[indexShape].points[2].y)),
                    c = Math.sqrt(cSum),
                    bSum = ((this.shapes[indexShape].points[1].x - this.shapes[indexShape].points[2].x) * (this.shapes[indexShape].points[1].x - this.shapes[indexShape].points[2].x)) + ((this.shapes[indexShape].points[1].y - this.shapes[indexShape].points[2].y) * (this.shapes[indexShape].points[1].y - this.shapes[indexShape].points[2].y)),
                    b = Math.sqrt(bSum),
                    aSum = ((this.shapes[indexShape].points[0].x - this.shapes[indexShape].points[1].x) * (this.shapes[indexShape].points[0].x - this.shapes[indexShape].points[1].x)) + ((this.shapes[indexShape].points[0].y - this.shapes[indexShape].points[1].y) * (this.shapes[indexShape].points[0].y - this.shapes[indexShape].points[1].y)),
                    a = Math.sqrt(aSum),
                    ang = Math.acos(((a * a) + (b * b) - (c * c)) / (2 * a * b));            
            }
            this.shapes[indexShape].calcule = ang *(180 / Math.PI);
            $('#'+ this.layer.layerId).append(
                '<h5>'+
                    '<span style="z-index: 200; color: #fff; background-color: rgba(0, 0, 0, 0.5); border-radius: 3px; border: 1px solid ##505050; position: absolute; top: '+ (this.shapes[indexShape].points[1].y + 5) +'px; left: '+ (this.shapes[indexShape].points[1].x + 5) +'px;">'+ 
                        this.shapes[indexShape].calcule.toFixed (0) +'[°]'+
                    '</span>'+
                '</h5>'
            );
        }
    } else if (this.shapes[indexShape].type === 'area') {
        if ((this.shapes[indexShape].points[0].x === this.shapes[indexShape].points[this.shapes[indexShape].points.length - 1].x) && 
            (this.shapes[indexShape].points[0].y === this.shapes[indexShape].points[this.shapes[indexShape].points.length - 1].y) && 
            (this.shapes[indexShape].points.length > 1)) {
            var sum = 0;
            for (var i = 1; i < this.shapes[indexShape].points.length; i++) {
                var x1 = this.shapes[indexShape].points[i - 1].x * ((this.layer.make.load.series[this.layer.serieIdCharged].pixelSpacing !== null) ? this.layer.make.load.series[this.layer.serieIdCharged].pixelSpacing : 1) / this.layer.scale,
                    x2 = this.shapes[indexShape].points[i].x * ((this.layer.make.load.series[this.layer.serieIdCharged].pixelSpacing !== null) ? this.layer.make.load.series[this.layer.serieIdCharged].pixelSpacing : 1) / this.layer.scale,
                    y1 = this.shapes[indexShape].points[i - 1].y * ((this.layer.make.load.series[this.layer.serieIdCharged].pixelSpacing !== null) ? this.layer.make.load.series[this.layer.serieIdCharged].pixelSpacing : 1) / this.layer.scale,
                    y2 = this.shapes[indexShape].points[i].y * ((this.layer.make.load.series[this.layer.serieIdCharged].pixelSpacing !== null) ? this.layer.make.load.series[this.layer.serieIdCharged].pixelSpacing : 1) / this.layer.scale;
                var matrix = math.matrix([
                    [x1, x2],
                    [y1, y2]
                ]);
                var det = math.det(matrix);
                sum += det;                    
            }                 
            this.shapes[indexShape].calcule = ((1 / 2) * Math.abs(sum));
            $('#'+ this.layer.layerId).append(
                '<h5>'+
                    '<span style="z-index: 200; color: #fff; background-color: rgba(0, 0, 0, 0.5); border-radius: 3px; border: 1px solid ##505050; position: absolute; top: '+ (this.shapes[indexShape].points[0].y + 5) +'px; left: '+ (this.shapes[indexShape].points[0].x + 5) +'px;">'+ 
                        this.shapes[indexShape].calcule.toFixed (0) +''+ ((this.layer.make.load.series[this.layer.serieIdCharged].pixelSpacing !== null) ? '[mm&sup2;]' : '[px&sup2;]') +''+
                    '</span>'+
                '</h5>'
            );
        }        
    }    
};
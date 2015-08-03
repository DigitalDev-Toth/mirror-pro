/**
 * @file        Functions of the layer class
 * @author      Toth Limitada <contacto@toth.cl>
 * @copyright   2015 Toth Limitada
 * @license     {@link http://www.toth.cl}
 */

/**
 * @namespace MIRROR
 */

/* global PIXI, MIRROR, Hammer */

/*
 * Initializes the context configuration.
 * 
 * @memberof layer
 * @param layerWidth {integer}.
 * @param layerHeight {integer}.
 */
MIRROR.layer.prototype.init = function (layerWidth, layerHeight) {
    this.__layerConfiguration (layerWidth, layerHeight);
    this.__commonEventsHandler ();

    this.hounsfield = new MIRROR.hounsfield (this);
};
/*
 * Configure the initial state of the scene.
 * 
 * @memberof layer
 * @param layerWidth {integer}.
 * @param layerHeight {integer}.
 */
MIRROR.layer.prototype.__layerConfiguration = function (layerWidth, layerHeight) {
    this.setLayerSize (layerWidth, layerHeight);  

    this.renderer = PIXI.autoDetectRenderer ({
        antialias: true
    });
//    this.renderer = new PIXI.CanvasRenderer ();
    if (this.make.browser === 'msie') {
        $('#renderers').append (this.renderer.view);
    }    

    if (this.displayed) {
        $('#'+ this.layerId).html(MIRROR.ui['void_layer']);
    }   
};
/*
 * Set size of the context.
 * 
 * @memberof layer
 * @param layerWidth {integer}.
 * @param layerHeight {integer}.
 */
MIRROR.layer.prototype.setLayerSize = function (layerWidth, layerHeight) {
    this.width = layerWidth;
    this.height = layerHeight;
};
/*
 * Configuration of the PIXI elements.
 * 
 * @memberof layer
 */
MIRROR.layer.prototype.__setupContext = function () {    
    this.stage = new PIXI.Container ();
    this.stage.layer = this;
    this.stage.interactive  = true;
    var canvas = new PIXI.CanvasBuffer (this.width, this.height);
    canvas.context.rect (0, 0, this.width, this.height);
    canvas.context.fillStyle = '#000';
    canvas.context.fill ();
    var texture = PIXI.Texture.fromCanvas (canvas.canvas);
    this.container = new PIXI.Sprite (texture);
    this.filterSprite = new PIXI.Sprite (texture);
    this.transformationSprite = new PIXI.Sprite (texture);    
    this.textureSprite = new PIXI.Sprite (texture);
    
    if (this.make.environment === 'desktop') {   
        this.transformationSprite.addChild (this.textureSprite);
    } else {
        this.pivotSprite = new PIXI.Sprite (texture);
        this.pivotSprite.addChild (this.textureSprite);
        this.transformationSprite.addChild (this.pivotSprite);
    }
    
    this.filterSprite.addChild (this.transformationSprite);
    this.container.addChild (this.filterSprite);
    
    if (this.make.environment === 'desktop') {
        this.dicomInformation = new PIXI.Text(
            '', 
            {font: '12px Arial', fill: '#FFF'}
        );
        this.layerInformation = new PIXI.Text(
            '', 
            {font: '12px Arial', fill: '#FFF'}
        );  
        this.container.addChild(this.dicomInformation);
        this.container.addChild(this.layerInformation);      
        this.dicomInformation.position.x = 10;
        this.dicomInformation.position.y = 5;
        this.layerInformation.position.x = 10;
        this.layerInformation.position.y = this.height - 80;
    }        
    
    this.stage.addChild (this.container);
};
/*
 * Update all PIXI elements.
 * 
 * @memberof layer
 */
MIRROR.layer.prototype.updateContext = function () {
    if (!this.displayed) {
        this.selected = false;
        if (this.stage !== null) {
            this.__destroyContext ();            
        }
    } 
};
/*
 * Destroy all PIXI elements.
 * 
 * @memberof layer
 */
MIRROR.layer.prototype.__destroyContext = function () { 
    clearInterval (this.filmInterval);
    
    this.stage.off ('mousedown');
    this.stage.off ('mousemove');
    this.stage.off ('mouseup');
    this.stage.off ('rightdown');
    this.stage.off ('rightup');
    
    this.textureSprite.destroy (true, false);
    if (this.make.environment !== 'desktop') {
        this.pivotSprite.destroy (true, true);
    }    
    this.transformationSprite.destroy (true, true);
    this.filterSprite.destroy (true, true);
    this.container.destroy (true, true);
    this.stage.destroy (false);
    
    delete this.textureSprite;
    if (this.make.environment !== 'desktop') {
        delete this.pivotSprite;
    }    
    delete this.transformationSprite;
    delete this.filterSprite;
    delete this.container;
    delete this.stage;
    
    this.stage = null;
    this.container = null;
    this.filterSprite = null;
    this.transformationSprite = null;
    if (this.make.environment !== 'desktop') {
        this.pivotSprite = null;
    }
    this.textureSprite = null;
    this.dicomInformation = null;
    this.layerInformation = null;    
    
    if (this.make.browser === 'msie') {
        $('#renderers').append (this.renderer.view);
    }
    this.renderer._lastObjectRendered = this.renderer._tempDisplayObjectParent;
    this.renderer.view.id = '';   
};
/*
 * Updates the configuration of the elements of the scene.
 * 
 * @memberof layer
 * @param layerId {string}.
 * @param layerWidth {integer}.
 * @param layerHeight {integer}.
 */
MIRROR.layer.prototype.updateLayerConfiguration = function (layerId, layerWidth, layerHeight) {    
    this.layerId = layerId;
    this.setLayerSize (layerWidth, layerHeight);
    if (this.make.environment !== 'desktop') {
        if (this.stage !== null) {
            this.renderer.resize (this.width, this.height);
        }        
    } 
    if (this.serieIdCharged !== null && this.stage !== null) {
        this.renderer.view.id = 'canvas_'+ this.layerId;
        $('#canvas_'+ this.layerId).css({
            'position': 'absolute',
            'top': '0px',
            'left': '0px'
        });
        if (this.make.environment !== 'desktop') {                     
            if (this.make.browser === 'msie') {
                $('#'+ this.renderer.view.id).remove ();
            } 
            $('#'+ this.layerId).html (this.renderer.view);
            if (!this.make.isPhone) {
                $('#'+ this.layerId).append (
                    '<div id="dicom_information_'+ this.layerId +'" style="font-size: 7pt; position: absolute; left: 5px; top: 5px; color: #FFF; -webkit-user-select: none; -moz-user-select: -moz-none; -ms-user-select: none; user-select: none;"></div>'
                );
                $('#'+ this.layerId).append (
                    '<div id="layer_information_'+ this.layerId +'" style="font-size: 7pt; position: absolute; left: 5px; top: '+ ($('#'+ this.layerId).height () - 65) +'px; color: #FFF; -webkit-user-select: none; -moz-user-select: -moz-none; -ms-user-select: none; user-select: none;"></div>'
                );
                this.dicomLayerInformation ();
                this.__dicomLayerInformationConfiguration ();
            }            
            if (this.make.negativeState) {
                $('#'+ this.layerId).css('background', '#FFF');
                $('#dicom_information_'+ this.layerId).css ('color', '#000');
                $('#layer_information_'+ this.layerId).css ('color', '#000');
            } else {
                $('#'+ this.layerId).css('background', '#000');
                $('#dicom_information_'+ this.layerId).css ('color', '#FFF');
                $('#layer_information_'+ this.layerId).css ('color', '#FFF');
            }             
        } else {
            if (this.make.browser === 'msie') {
                $('#'+ this.renderer.view.id).remove ();
            } 
            $('#'+ this.layerId).html (this.renderer.view); 
            this.__dicomLayerInformationConfiguration ();                
        }
        this.resizeEnd = true;
        this.responsiveLayer (this.width, this.height); 
        this.magnifyingGlass ();
    } else {
        $('#'+ this.layerId).html(MIRROR.ui['void_layer']);    
    }
    if (this.make.totalLayers === 1) {
        this.selected = true;
    }
    if (this.selected) {
        $('#'+ this.layerId).css({
            'border': '3px solid #FCBE39'
        });
    }
    if (this.selected && this.make.totalLayers > 1 && this.leadImitation && this.make.imitationLayers) {
        $('#' + this.layerId).css({
            'border': '3px solid red'
        });
    }
    this.__commonEventsHandler ();
};
/*
 * Series textures applied to context. The first texture is applied when it is loaded.
 * 
 * @memberof layer
 * @param baseTexture {PIXI object}.
 */
MIRROR.layer.prototype.applySerie = function (baseTexture, layerWidth, layerHeight) {
    if (this.serieIdCharged !== null && this.serieIdCharged !== undefined) {        
        this.__resetContext ();
        this.setLayerSize (layerWidth, layerHeight);
        this.renderer.resize (this.width, this.height);        
        this.__setupContext ();        
        this.renderer.view.id = 'canvas_'+ this.layerId;        
        if (this.make.environment === 'desktop') {
            this.dicomInformation.visible = true;
            this.layerInformation.visible = true;
        }        
        if (this.make.environment !== 'desktop') {          
            if (this.make.browser === 'msie') {
                $('#'+ this.renderer.view.id).remove ();
            }            
            $('#'+ this.layerId).html (this.renderer.view); 
            if (!this.make.isPhone) {
                $('#'+ this.layerId).append (
                    '<div id="dicom_information_'+ this.layerId +'" style="font-size: 7pt; position: absolute; left: 5px; top: 5px; color: #FFF; -webkit-user-select: none; -moz-user-select: -moz-none; -ms-user-select: none; user-select: none;"></div>'
                );
                $('#'+ this.layerId).append (
                    '<div id="layer_information_'+ this.layerId +'" style="font-size: 7pt; position: absolute; left: 5px; top: '+ ($('#'+ this.layerId).height () - 65) +'px; color: #FFF; -webkit-user-select: none; -moz-user-select: -moz-none; -ms-user-select: none; user-select: none;"></div>'
                );
                this.__dicomLayerInformationConfiguration ();
            } else {
                $('#dicom_information_'+ this.layerId).remove ();
                $('#layer_information_'+ this.layerId).remove ();
            }  
            if (this.make.negativeState) {
                $('#'+ this.layerId).css('background', '#FFF');
                $('#dicom_information_'+ this.layerId).css ('color', '#000');
                $('#layer_information_'+ this.layerId).css ('color', '#000');
            } else {
                $('#'+ this.layerId).css('background', '#000');
                $('#dicom_information_'+ this.layerId).css ('color', '#FFF');
                $('#layer_information_'+ this.layerId).css ('color', '#FFF');
            }   
        } else {
            if (this.make.browser === 'msie') {
                $('#'+ this.renderer.view.id).remove ();
            } 
            $('#'+ this.layerId).html (this.renderer.view);
            this.__dicomLayerInformationConfiguration ();           
        }
        $('#canvas_'+ this.layerId).css({
            'position': 'absolute',
            'top': '0px',
            'left': '0px'
        }); 
        this.positionInSerie = 0;
        var texture1 = new PIXI.Texture (baseTexture);
        this.textureSprite.texture = texture1;  

        this.__contextToLayerRatio ();        
        
        this.__transformsEventsHandler ();        
    } else {
        $('#'+ this.layerId).html (MIRROR.ui['void_layer']);
    }       
    this.__commonEventsHandler ();
    this.__layerApplyTools ();
    this.dicomLayerInformation ();
};
/*
 * Shape to workspace proportion.
 * 
 * @memberof layer
 */
MIRROR.layer.prototype.__contextToLayerRatio = function () {
    this.transformationSprite.position.x = (this.renderer.width / 2) - (this.make.load.series[this.serieIdCharged].dimensions[this.positionInSerie].columns / 2);
    this.transformationSprite.position.y = (this.renderer.height / 2) - (this.make.load.series[this.serieIdCharged].dimensions[this.positionInSerie].rows / 2);           
    this.transformationSprite.updateTransform ();  
    var event = new PIXI.interaction.InteractionData ();
    var globalPos = new PIXI.Point (this.renderer.width / 2, this.renderer.height / 2);
    event.getLocalPosition (this.stage, this.globalDown, globalPos);
    event.getLocalPosition (this.transformationSprite, this.localDown, globalPos);
    event.getLocalPosition (this.textureSprite, this.localDownTexture, globalPos);
    this.diffZoom.x = (this.globalDown.x - this.localDown.x);
    this.diffZoom.y = (this.globalDown.y - this.localDown.y);
    this.diffRotation.x = (this.globalDown.x - this.localDownTexture.x);
    this.diffRotation.y = (this.globalDown.y - this.localDownTexture.y);
    this.scale *= this.__getResponsiveScale ();
    this.lastResponsiveScale = this.scale;
    this.lastScale = this.scale;
    if (this.make.environment === 'desktop') {
        this.__zooming (); 
        this.__rotating (); 
    } else {
        this.__mobileTransformations ();
    }   
};
/*
 * The scene returns to its original state. All transformations and actions are removed.
 * 
 * @memberof layer
 */
MIRROR.layer.prototype.defaultState = function () {
    if (this.serieIdCharged !== null) {
        if (this.make.environment === 'desktop') {
            this.globalDown = {x: 0, y: 0};
            this.localDown = {x: 0, y: 0};
            this.localDownTexture = {x: 0, y: 0};
            this.globalMove = {x: 0, y: 0};
            this.scale = 1;
            this.ratio = 0;
            this.diffZoom = {x: 0, y: 0};
            this.pan = {x: 0, y: 0};
            this.diffPan = {x: 0, y: 0};
            this.rotation = 0;
            this.rotate = 0;
            this.diffRotation = {x: 0, y: 0};            
            this.__zooming ();
            this.__rotating ();
            this.__contextToLayerRatio ();
        } else {
            this.globalDown = {x: 0, y: 0};
            this.localDown = {x: 0, y: 0};
            this.localDownTexture = {x: 0, y: 0};
            this.globalMove = {x: 0, y: 0};
            this.scale = 1;
            this.lastScale = 1;
            this.diffZoom = {x: 0, y: 0};
            this.pan = {x: 0, y: 0};
            this.rotation = 0;
            this.rotate = 0;            
            this.deltaFilter = {x: 1, y: 1};
            this.contrastCSS = 1;
            this.brightnessCSS = 1;
            this.__mobileTransformations ();
            this.__contextToLayerRatio ();
            $('#canvas_'+ this.layerId).css('-webkit-filter', 'contrast('+ this.contrastCSS +') brightness('+ this.brightnessCSS +') invert('+ this.negativeCSS +')');
        }      
        this.transformated = false;
        this.transformations = [];
        this.resizeEnd = false;
        this.positionInSerie = 0;        
        this.brightness = 1;
        this.diffBrightness = 0;
        this.contrast = 1;  
        this.windowWidth = (this.make.load.series[this.serieIdCharged].windowWidth !== null) ? this.make.load.series[this.serieIdCharged].windowWidth : null;
        this.windowCenter = (this.make.load.series[this.serieIdCharged].windowCenter !== null) ? this.make.load.series[this.serieIdCharged].windowCenter : null;  
        this.filterSprite.filters = null;         
        if (this.make.renderType === 'webgl' && this.windowWidth !== null && this.windowCenter !== null) {
            this.brightness = (1 - (this.windowCenter / 255)) * 1;
            this.contrast = (1 - (this.windowWidth / 255)) * 1;
        }        
        if (this.make.load.series[this.serieIdCharged].serie[this.positionInSerie] !== undefined) {
            var texture1 = new PIXI.Texture (this.make.load.series[this.serieIdCharged].serie[this.positionInSerie]);                    
            this.textureSprite.texture = texture1;
        }  
        this.navigatorBarIndex ();
        this.__movingLocalizer ();
        this.dicomLayerInformation ();
    }
};
/*
 * All transformations and actions are removed internally.
 * 
 * @memberof layer
 */
MIRROR.layer.prototype.__resetContext = function () {
    if (this.serieIdCharged !== null) {
        if (this.make.environment === 'desktop') {
            this.globalDown = {x: 0, y: 0};
            this.localDown = {x: 0, y: 0};
            this.localDownTexture = {x: 0, y: 0};
            this.globalMove = {x: 0, y: 0};
            this.scale = 1;
            this.lastResponsiveScale = 1;
            this.ratio = 0;
            this.diffZoom = {x: 0, y: 0};
            this.pan = {x: 0, y: 0};
            this.diffPan = {x: 0, y: 0};
            this.rotation = 0;
            this.rotate = 0;
            this.diffRotation = {x: 0, y: 0};
            this.brightness = 1;
            this.diffBrightness = 0;
            this.contrast = 1;
        } else {
            this.globalDown = {x: 0, y: 0};
            this.localDown = {x: 0, y: 0};
            this.localDownTexture = {x: 0, y: 0};
            this.globalMove = {x: 0, y: 0};
            this.scale = 1;
            this.lastScale = 1;
            this.lastResponsiveScale = 1;
            this.ratio = 0;
            this.diffZoom = {x: 0, y: 0};
            this.pan = {x: 0, y: 0};
            this.rotation = 0;
            this.rotate = 0;
            this.deltaFilter = {x: 1, y: 1};
            this.contrastCSS = 1;
            this.brightnessCSS = 1;
        }  
        this.transformated = false;
        this.transformations = [];
        this.resizeEnd = false;
        this.positionInSerie = 0;        
        this.windowWidth = (this.make.load.series[this.serieIdCharged].windowWidth !== null) ? this.make.load.series[this.serieIdCharged].windowWidth : null;
        this.windowCenter = (this.make.load.series[this.serieIdCharged].windowCenter !== null) ? this.make.load.series[this.serieIdCharged].windowCenter : null;         
        if (this.make.renderType === 'webgl' && this.windowWidth !== null && this.windowCenter !== null) {
            this.brightness = (1 - (this.windowCenter / 255)) * 1;
            this.contrast = (1 - (this.windowWidth / 255)) * 1;
        }
        this.navigatorBarIndex ();
    }   
};
/*
 * Sets the scene with all its transformations to a new proportion.
 * 
 * @memberof layer
 * @param layerWidth {integer}.
 * @param layerHeight {integer}.
 */
MIRROR.layer.prototype.responsiveLayer = function (layerWidth, layerHeight) {  
    if (this.make.resizeStart === 1) {
        if (this.serieIdCharged !== null) {
            this.transformationSprite.visible = false;
        }            
    }  
    if (this.stage !== null) {
        this.setLayerSize (layerWidth, layerHeight);
        this.renderer.resize (this.width, this.height);
    }    
    if (this.make.environment === 'desktop') {        
        if (this.serieIdCharged !== null) {
            this.make.load.series[this.serieIdCharged].setMultiplierPaddingNavigatorBar ();
            $('#navigator_bar_'+ this.layerId).height (this.make.load.series[this.serieIdCharged].totalCharging * this.make.load.series[this.serieIdCharged].multiplierPaddingNavigatorBar);
            $('#navigator_bar_index_'+ this.layerId).css({'top': (this.positionInSerie * this.make.load.series[this.serieIdCharged].multiplierPaddingNavigatorBar) +'px'});
            var canvas = new PIXI.CanvasBuffer (this.width, this.height);
            canvas.context.rect (0, 0, this.width, this.height);            
            if (this.make.negativeState) {
                canvas.context.fillStyle = 'rgba(255, 255, 255, 1)';
                $('#'+ this.layerId).css('background', '#FFF');
                this.dicomInformation.style = {font: '12px Arial', fill: '#000'};
                this.layerInformation.style = {font: '12px Arial', fill: '#000'};
            } else {
                canvas.context.fillStyle = 'rgba(0, 0, 0, 1)';
                $('#'+ this.layerId).css('background', '#000');
                this.dicomInformation.style = {font: '12px Arial', fill: '#FFF'};
                this.layerInformation.style = {font: '12px Arial', fill: '#FFF'};
            } 
            canvas.context.fill ();            
            var texture1 = PIXI.Texture.fromCanvas (canvas.canvas);
            this.transformationSprite.texture = texture1;
            this.filterSprite.texture = texture1;
            this.container.texture = texture1;
            if (this.resizeEnd) {
                this.transformationSprite.visible = true;                
                this.globalDown = {x: 0, y: 0};
                this.localDown = new PIXI.Point (0, 0);
                this.localDownTexture = new PIXI.Point (0, 0);
                this.globalMove = {x: 0, y: 0};
                this.scale = 1;
                this.ratio = 0;
                this.diffZoom = {x: 0, y: 0};
                this.pan = {x: 0, y: 0};
                this.diffPan = {x: 0, y: 0};
                this.rotation = 0;
                this.diffRotation = {x: 0, y: 0};
                this.__zooming ();
                this.__rotating ();
                this.__contextToLayerRatio (); 
                var event = new PIXI.interaction.InteractionData ();
                if (this.transformated) {
                    for (var i = 0; i < this.transformations.length; i++) {
                        var rendererScaleX = this.renderer.width / this.transformations[i].lastRendererWidth,
                            rendererScaleY = this.renderer.height / this.transformations[i].lastRendererHeight;
                        if (this.transformations[i].type === 'zoom') {
                            var globalPos = new PIXI.Point (this.transformations[i].globalDown.x * rendererScaleX, this.transformations[i].globalDown.y * rendererScaleY);
                            event.getLocalPosition (this.stage, this.globalDown, globalPos);
                            event.getLocalPosition (this.transformationSprite, this.localDown, globalPos); 
                            this.diffZoom.x = (this.globalDown.x - this.localDown.x);
                            this.diffZoom.y = (this.globalDown.y - this.localDown.y);
                            this.scale *= this.transformations[i].ratioAccumulated;
                            this.__zooming ();
                        } else if (this.transformations[i].type === 'pan') {
                            var globalPosDown = new PIXI.Point (this.transformations[i].globalDown.x * rendererScaleX, this.transformations[i].globalDown.y * rendererScaleY),
                                globalPosMove = new PIXI.Point (this.transformations[i].globalMove.x * rendererScaleX, this.transformations[i].globalMove.y * rendererScaleY);                     
                            event.getLocalPosition (this.stage, this.globalDown, globalPosDown);
                            event.getLocalPosition (this.stage, this.globalMove, globalPosMove);
                            event.getLocalPosition (this.transformationSprite, this.localDown, globalPosDown); 
                            this.diffPan.x = (this.globalDown.x - this.localDown.x);
                            this.diffPan.y = (this.globalDown.y - this.localDown.y); 
                            this.pan.x = (this.globalMove.x - this.globalDown.x);
                            this.pan.y = (this.globalMove.y - this.globalDown.y);
                            this.__panning ();
                        } else if (this.transformations[i].type === 'rotation') {
                            var globalPos = new PIXI.Point (this.transformations[i].globalDown.x * rendererScaleX, this.transformations[i].globalDown.y * rendererScaleY);
                            event.getLocalPosition (this.stage, this.globalDown, globalPos);
                            event.getLocalPosition (this.textureSprite, this.localDownTexture, globalPos); 
                            this.diffRotation.x = (this.globalDown.x - this.localDownTexture.x);
                            this.diffRotation.y = (this.globalDown.y - this.localDownTexture.y);
                            this.rotation = this.transformations[i].rotation;
                            this.__rotating ();
                        }                       
                    }                    
                }               
                this.resizeEnd = false;
            }
            this.__dicomLayerInformationConfiguration ();
        }             
    } else {        
        if (this.serieIdCharged !== null) {            
            if (this.resizeEnd) {                
                this.transformationSprite.visible = true;
                this.globalDown = {x: 0, y: 0};
                this.localDown = new PIXI.Point (0, 0);
                this.localDownTexture = new PIXI.Point (0, 0);
                this.lastScale = this.scale;
                this.scale = 1;
                this.ratio = 0;
                this.pan = {x: 0, y: 0};
                this.rotation = 0;
                this.diffZoom = {x: 0, y: 0};
                this.__mobileTransformations ();
                this.__contextToLayerRatio ();
                var event = new PIXI.interaction.InteractionData ();
                if (this.transformated) {
                    var rendererScaleX = this.renderer.width / this.transformations[0].lastRendererWidth,
                        rendererScaleY = this.renderer.height / this.transformations[0].lastRendererHeight;
                    var globalPos = new PIXI.Point (this.transformations[0].globalDown.x * rendererScaleX, this.transformations[0].globalDown.y * rendererScaleY);
                    event.getLocalPosition (this.stage, this.globalDown, globalPos);
                    event.getLocalPosition (this.transformationSprite, this.localDown, globalPos);
                    event.getLocalPosition (this.textureSprite, this.localDownTexture, globalPos); 
                    this.diffZoom.x = (this.globalDown.x - this.localDown.x);
                    this.diffZoom.y = (this.globalDown.y - this.localDown.y);
                    this.pan = this.transformations[0].pan;
                    this.scale = this.transformations[0].scale;
                    this.rotation = this.transformations[0].rotation;
                    this.__mobileTransformations ();                            
                }
                this.resizeEnd = false;
            }
            this.__dicomLayerInformationConfiguration ();
        } 
    }
};
/*
 * Gets a new ratio according to the size of context.
 * 
 * @memberof layer
 * @return scale {float}
 */
MIRROR.layer.prototype.__getResponsiveScale = function () {
    var imageWidth = this.make.load.series[this.serieIdCharged].dimensions[this.positionInSerie].columns,
        imageHeight = this.make.load.series[this.serieIdCharged].dimensions[this.positionInSerie].rows,
        rendererWidth = this.renderer.width,
        rendererHeight = this.renderer.height;
    if (imageWidth > imageHeight) {
        if (rendererWidth >= rendererHeight) {
            return (rendererHeight / imageHeight);
        } else if (rendererWidth < rendererHeight) {
            return (rendererWidth / imageWidth);
        }
    } else if (imageWidth < imageHeight) {
        if (rendererWidth >= rendererHeight) {
            return (rendererHeight / imageHeight);
        } else if (rendererWidth < rendererHeight) {
            return (rendererWidth / imageWidth);
        }
    } else if (imageWidth === imageHeight) {
        if (rendererWidth >= rendererHeight) {
            return (rendererHeight / imageHeight);
        } else if (rendererWidth < rendererHeight) {
            return (rendererWidth / imageWidth);
        }
    }
};
/*
 * Tools applied to the set when it finishes loading.
 * 
 * @memberof layer
 */
MIRROR.layer.prototype.__layerApplyTools = function () {
    if (this.make.negativeState) {
        this.negative ();
    }
    if (this.make.magnifyingGlassState) {
        this.magnifyingGlass ();
    }
    if (this.make.filmModeState) {
        this.filmMode ();
    }
    if (this.make.measuringSegmentState) {
        this.commonMeasuring ();
    }
    if (this.make.measuringAngleState) {
        this.commonMeasuring ();
    }
    if (this.make.measuringAreaState) {
        this.commonMeasuring ();
    }
    if (this.make.windowLevelPresetsDefaultState) {
        this.windowLevelPresets ('default');
    }
    if (this.make.windowLevelPresetsBoneState) {
        this.windowLevelPresets ('bone');
    }
    if (this.make.windowLevelPresetsAbdomenState) {
        this.windowLevelPresets ('abdomen');
    }
    if (this.make.windowLevelPresetsAngioState) {
        this.windowLevelPresets ('angio');
    }
    if (this.make.windowLevelPresetsBrainState) {
        this.windowLevelPresets ('brain');
    }
    if (this.make.windowLevelPresetsChestState) {
        this.windowLevelPresets ('chest');
    }
    if (this.make.windowLevelPresetsLungsState) {
        this.windowLevelPresets ('lungs');
    }
};
/*
 * Displays information of the set and the scene.
 * 
 * @memberof layer
 */
MIRROR.layer.prototype.dicomLayerInformation = function () {
    if (this.make.environment === 'desktop') {
        var dicomInformation = '';
        if (this.make.load.series[this.serieIdCharged].patientName !== null) {
            dicomInformation += MIRROR.language.dicomInformation['patient_name'] +': '+ this.make.load.series[this.serieIdCharged].patientName +'\n';
        }
        if (this.make.load.series[this.serieIdCharged].patientRut !== null) {
            dicomInformation += MIRROR.language.dicomInformation['dni_age'] +': '+ this.make.load.series[this.serieIdCharged].patientRut +'\n';
        }
        if (this.make.load.series[this.serieIdCharged].patientSex !== null) {
            dicomInformation += MIRROR.language.dicomInformation['sex'] +': '+ this.make.load.series[this.serieIdCharged].patientSex +'\n';
        }
        if (this.make.load.studyDescription !== null) {
            dicomInformation += MIRROR.language.dicomInformation['study_desc'] +': '+ this.make.load.studyDescription +'\n';
        }
        if (this.make.load.series[this.serieIdCharged].serieDescription !== null) {
            dicomInformation += MIRROR.language.dicomInformation['serie_desc'] +': '+ this.make.load.series[this.serieIdCharged].serieDescription +'\n';
        }
        if (this.make.load.series[this.serieIdCharged].serieBodyPart !== null) {
            dicomInformation += MIRROR.language.dicomInformation['body_part'] +': '+ this.make.load.series[this.serieIdCharged].serieBodyPart +'\n';
        }
        if (this.make.load.series[this.serieIdCharged].serieName !== null) {
            dicomInformation += MIRROR.language.dicomInformation['serie_name'] +': '+ this.make.load.series[this.serieIdCharged].serieName +'\n';
        }
        if (this.make.load.series[this.serieIdCharged].modality !== null) {
            dicomInformation += MIRROR.language.dicomInformation['modality'] +': '+ this.make.load.series[this.serieIdCharged].modality +'\n';
        }
        if (this.make.load.series[this.serieIdCharged].institution !== null) {
            dicomInformation += MIRROR.language.dicomInformation['institution'] +': '+ this.make.load.series[this.serieIdCharged].institution;      
        }
        if (this.dicomInformation !== null) {
            this.dicomInformation.text = dicomInformation;
        }        
        var layerInformation = '',
            contrastDecimals = 2;
        if (this.serieIdCharged !== null) {
            if (this.windowCenter !== null && this.windowWidth !== null) {
                layerInformation += 'WC: '+ (this.windowCenter).toFixed (2) +' / WW: '+ (this.windowWidth).toFixed (2) +'\n';
            } else {
                contrastDecimals = 5;
            }
        }        
        layerInformation += MIRROR.language.layerInformation['brightness'] +': '+ (this.brightness).toFixed (2) +' / '+ MIRROR.language.layerInformation['contrast'] +': '+ (this.contrast).toFixed (contrastDecimals) +'\n';
        layerInformation += MIRROR.language.layerInformation['scale'] +': '+ (this.scale).toFixed (2) +' / '+ MIRROR.language.layerInformation['angle'] +': '+ (this.rotation).toFixed (2) +' [rad]\n';
        layerInformation += MIRROR.language.layerInformation['images'] +': '+ (this.positionInSerie + 1) +' / '+ this.make.load.series[this.serieIdCharged].totalCharging +'\n';
        if (this.serieIdCharged !== null) {
            if (this.make.load.series[this.serieIdCharged].sliceThickness !== null && this.make.load.series[this.serieIdCharged].slicePosition.length > 4) {
                layerInformation += MIRROR.language.layerInformation['thickness'] +': '+ (this.make.load.series[this.serieIdCharged].sliceThickness).toFixed (2) +' [mm] / '+ MIRROR.language.layerInformation['slice_position'] +': '+ (this.make.load.series[this.serieIdCharged].slicePosition[this.positionInSerie]).toFixed (2) +' [mm]';
            }  
        } 
        if (this.layerInformation !== null) {
            this.layerInformation.text = layerInformation;  
        }
    } else {
        var dicomInformation = '';
        if (this.make.load.series[this.serieIdCharged].patientName !== null) {
            dicomInformation += MIRROR.language.dicomInformation['patient_name'] +': '+ this.make.load.series[this.serieIdCharged].patientName +'<br />';
        }
        if (this.make.load.series[this.serieIdCharged].patientRut !== null) {
            dicomInformation += MIRROR.language.dicomInformation['dni_age'] +': '+ this.make.load.series[this.serieIdCharged].patientRut +'<br />';
        }
        if (this.make.load.series[this.serieIdCharged].patientSex !== null) {
            dicomInformation += MIRROR.language.dicomInformation['sex'] +': '+ this.make.load.series[this.serieIdCharged].patientSex +'<br />';
        }
        if (this.make.load.studyDescription !== null) {
            dicomInformation += MIRROR.language.dicomInformation['study_desc'] +': '+ this.make.load.studyDescription +'<br />';
        }
        if (this.make.load.series[this.serieIdCharged].serieDescription !== null) {
            dicomInformation += MIRROR.language.dicomInformation['serie_desc'] +': '+ this.make.load.series[this.serieIdCharged].serieDescription +'<br />';
        }
        if (this.make.load.series[this.serieIdCharged].serieBodyPart !== null) {
            dicomInformation += MIRROR.language.dicomInformation['body_part'] +': '+ this.make.load.series[this.serieIdCharged].serieBodyPart +'<br />';
        }
        if (this.make.load.series[this.serieIdCharged].serieName !== null) {
            dicomInformation += MIRROR.language.dicomInformation['serie_name'] +': '+ this.make.load.series[this.serieIdCharged].serieName +'<br />';
        }
        if (this.make.load.series[this.serieIdCharged].modality !== null) {
            dicomInformation += MIRROR.language.dicomInformation['modality'] +': '+ this.make.load.series[this.serieIdCharged].modality +'<br />';
        }
        if (this.make.load.series[this.serieIdCharged].institution !== null) {
            dicomInformation += MIRROR.language.dicomInformation['institution'] +': '+ this.make.load.series[this.serieIdCharged].institution;      
        }
        $('#dicom_information_'+ this.layerId).html (dicomInformation);
        var layerInformation = '';
        if (this.serieIdCharged !== null) {
            if (this.windowCenter !== null && this.windowWidth !== null) {
                layerInformation += 'WC: '+ (this.windowCenter).toFixed (2) +' / WW: '+ (this.windowWidth).toFixed (2) +'<br />';
            }
        }  
        layerInformation += MIRROR.language.layerInformation['brightness'] +': '+ (this.brightnessCSS).toFixed (2) +' / '+ MIRROR.language.layerInformation['contrast'] +': '+ (this.contrastCSS).toFixed (2) +'<br />';
        layerInformation += MIRROR.language.layerInformation['scale'] +': '+ (this.scale).toFixed (2) +' / '+ MIRROR.language.layerInformation['angle'] +': '+ (this.rotation).toFixed (2) +' [rad]<br />';
        layerInformation += MIRROR.language.layerInformation['images'] +': '+ (this.positionInSerie + 1) +' / '+ this.make.load.series[this.serieIdCharged].totalCharging +'<br />';
        if (this.serieIdCharged !== null) {
            if (this.make.load.series[this.serieIdCharged].sliceThickness !== null && this.make.load.series[this.serieIdCharged].slicePosition.length > 4) {
                layerInformation += MIRROR.language.layerInformation['thickness'] +': '+ (this.make.load.series[this.serieIdCharged].sliceThickness).toFixed (2) +' [mm] / '+ MIRROR.language.layerInformation['slice_position'] +': '+ (this.make.load.series[this.serieIdCharged].slicePosition[this.positionInSerie]).toFixed (2) +' [mm]';
            } 
        }          
        $('#layer_information_'+ this.layerId).html (layerInformation);
    }
};
/*
 * Configure the position of the information panels.
 * 
 * @memberof layer
 */
MIRROR.layer.prototype.__dicomLayerInformationConfiguration = function () {
    if (this.stage !== null) {
        var rows = 3;
        if (this.make.load.series[this.serieIdCharged].sliceThickness !== null && this.make.load.series[this.serieIdCharged].slicePosition.length > 4) {
            rows++;
        }
        if (this.windowCenter !== null && this.windowWidth !== null) {
            rows++;
        }
        if (this.make.environment === 'desktop') {            
            if (this.height > 400) {
                this.container.addChild(this.dicomInformation);
                this.container.addChild(this.layerInformation);
            } else {
                this.container.removeChild(this.dicomInformation);
                this.container.removeChild(this.layerInformation);
            }
            if (rows === 5) {
                this.layerInformation.position.y = this.renderer.height - 80;
            } else if (rows === 4) {
                this.layerInformation.position.y = this.renderer.height - 62;
            } else if (rows === 3) {
                this.layerInformation.position.y = this.renderer.height - 52;
            }
        } else {
            if (rows === 5) {
                $('#layer_information_'+ this.layerId).css ('top', ($('#'+ this.layerId).height () - 65) +'px');
            } else if (rows === 4) {
                $('#layer_information_'+ this.layerId).css ('top', ($('#'+ this.layerId).height () - 55) +'px');
            } else if (rows === 3) {
                $('#layer_information_'+ this.layerId).css ('top', ($('#'+ this.layerId).height () - 45) +'px');
            }           
        }      
        this.displayDicomLayerInformation ();
    }     
};
/*
 * Configure the position of the index for navigator bar.
 * 
 * @memberof layer
 */
MIRROR.layer.prototype.displayDicomLayerInformation = function () {
    if (this.stage !== null) {
        if (this.make.environment === 'desktop') {
            if (this.make.infoState) {
                this.dicomInformation.visible = true;
                this.layerInformation.visible = true;
            } else {
                this.dicomInformation.visible = false;
                this.layerInformation.visible = false;
            }
        } else {
            if (this.make.infoState) {
                $('#dicom_information_'+ this.layerId).css ('display', 'block');
                $('#layer_information_'+ this.layerId).css ('display', 'block');
            } else {
                $('#dicom_information_'+ this.layerId).css ('display', 'none');
                $('#layer_information_'+ this.layerId).css ('display', 'none');
            }
        }      
    }    
};
/*
 * Generates DOM elements for the navigation bar.
 * 
 * @memberof layer
 * @return DOM string
 */
MIRROR.layer.prototype.navigatorBar = function () {
    var barPadding = 0,
        indexPadding = 0,
        index = 0,
        borderTop = 0,
        borderBotttom = 0;
    if (this.serieIdCharged !== null) {
        barPadding = this.make.load.series[this.serieIdCharged].totalCharging * this.make.load.series[this.serieIdCharged].multiplierPaddingNavigatorBar;
        indexPadding = this.make.load.series[this.serieIdCharged].multiplierPaddingNavigatorBar;
        if (indexPadding < 3) {
            borderTop = 2;
            borderBottom = 2;
        } else {
            borderTop = 0;
            borderBottom = 0;
        }
        index = this.positionInSerie * this.make.load.series[this.serieIdCharged].multiplierPaddingNavigatorBar;
    }
    if (this.make.environment !== 'portrait') {
        return ''+
            '<div id="navigator_bar_'+ this.layerId +'" style="position:relative; background: #A09F9F; width: 100%; height: '+ barPadding +'px;">'+
                '<div id="navigator_bar_index_'+ this.layerId +'" style="position: absolute; left: 0px; top: '+ index +'px; background: #F69322; width: 100%; height: '+ indexPadding +'px; border-top: '+ borderTop +'px solid #F69322; border-bottom: '+ borderBottom +'px solid #F69322;"></div>'+
            '</div>';
    } else {
        return ''+
            '<div id="navigator_bar_'+ this.layerId +'" style="position:relative; background: #A09F9F; height: 100%; width: '+ barPadding +'px;">'+
                '<div id="navigator_bar_index_'+ this.layerId +'" style="position: absolute; left: '+ index +'px; top: 0px; background: #F69322; width: '+ indexPadding +'px; height: 100%; border-left: '+ borderTop +'px solid #F69322; border-right: '+ borderBottom +'px solid #F69322;"></div>'+
            '</div>';
    }    
};
/*
 * Configure the position of the index for navigator bar.
 * 
 * @memberof layer
 */
MIRROR.layer.prototype.navigatorBarIndex = function () {
    if ($('#navigator_bar_index_'+ this.layerId).length > 0) {
        if (this.make.environment !== 'portrait') {
            $('#navigator_bar_index_'+ this.layerId).css({'top': (this.positionInSerie * this.make.load.series[this.serieIdCharged].multiplierPaddingNavigatorBar) +'px'});
        } else {
            $('#navigator_bar_index_'+ this.layerId).css({'left': (this.positionInSerie * this.make.load.series[this.serieIdCharged].multiplierPaddingNavigatorBar) +'px'});
        }                     
    }
};
/*
 * It generates and removes the magnifying glass.
 * 
 * @memberof layer
 */
MIRROR.layer.prototype.magnifyingGlass = function () {
    var t = this;
    if (t.selected && t.displayed && t.serieIdCharged !== null) {
        if (t.make.magnifyingGlassState) {
            var canvas = document.createElement ('canvas'),
                context = canvas.getContext ('2d'),
                layer = document.getElementById (t.layerId),
                snapshot = null,
                radio = 0,
                renderTexture = new PIXI.RenderTexture (t.renderer, t.renderer.width, t.renderer.height);
            canvas.setAttribute ('id', 'canvas_magnifying_glass_'+ t.layerId);
            layer.appendChild (canvas);
            canvas.width = t.renderer.width;
            canvas.height = t.renderer.height;
            canvas.style.zIndex = 100;
            canvas.style.position = 'absolute';
            canvas.style.left = '0px';
            canvas.style.top = '0px';        

            if (t.make.totalLayers === 1) {
                radio = 150;
            } else if (t.make.totalLayers === 2) {
                radio = 110;
            } else if (t.make.totalLayers === 3 && (t.layerId === 'layer_1' || t.layerId === 'layer_2')) {
                radio = 80;
            } else if (t.make.totalLayers === 3 && t.layerId === 'layer_3') {
                radio = 110;
            } else if (t.make.totalLayers === 4) {
                radio = 80;
            }
            $('#'+ t.layerId).on ('mousemove', function (event) {
                context.clearRect (0, 0, canvas.width, canvas.height);
                var x = event.clientX - $(this).offset().left,
                    y = event.clientY - $(this).offset().top;
                context.save ();
                context.beginPath ();
                context.arc (x, y, radio, 0, Math.PI * 2, true);
                context.fill ();
                context.lineWidth = 10;
                context.strokeStyle = '#D58512';
                context.stroke ();
                context.closePath ();
                context.clip ();
                renderTexture.render(t.filterSprite);
                snapshot = renderTexture.getCanvas ();                  
                context.drawImage (snapshot, -x * 2, -y * 2, t.renderer.width * 3, t.renderer.height * 3);
                context.beginPath ();
                context.arc (x, y, radio, 0, Math.PI * 2, true);
                context.lineWidth = 2;
                context.strokeStyle = '#D58512';
                context.stroke ();
                context.closePath ();
                context.restore ();
            });
        } else {
            $('#'+ t.layerId).unbind ('mousemove');
            $('#canvas_magnifying_glass_'+ t.layerId).remove ();            
        }       
    }
};
/*
 * It generates and removes the negative effect.
 * 
 * @memberof layer
 */
MIRROR.layer.prototype.negative = function () {
    if (this.selected && this.displayed && this.serieIdCharged !== null) {
        if (this.make.environment !== 'desktop') {
            if (this.make.negativeState) {
                this.negativeCSS = 1;
                $('#'+ this.layerId).css('background', '#FFF');
                $('#dicom_information_'+ this.layerId).css ('color', '#000');
                $('#layer_information_'+ this.layerId).css ('color', '#000');
            } else {
                this.negativeCSS = 0;
                $('#'+ this.layerId).css('background', '#000');
                $('#dicom_information_'+ this.layerId).css ('color', '#FFF');
                $('#layer_information_'+ this.layerId).css ('color', '#FFF');
            }
            $('#canvas_'+ this.layerId).css('-webkit-filter', 'contrast('+ this.contrastCSS +') brightness('+ this.brightnessCSS +') invert('+ this.negativeCSS +')');
        } else {
            this.__filtering ();
        }            
    }
};
/*
 * It generates and removes the film mode effect.
 * 
 * @memberof layer
 */
MIRROR.layer.prototype.filmMode = function () {    
    var t = this;
    if (this.selected && this.displayed && this.serieIdCharged !== null) {
        clearInterval (t.filmInterval);
        t.filmInterval = setInterval(function () {
            if (t.make.filmModeState) {
                t.moveInSerie (-1);
                if (t.positionInSerie >= (t.make.load.series[t.serieIdCharged].totalCharging - 1)) {
                    t.positionInSerie = 0;
                }
            } else {
                clearInterval (t.filmInterval);
            }      
        }, (t.make.load.series[t.serieIdCharged].frameTime !== null) ? t.make.load.series[t.serieIdCharged].frameTime : 50);
    }    
};
/*
 * It generates and removes the measuring tool.
 * 
 * @memberof layer
 */
MIRROR.layer.prototype.commonMeasuring = function () {
    if (this.selected && this.displayed && this.serieIdCharged !== null) {
        if (this.measuring === null) {
            this.measuring = new MIRROR.measuring (this);
        }
        if (this.make.measuringState) {
            this.measuring.findLastUndoneShapes ();
            this.measuring.initializedTriggered ();
        } else {
            $('#canvas_measuring_'+ this.layerId).unbind ('mousedown');
            $('#canvas_measuring_'+ this.layerId).unbind ('mousemove');
            $('#canvas_measuring_'+ this.layerId).unbind ('mouseup');
            $('#canvas_measuring_'+ this.layerId).unbind ('touchstart');
            $('#canvas_measuring_'+ this.layerId).unbind ('touchmove');
            $('#canvas_measuring_'+ this.layerId).unbind ('touchend');
            $('#canvas_measuring_'+ this.layerId).remove ();
            $('#'+ this.layerId +' h5').remove ();
            this.measuring = null;
        }        
    }    
};
/*
 * Applies the selected preset.
 * 
 * @memberof layer
 * @param preset {string}
 */
MIRROR.layer.prototype.windowLevelPresets = function (preset) {
    if (this.selected && this.displayed && this.serieIdCharged !== null) {
        if (this.make.load.series[this.serieIdCharged].windowWidth !== null && this.make.load.series[this.serieIdCharged].windowCenter !== null) {
            switch (preset) {
                case 'default':
                    this.windowWidth = this.make.load.series[this.serieIdCharged].windowWidth;
                    this.windowCenter = this.make.load.series[this.serieIdCharged].windowCenter;                
                    break;
                case 'bone':
                    this.windowWidth = 1500;
                    this.windowCenter = 300;                
                    break;
                case 'abdomen':
                    this.windowWidth = 400;
                    this.windowCenter = 60;
                    break;
                case 'angio':
                    this.windowWidth = 600;
                    this.windowCenter = 300;
                    break;
                case 'brain':
                    this.windowWidth = 80;
                    this.windowCenter = 40;
                    break;
                case 'chest':
                    this.windowWidth = 400;
                    this.windowCenter = 40;
                    break;
                case 'lungs':
                    this.windowWidth = 1500;
                    this.windowCenter = -400;
                    break;
            }
            this.brightness = (1 - (this.windowCenter / 255)) * 1;
            this.contrast = (1 - (this.windowWidth / 255)) * 1;
            this.__filtering ();
        }        
    }
};
/*
 * Leader all transformations are applied to the imitators.
 * 
 * @memberof layer
 * @param action {integer}: type of transformation
 * @param index {integer}: direction for move in the set
 */
MIRROR.layer.prototype.__transformsImitation = function (action, index) {    
    for (var layer in this.make.layers) {
        if (layer !== this.layerId && this.make.layers[layer].displayed && this.make.layers[layer].selected) {
            if (action === 1) {
                if (this.make.rotationState) {
                    this.make.layers[layer].globalDown = this.globalDown;
                    this.make.layers[layer].localDownTexture = this.localDownTexture;
                    this.make.layers[layer].diffRotation = this.diffRotation;
                    this.make.layers[layer].rotation += this.rotate;
                    this.make.layers[layer].__rotating ();
                    if (index === 'up') {
                        var globalDown = this.make.layers[layer].globalDown,
                            rotation = this.make.layers[layer].rotation,
                            rendererWidth = this.make.layers[layer].renderer.width,
                            rendererHeight = this.make.layers[layer].renderer.height;
                        var transformation = {
                            type: 'rotation',
                            globalDown: globalDown,
                            rotation: rotation,
                            lastRendererWidth: rendererWidth,
                            lastRendererHeight: rendererHeight
                        };
                        this.make.layers[layer].transformations.push (transformation);
                        this.make.layers[layer].transformated = true;
                    }               
                } else if (!this.make.rotationState) {                        
                    this.make.layers[layer].globalDown = this.globalDown;
                    this.make.layers[layer].globalMove = this.globalMove;
                    if (this.make.renderType === 'webgl') {
                        if (this.make.layers[layer].windowWidth !== null && this.make.layers[layer].windowCenter !== null) {
                            this.make.layers[layer].brightness += (this.globalMove.x - this.globalDown.x) / 100;
                            this.make.layers[layer].contrast += (this.globalMove.y - this.globalDown.y) / 100;
                            this.make.layers[layer].windowCenter = (1 - this.brightness / 1) * 255;
                            this.make.layers[layer].windowWidth = (1 - this.contrast / 1) * 255;
                        } else {
                            this.make.layers[layer].diffBrightness += this.make.layers[layer].globalMove.y - this.make.layers[layer].globalDown.y;
                            this.make.layers[layer].contrast += (this.make.layers[layer].globalMove.x - this.make.layers[layer].globalDown.x) / 100000;
                            this.make.layers[layer].brightness = 1 + Math.min (1000, Math.max (-150, this.make.layers[layer].diffBrightness)) / 150;
                            this.make.layers[layer].contrast = Math.max (1, Math.min (this.make.layers[layer].contrast, 10));
                        }  
                        this.make.layers[layer].brightness += (this.globalMove.x - this.globalDown.x) / 100;
                        this.make.layers[layer].contrast += (this.globalMove.y - this.globalDown.y) / 100;
                        this.make.layers[layer].windowCenter = (1 - this.brightness / 1) * 255;
                        this.make.layers[layer].windowWidth = (1 - this.contrast / 1) * 255; 
                    } else if (this.make.renderType === 'canvas2d') {
                        this.make.layers[layer].diffBrightness += this.make.layers[layer].globalMove.y - this.make.layers[layer].globalDown.y;
                        this.make.layers[layer].contrast += (this.make.layers[layer].globalMove.x - this.make.layers[layer].globalDown.x) / 10000;
                        this.make.layers[layer].brightness = 1 + Math.min (1000, Math.max (-150, this.make.layers[layer].diffBrightness)) / 150;
                        this.make.layers[layer].contrast = Math.max (1, Math.min (this.make.layers[layer].contrast, 10));
                    }                        
                    this.make.layers[layer].__filtering ();
                }                       
            } else if (action === 2) {
                this.make.layers[layer].globalDown = this.globalDown;
                this.make.layers[layer].localDown = this.localDown;
                this.make.layers[layer].globalMove = this.globalMove;
                this.make.layers[layer].pan = this.pan;
                this.make.layers[layer].diffPan = this.diffPan;
                this.make.layers[layer].__panning ();
                if (index === 'up') {
                    var globalDown = this.make.layers[layer].globalDown,
                        globalMove = this.make.layers[layer].globalMove,
                        rendererWidth = this.make.layers[layer].renderer.width,
                        rendererHeight = this.make.layers[layer].renderer.height;
                    var transformation = {
                        type: 'pan',
                        globalDown: globalDown,
                        globalMove: globalMove,
                        lastRendererWidth: rendererWidth,
                        lastRendererHeight: rendererHeight
                    };
                    this.make.layers[layer].transformations.push (transformation);
                    this.make.layers[layer].transformated = true;
                }            
            } else if (action === 3) {
                this.make.layers[layer].globalDown = this.globalDown;
                this.make.layers[layer].localDown = this.localDown;
                this.make.layers[layer].diffZoom = this.diffZoom;
                this.make.layers[layer].scale = this.scale;
                this.make.layers[layer].ratioAccumulated = this.ratioAccumulated;
                this.make.layers[layer].__zooming ();
                if (index === 'up') {
                    var globalDown = this.make.layers[layer].globalDown,
                        ratioAccumulated = this.make.layers[layer].ratioAccumulated,
                        rendererWidth = this.make.layers[layer].renderer.width,
                        rendererHeight = this.make.layers[layer].renderer.height;
                    var transformation = {
                        type: 'zoom',
                        globalDown: globalDown,
                        ratioAccumulated: ratioAccumulated,
                        lastRendererWidth: rendererWidth,
                        lastRendererHeight: rendererHeight
                    };
                    this.make.layers[layer].transformations.push (transformation);
                    this.make.layers[layer].transformated = true;
                    this.make.layers[layer].ratioAccumulated = 1;
                }                    
            } else if (action === 4) {
                this.make.layers[layer].moveInSerie (index);
            } else if (action === 5) {
                this.make.layers[layer].globalDown.x = this.globalDown.x;
                this.make.layers[layer].globalDown.y = this.globalDown.y;
                this.make.layers[layer].globalMove.x = this.globalMove.x;
                this.make.layers[layer].globalMove.y = this.globalMove.y;
                this.make.layers[layer].deltaFilter.x += (this.make.layers[layer].globalMove.x - this.make.layers[layer].globalDown.x) / 100;
                this.make.layers[layer].deltaFilter.y += (this.make.layers[layer].globalMove.y - this.make.layers[layer].globalDown.y) / 100;
                this.make.layers[layer].contrastCSS = Math.max (1, Math.min (this.make.layers[layer].deltaFilter.x, 10));
                this.make.layers[layer].brightnessCSS = Math.max (0, Math.min (this.make.layers[layer].deltaFilter.y, 10));
                $('#canvas_'+ layer).css('-webkit-filter', 'contrast('+ this.make.layers[layer].contrastCSS +') brightness('+ this.make.layers[layer].brightnessCSS +') invert('+ this.make.layers[layer].negativeCSS +')');
                this.make.layers[layer].dicomLayerInformation ();
            } else if (action === 6) {
                this.make.layers[layer].globalDown = this.globalDown;
                this.make.layers[layer].localDown = this.localDown;
                this.make.layers[layer].localDownTexture = this.localDownTexture;
                this.make.layers[layer].globalMove = this.globalMove;
                this.make.layers[layer].diffZoom = this.diffZoom;
                this.make.layers[layer].pan = this.pan;
                this.make.layers[layer].scale = this.scale; 
                this.make.layers[layer].lastScale = this.lastScale; 
                this.make.layers[layer].rotation = this.rotation;
                this.make.layers[layer].rotate = this.rotate;  
                this.make.layers[layer].__mobileTransformations ();
                if (index === 'end') {
                    var globalDown = this.make.layers[layer].globalDown,
                        rotation = this.make.layers[layer].rotation,
                        rotate = this.make.layers[layer].rotate,
                        pan = this.make.layers[layer].pan,
                        scale = this.make.layers[layer].scale,
                        lastScale = this.make.layers[layer].lastScale,
                        rendererWidth = this.make.layers[layer].renderer.width,
                        rendererHeight = this.make.layers[layer].renderer.height;
                    var transformation = {
                        globalDown: globalDown,
                        rotation: rotation,
                        rotate: rotate,
                        pan: pan,
                        scale: scale,
                        lastScale: lastScale,
                        lastRendererWidth: rendererWidth,
                        lastRendererHeight: rendererHeight
                    };
                    this.make.layers[layer].transformations[0] = transformation;
                    this.make.layers[layer].transformated = true;
                }
            }            
        }
    }
};
/*
 * Transformations made by the mouse.
 * 
 * @memberof layer
 */
MIRROR.layer.prototype.__transformsEventsHandler = function () {
    var t = this;
    if (t.make.environment === 'desktop') {
        t.stage.off ('mousedown');
        t.stage.off ('mouseup');
        t.stage.off ('rightdown');
        t.stage.off ('rightup');
        t.stage.on ('mousedown', t.__downActions);        
        t.stage.on ('mouseup', t.__upActions);
        t.stage.on ('rightdown', t.__downActions);
        t.stage.on ('rightup', t.__upActions);
    } else {
        t.stage.off ('touchstart');
        t.stage.off ('touchend');
        t.stage.on ('touchstart', t.__touchStartActions);
        t.stage.on ('touchend', t.__touchEndActions); 
        var element = document.getElementById('canvas_'+ t.layerId);        
        t.hammerManager = new Hammer.Manager(element);
        t.hammerManager.add(new Hammer.Rotate({threshold: 0}));
        t.hammerManager.add(new Hammer.Pinch({threshold: 0})).recognizeWith(t.hammerManager.get('rotate'));
        t.hammerManager.off ('pinchstart pinchmove pinchend');
        t.hammerManager.on ('pinchstart pinchmove', function (ev) {
            t.scale = Math.max(0.1, Math.min(t.lastScale * ev.scale, 100));
        });
        t.hammerManager.on ('pinchend', function () {                   
            t.lastScale = t.scale;
        });
        t.hammerManager.off ('rotatestart rotatemove rotateend');
        t.hammerManager.on ('rotatestart rotatemove', function (ev) { 
            t.rotation = t.rotate + (ev.rotation / 100);
        });
        t.hammerManager.on ('rotateend', function () { 
            t.rotate = t.rotation;
        });           
    }      
};
/*
 * Mouse down actions.
 * 
 * @memberof layer
 * @param event {object}.
 */
MIRROR.layer.prototype.__downActions = function (event) {
    var t = this.layer;
    if (t.make.hounsfieldState && t.hounsfield.isSomeToolSelected() ) {
        t.hounsfield.__pressAction(event);
        return;
    }
    // Left Button Pressed
    if (event.data.originalEvent.which === 1 && t.selected) {
        if (t.make.rotationState) {
            t.globalDown = event.data.getLocalPosition (this); 
            t.localDownTexture = event.data.getLocalPosition (t.textureSprite);  
            t.lastY = event.data.getLocalPosition (this).y;
            t.diffRotation.x = (t.globalDown.x - t.localDownTexture.x);
            t.diffRotation.y = (t.globalDown.y - t.localDownTexture.y);
        } else {
            t.globalDown = event.data.getLocalPosition (this);
        }
        t.eventWhich = 1;
    } else if (event.data.originalEvent.which === 2 && t.selected) {
        t.globalDown = event.data.getLocalPosition (this); 
        t.localDown = event.data.getLocalPosition (t.transformationSprite);            
        t.diffPan.x = (t.globalDown.x - t.localDown.x);
        t.diffPan.y = (t.globalDown.y - t.localDown.y);
        t.eventWhich = 2;
    } else if (event.data.originalEvent.which === 3 && t.selected) {
        t.globalDown = event.data.getLocalPosition (this); 
        t.localDown = event.data.getLocalPosition (t.transformationSprite);
        t.lastY = event.data.getLocalPosition (this).y;
        t.diffZoom.x = (t.globalDown.x - t.localDown.x);
        t.diffZoom.y = (t.globalDown.y - t.localDown.y);
        t.eventWhich = 3;
    }
    this.on ('mousemove', t.__moveActions);
};
/*
 * Mouse move actions.
 * 
 * @memberof layer
 * @param event {object}.
 */
MIRROR.layer.prototype.__moveActions = function (event) {
    var t = this.layer;
    if (t.eventWhich === 1 && t.selected) {
        if (t.make.rotationState) {
            var y = event.data.getLocalPosition (this).y;
            t.rotate = (y - t.lastY) / 200;
            t.rotation += t.rotate;
            if (t.make.imitationLayers && t.leadImitation) {
                t.__transformsImitation (1);
            }
            t.__rotating ();
            t.lastY = y;
        } else {
            t.globalMove = event.data.getLocalPosition (this);                    
            if (t.make.renderType === 'webgl') {
                if (t.windowWidth !== null && t.windowCenter !== null) {
                    t.brightness += (t.globalMove.x - t.globalDown.x) / 100;
                    t.contrast += (t.globalMove.y - t.globalDown.y) / 100;
                    t.windowCenter = (1 - t.brightness / 1) * 255;
                    t.windowWidth = (1 - t.contrast / 1) * 255;
                } else {
                    t.diffBrightness += t.globalMove.y - t.globalDown.y;
                    t.contrast += (t.globalMove.x - t.globalDown.x) / 100000;
                    t.brightness = 1 + Math.min (1000, Math.max (-150, t.diffBrightness)) / 150;
                    t.contrast = Math.max (1, Math.min (t.contrast, 10));
                }               
            } else if (t.make.renderType === 'canvas2d' && t.make.environment === 'desktop') {
                t.diffBrightness += t.globalMove.y - t.globalDown.y;
                t.contrast += (t.globalMove.x - t.globalDown.x) / 100;
                t.brightness = 1 + Math.min (1000, Math.max (-150, t.diffBrightness)) / 150;
                t.contrast = Math.max (1, Math.min (t.contrast, 10));
            }            
            if (t.make.imitationLayers && t.leadImitation) {
                t.__transformsImitation (1);
            }
            t.__filtering ();
            t.globalDown.x = t.globalMove.x;
            t.globalDown.y = t.globalMove.y;
        }
    } else if (t.eventWhich === 2 && t.selected) {
        t.globalMove = event.data.getLocalPosition (this);
        t.pan.x = (t.globalMove.x - t.globalDown.x);
        t.pan.y = (t.globalMove.y - t.globalDown.y);                
        if (t.make.imitationLayers && t.leadImitation) {
            t.__transformsImitation (2);
        }
        t.__panning ();      
    } else if (t.eventWhich === 3 && t.selected) {
        var y = event.data.getLocalPosition (this).y;
        var delta = Math.abs(y - t.lastY) / 1000;
        if (t.lastY > y) {
            t.ratio = 1.03 + delta;
        } else {
            t.ratio = 0.97 - delta;
        }
        t.scale *= t.ratio;
        t.ratioAccumulated *= t.ratio;
        if (t.make.imitationLayers && t.leadImitation) {
            t.__transformsImitation (3);
        }
        t.__zooming ();
        t.lastY = y;
    }  
};
/*
 * Mouse up actions.
 * 
 * @memberof layer
 * @param event {object}.
 */
MIRROR.layer.prototype.__upActions = function (event) {
    var t = this.layer;
    this.off ('mousemove', t.__moveActions);
    if (t.make.hounsfieldState && t.hounsfield.isSomeToolSelected()) {
        t.hounsfield.__releaseAction(event);
        return;
    }
    if (event.data.originalEvent.which === 1 && t.selected) {
        var globalDown = t.globalDown,
            rotation = t.rotation,
            rendererWidth = t.renderer.width,
            rendererHeight = t.renderer.height;
        var transformation = {
            type: 'rotation',
            globalDown: globalDown,
            rotation: rotation,
            lastRendererWidth: rendererWidth,
            lastRendererHeight: rendererHeight
        };
        t.transformations.push (transformation);
        t.transformated = true;
        if (t.make.imitationLayers && t.leadImitation) {
            t.__transformsImitation (1, 'up');
        }
    } else if (event.data.originalEvent.which === 2 && t.selected) {
        var globalDown = t.globalDown,
            globalMove = t.globalMove,
            rendererWidth = t.renderer.width,
            rendererHeight = t.renderer.height;
        var transformation = {
            type: 'pan',
            globalDown: globalDown,
            globalMove: globalMove,
            lastRendererWidth: rendererWidth,
            lastRendererHeight: rendererHeight
        };
        t.transformations.push (transformation);
        t.transformated = true;
        if (t.make.imitationLayers && t.leadImitation) {
            t.__transformsImitation (2, 'up');
        }
    } else if (event.data.originalEvent.which === 3 && t.selected) {
        var globalDown = t.globalDown,
            ratioAccumulated = t.ratioAccumulated,
            rendererWidth = t.renderer.width,
            rendererHeight = t.renderer.height;
        var transformation = {
            type: 'zoom',
            globalDown: globalDown,
            ratioAccumulated: ratioAccumulated,
            lastRendererWidth: rendererWidth,
            lastRendererHeight: rendererHeight
        };
        t.transformations.push (transformation);
        t.transformated = true;
        if (t.make.imitationLayers && t.leadImitation) {
            t.__transformsImitation (3, 'up');
        }
        t.ratioAccumulated = 1;
    }
};
/*
 * Touch start actions.
 * 
 * @memberof layer
 * @param event {object}.
 */
MIRROR.layer.prototype.__touchStartActions = function (event) {
    var t = this.layer;
    if (t.make.hounsfieldState && t.hounsfield.isSomeToolSelected() ) {
        t.hounsfield.__pressAction(event);
        return;
    }
    switch (event.data.originalEvent.touches.length) {
        case 1:
            t.globalDown.x = event.data.originalEvent.touches[0].pageX;
            t.globalDown.y = event.data.originalEvent.touches[0].pageY;            
            break;
        case 2:            
            var touchDown = {},
                touch_0 = new PIXI.Point (),
                touch_1 = new PIXI.Point ();
            t.renderer.plugins.interaction.mapPositionToPoint (touch_0, event.data.originalEvent.touches[0].pageX, event.data.originalEvent.touches[0].pageY);
            t.renderer.plugins.interaction.mapPositionToPoint (touch_1, event.data.originalEvent.touches[1].pageX, event.data.originalEvent.touches[1].pageY);
            touchDown.x = (touch_0.x + touch_1.x) / 2;
            touchDown.y = (touch_0.y + touch_1.y) / 2;   
            event.data.getLocalPosition (this, t.globalDown, touchDown);                    
            event.data.getLocalPosition (t.transformationSprite, t.localDown, touchDown); 
            event.data.getLocalPosition (t.textureSprite, t.localDownTexture, touchDown); 
            t.diffZoom.x = (t.globalDown.x - t.localDown.x);
            t.diffZoom.y = (t.globalDown.y - t.localDown.y);
            t.eventWhich = 2;
            break;
        case 3: 
            t.globalDown.x = event.data.originalEvent.touches[1].pageX;
            t.globalDown.y = event.data.originalEvent.touches[1].pageY;
            break;
    }
    this.on ('touchmove', t.__touchMoveActions);
};
/*
 * Touch move actions.
 * 
 * @memberof layer
 * @param event {object}.
 */
MIRROR.layer.prototype.__touchMoveActions = function (event) {
    var t = this.layer;
    switch (event.data.originalEvent.touches.length) {
        case 1:
            t.globalMove.x = event.data.originalEvent.touches[0].pageX;
            t.globalMove.y = event.data.originalEvent.touches[0].pageY;
            t.deltaFilter.x += (t.globalMove.x - t.globalDown.x) / 100;
            t.deltaFilter.y += (t.globalMove.y - t.globalDown.y) / 100;
            t.contrastCSS = Math.max (1, Math.min (t.deltaFilter.x, 10));
            t.brightnessCSS = Math.max (0, Math.min (t.deltaFilter.y, 10));
            if (t.make.imitationLayers && t.leadImitation) {
                t.__transformsImitation (5);
            }
            $('#canvas_'+ t.layerId).css('-webkit-filter', 'contrast('+ t.contrastCSS +') brightness('+ t.brightnessCSS +') invert('+ t.negativeCSS +')');
            t.dicomLayerInformation ();
            t.globalDown.x = t.globalMove.x;
            t.globalDown.y = t.globalMove.y;
            break;
        case 2: 
            var touchMove = {},
                touch_0 = new PIXI.Point (),
                touch_1 = new PIXI.Point ();
            t.renderer.plugins.interaction.mapPositionToPoint (touch_0, event.data.originalEvent.touches[0].pageX, event.data.originalEvent.touches[0].pageY);
            t.renderer.plugins.interaction.mapPositionToPoint (touch_1, event.data.originalEvent.touches[1].pageX, event.data.originalEvent.touches[1].pageY);
            touchMove.x = (touch_0.x + touch_1.x) / 2;
            touchMove.y = (touch_0.y + touch_1.y) / 2;      
            event.data.getLocalPosition (this, t.globalMove, touchMove); 
            t.pan.x = (t.globalMove.x - t.globalDown.x);
            t.pan.y = (t.globalMove.y - t.globalDown.y);
            if (t.make.imitationLayers && t.leadImitation) {
                t.__transformsImitation (6);
            }
            t.__mobileTransformations ();
            t.eventWhich = 2;
            break;
        case 3: 
            t.globalMove.x = event.data.originalEvent.touches[1].pageX;
            t.globalMove.y = event.data.originalEvent.touches[1].pageY;
            var deltaY = t.globalMove.y - t.globalDown.y,
                index = null;
            if (deltaY < 0) {
                index = 1;
                t.moveInSerie (index); 
            } else if (deltaY > 0) {
                index = -1;
                t.moveInSerie (index);
            }
            if (t.make.imitationLayers && t.leadImitation) {
                t.__transformsImitation (4, index);
            }
            t.globalDown.y = t.globalMove.y;
            break;
    }    
};
/*
 * Touch end actions.
 * 
 * @memberof layer
 * @param event {object}.
 */
MIRROR.layer.prototype.__touchEndActions = function (event) {
    var t = this.layer;
    this.off ('touchmove');
    if (t.make.hounsfieldState && t.hounsfield.isSomeToolSelected()) {
        t.hounsfield.__releaseAction(event);
        return;
    }
    if (t.eventWhich === 2) {
        var globalDown = t.globalDown,
            rotation = t.rotation,
            pan = t.pan,
            scale = t.scale,
            rendererWidth = t.renderer.width,
            rendererHeight = t.renderer.height;
        var transformation = {
            globalDown: globalDown,
            rotation: rotation,
            pan: pan,
            scale: scale,
            lastRendererWidth: rendererWidth,
            lastRendererHeight: rendererHeight
        };
        t.transformations[0] = transformation;
        t.transformated = true;
        if (t.make.imitationLayers && t.leadImitation) {
            t.__transformsImitation (6, 'end');
        }
    }
    t.eventWhich = 0;
};
/*
 * Common events. Mouse wheel and drop set.
 * 
 * @memberof layer
 */
MIRROR.layer.prototype.__commonEventsHandler = function () {
    var t = this;
    $('#'+ t.layerId).unbind ('mousewheel');
    $('#'+ t.layerId).on ('mousewheel', function (event) {
        // if a hounsfield tool is selected, the mousewheel event does nothing
        if (t.make.hounsfieldState && t.hounsfield.isSomeToolSelected()) {
            return;
        } else if (!t.make.measuringState && !t.hounsfield.isSomeToolSelected()) {
            if ($('#canvas_'+ t.layerId).length > 0) {
                t.moveInSerie (event.deltaY);
                if (t.make.imitationLayers && t.leadImitation) {
                    t.__transformsImitation (4, event.deltaY);
                }
            }  
        }              
    }); 
    $('#'+ t.layerId).droppable({
        drop: function (event, ui) {
            t.make.attachSerieToLayer (t.layerId, ui.draggable.get(0).id);          
        }
    });
};
/*
 * Moving in serie. Change the texture of the context.
 * 
 * @memberof layer
 * @param deltaY {integer}: direction to move in the set.
 * @param position {integer}
 */
MIRROR.layer.prototype.moveInSerie = function (deltaY, position) {
    var t = this,
        ratioPosition = t.make.load.series[t.serieIdCharged].multiplierPaddingNavigatorBar,
        index = 0,
        positionInSerie = (position === undefined) ? null : (position / ratioPosition).toFixed(0);
    if (t.serieIdCharged !== null) {
        if (deltaY === -1) {
            if (t.positionInSerie < (t.make.load.series[t.serieIdCharged].totalCharging - 1)) {
                if (position !== undefined && positionInSerie !== null && positionInSerie < (t.make.load.series[t.serieIdCharged].totalCharging - 1) && positionInSerie > 0) {
                    t.positionInSerie = positionInSerie - 1;
                } else if (position === undefined) {
                    t.positionInSerie++;
                }
            }
            index = 1;
        } else if (deltaY === 1) {
            if (t.positionInSerie > 0) {
                if (position !== undefined && positionInSerie !== null && positionInSerie < (t.make.load.series[t.serieIdCharged].totalCharging - 1) && positionInSerie > 0) {
                    t.positionInSerie = positionInSerie - 1; 
                } else if (position === undefined) {
                    t.positionInSerie--;
                }        
            }                
            index = -1;
        } 
        if (t.make.load.series[t.serieIdCharged].serie[t.positionInSerie] !== undefined) {
            var texture = new PIXI.Texture (t.make.load.series[t.serieIdCharged].serie[t.positionInSerie]);                    
            t.textureSprite.texture = texture;
            if (!t.make.load.series[t.serieIdCharged].allSameDimensions) {
                t.resizeEnd = true;
                t.responsiveLayer (t.renderer.width, t.renderer.height);
            }            
        }             
        if (t.make.renderType === 'canvas2d' && t.make.environment === 'desktop') {
            t.__filtering ();
        } 
        if ($('#navigator_bar_index_'+ t.layerId).length > 0) {
            if (position !== undefined) {
                var positionIndex = 0;
                if (((positionInSerie - 1) * ratioPosition) < 0) {
                    positionIndex = 0;
                } else if (((positionInSerie - 1) * ratioPosition) > ((t.make.load.series[t.serieIdCharged].totalCharging - 1) * t.make.load.series[t.serieIdCharged].multiplierPaddingNavigatorBar)) {
                    positionIndex = (t.make.load.series[t.serieIdCharged].totalCharging - 1) * t.make.load.series[t.serieIdCharged].multiplierPaddingNavigatorBar;
                } else {
                    positionIndex = (positionInSerie - 1) * ratioPosition;
                }
                if (t.make.environment !== 'portrait') {
                    $('#navigator_bar_index_'+ t.layerId).css({'top': positionIndex +'px'});
                } else {                    
                    $('#navigator_bar_index_'+ t.layerId).css({'left': positionIndex +'px'});
                }                
            } else {
                if (t.make.environment !== 'portrait') {
                    $('#navigator_bar_index_'+ t.layerId).css({'top': (t.positionInSerie * t.make.load.series[t.serieIdCharged].multiplierPaddingNavigatorBar) +'px'});
                } else {
                    $('#navigator_bar_index_'+ t.layerId).css({'left': (t.positionInSerie * t.make.load.series[t.serieIdCharged].multiplierPaddingNavigatorBar) +'px'});
                }                
            }      
        }
        t.dicomLayerInformation ();
        t.__movingLocalizer ();
    }     
};
/*
 * Adding localizer to stage.
 * 
 * @memberof layer
 */
MIRROR.layer.prototype.addLocalizer = function (layer) {
    if (this.serieIdCharged !== null && this.make.layers[layer].serieIdCharged !== null && this.make.totalLayers > 1 && this.layerId !== layer) {
        if ((this.make.load.series[this.make.layers[layer].serieIdCharged].orientationPlane === 'coronal' || this.make.load.series[this.make.layers[layer].serieIdCharged].orientationPlane === 'sagittal') && 
            (this.make.load.series[this.serieIdCharged].frameOfReferenceUID === this.make.load.series[this.make.layers[layer].serieIdCharged].frameOfReferenceUID) && 
            (this.make.load.series[this.serieIdCharged].orientationPlane !== 'coronal' && this.make.load.series[this.serieIdCharged].orientationPlane !== 'sagittal') &&
            (this.make.load.series[this.serieIdCharged].charged) && 
            (this.make.load.series[this.serieIdCharged].numberOfFrames === 0)) {
            if (this.make.layers[layer].localizer === null) {
                this.make.layers[layer].localizer = new PIXI.Graphics ();       
                this.make.layers[layer].textureSprite.addChild (this.make.layers[layer].localizer);
            }
            this.make.layers[layer].localizer.beginFill(0x00FF00);
            this.make.layers[layer].localizer.drawRect(0, 0, this.make.layers[layer].textureSprite.width, 2);   
            this.make.layers[layer].localizer.position.y = this.__coordinatesLocalizer (layer);                        
        } else {
            this.removeLocalizer (layer);
        }       
    } else {
        this.removeLocalizer (layer);
    }    
};
/*
 * Removing localizer from stage.
 * 
 * @memberof layer
 */
MIRROR.layer.prototype.removeLocalizer = function (layer) {
    if (layer === undefined) {
        if (this.serieIdCharged !== null && this.stage !== null && this.localizer !== null) {
            this.textureSprite.removeChild (this.localizer);
            this.localizer = null;  
        }        
    } else {
        if (this.make.layers[layer].serieIdCharged !== null && this.make.layers[layer].renderer !== null && this.make.layers[layer].localizer !== null) {
            this.make.layers[layer].textureSprite.removeChild (this.make.layers[layer].localizer);
            this.make.layers[layer].localizer = null;  
        }        
    }    
};
/*
 * Moving localizer on scout.
 * 
 * @memberof layer
 */
MIRROR.layer.prototype.__movingLocalizer = function () {
    for (var layer in this.make.layers) {
        if (layer !== this.layerId) {
            if (this.make.layers[layer].localizer !== null && this.make.layers[layer].serieIdCharged !== null) {
                this.make.layers[layer].localizer.position.y = this.__coordinatesLocalizer (layer);                
            }            
        }
    }
};
/*
 * Calcule the position of the slice on localizer image.
 * 
 * @memberof layer
 */
MIRROR.layer.prototype.__coordinatesLocalizer = function (layer) {
    var src_pos_x = this.make.load.series[this.serieIdCharged].imagePositionPatient[0],
        src_pos_y = this.make.load.series[this.serieIdCharged].imagePositionPatient[1],
        src_pos_z = this.make.load.series[this.serieIdCharged].slicePosition[this.positionInSerie];
    var src_col_dircos_x = this.make.load.series[this.serieIdCharged].imageOrientationPatient[3],
        src_col_dircos_y = this.make.load.series[this.serieIdCharged].imageOrientationPatient[4],
        src_col_dircos_z = this.make.load.series[this.serieIdCharged].imageOrientationPatient[5];
    var src_col_length = this.make.load.series[this.serieIdCharged].dimensions[this.positionInSerie].columns * this.make.load.series[this.serieIdCharged].pixelSpacing;
    var dst_pos_x = this.make.load.series[this.make.layers[layer].serieIdCharged].imagePositionPatient[0],
        dst_pos_y = this.make.load.series[this.make.layers[layer].serieIdCharged].imagePositionPatient[1],
        dst_pos_z = this.make.load.series[this.make.layers[layer].serieIdCharged].imagePositionPatient[2];
    var dst_col_dircos_x = this.make.load.series[this.make.layers[layer].serieIdCharged].imageOrientationPatient[3],
        dst_col_dircos_y = this.make.load.series[this.make.layers[layer].serieIdCharged].imageOrientationPatient[4],
        dst_col_dircos_z = this.make.load.series[this.make.layers[layer].serieIdCharged].imageOrientationPatient[5];
    var pos_top_x = src_pos_x,
        pos_top_y = src_pos_y,
        pos_top_z = src_pos_z;
    var pos_bottom_x = src_pos_x + src_col_dircos_x * src_col_length,
        pos_bottom_y = src_pos_y + src_col_dircos_y * src_col_length,
        pos_bottom_z = src_pos_z + src_col_dircos_z * src_col_length;    
    pos_top_x -= dst_pos_x;
    pos_top_y -= dst_pos_y;
    pos_top_z -= dst_pos_z;
    pos_bottom_x -= dst_pos_x;
    pos_bottom_y -= dst_pos_y;
    pos_bottom_z -= dst_pos_z;
    var dst_pos_top_y = dst_col_dircos_x * pos_top_x + dst_col_dircos_y * pos_top_y + dst_col_dircos_z * pos_top_z,
        dst_pos_bottom_y = dst_col_dircos_x * pos_bottom_x + dst_col_dircos_y * pos_bottom_y + dst_col_dircos_z * pos_bottom_z,
        pos_localizer = (dst_pos_top_y + dst_pos_bottom_y) / 2;
    return parseInt((pos_localizer / this.make.load.series[this.make.layers[layer].serieIdCharged].pixelSpacing + 0.5).toFixed (0));    
};
/*
 * Scale to the mouse pointer.
 * 
 * @memberof layer
 */
MIRROR.layer.prototype.__zooming = function () {
    this.transformationSprite.scale.x = this.scale;
    this.transformationSprite.scale.y = this.scale;
    this.transformationSprite.position.x = -this.localDown.x * (this.scale - 1) + this.diffZoom.x;
    this.transformationSprite.position.y = -this.localDown.y * (this.scale - 1) + this.diffZoom.y;
    this.transformationSprite.updateTransform ();
    this.dicomLayerInformation ();   
};
/*
 * Moves to the mouse pointer.
 * 
 * @memberof layer
 */
MIRROR.layer.prototype.__panning = function () {
    this.transformationSprite.position.x = this.pan.x + this.diffPan.x - this.localDown.x * (this.scale - 1);
    this.transformationSprite.position.y = this.pan.y + this.diffPan.y - this.localDown.y * (this.scale - 1);
    this.transformationSprite.updateTransform ();
};
/*
 * Rotates to the mouse pointer.
 * 
 * @memberof layer
 */
MIRROR.layer.prototype.__rotating = function () {
    this.textureSprite.pivot.x = -this.localDownTexture.x;
    this.textureSprite.pivot.y = -this.localDownTexture.y;
    this.textureSprite.rotation = this.rotation;
    this.textureSprite.pivot.x = this.localDownTexture.x;
    this.textureSprite.pivot.y = this.localDownTexture.y;
    this.transformationSprite.position.x = this.localDownTexture.x + this.diffRotation.x;
    this.transformationSprite.position.y = this.localDownTexture.y + this.diffRotation.y;
    this.textureSprite.updateTransform ();
    this.transformationSprite.updateTransform ();
    this.dicomLayerInformation ();
};
/*
 * Transformations for mobile devices.
 * 
 * @memberof layer
 */
MIRROR.layer.prototype.__mobileTransformations = function () {    
    this.transformationSprite.scale.x = this.scale;
    this.transformationSprite.scale.y = this.scale;
    this.transformationSprite.position.x = this.pan.x + this.diffZoom.x - this.localDown.x * (this.scale - 1);
    this.transformationSprite.position.y = this.pan.y + this.diffZoom.y - this.localDown.y * (this.scale - 1);  
    this.textureSprite.pivot.x = -this.localDownTexture.x;
    this.textureSprite.pivot.y = -this.localDownTexture.y;
    this.textureSprite.rotation = this.rotation;
    this.textureSprite.pivot.x = this.localDownTexture.x;
    this.textureSprite.pivot.y = this.localDownTexture.y;
    this.pivotSprite.position.x = this.localDown.x;
    this.pivotSprite.position.y = this.localDown.y;
    this.transformationSprite.updateTransform ();
    this.textureSprite.updateTransform ();
    this.pivotSprite.updateTransform ();
    this.dicomLayerInformation ();   
};
/*
 * Applies filters to the scene.
 * 
 * @memberof layer
 */
MIRROR.layer.prototype.__filtering = function () {
    var t = this;    
    if (t.make.renderType === 'webgl') {
        var negative = null;
        if (t.make.negativeState) {
            negative = 1.0;
            if (t.make.environment === 'desktop') {
                t.dicomInformation.style = {font: '12px Arial', fill: '#000'};
                t.layerInformation.style = {font: '12px Arial', fill: '#000'};
            }            
        } else {
            negative = 0.0;
            if (t.make.environment === 'desktop') {
                t.dicomInformation.style = {font: '12px Arial', fill: '#FFF'};
                t.layerInformation.style = {font: '12px Arial', fill: '#FFF'};
            }            
        }
        if (t.windowWidth !== null && t.windowCenter !== null) {
            var shader = new PIXI.AbstractFilter (
                null, 
                MIRROR.filter['shader_fragment_windowLevel'], 
                {
                    'uLowerBound': {'type': '1f', 'value': t.make.load.series[t.serieIdCharged].lowerBound},
                    'uUpperBound': {'type': '1f', 'value': t.make.load.series[t.serieIdCharged].upperBound},
                    'uNegative': {'type': '1f', 'value': negative},
                    'uBrightness': {'type': '1f', 'value': t.brightness},
                    'uContrast': {'type': '1f', 'value': t.contrast}
                }
            );
        } else {
            var multiplier = t.brightness * t.contrast,
                adder = -t.contrast * 128 + 128,
                shader = new PIXI.AbstractFilter (
                    null, 
                    MIRROR.filter['shader_fragment_brightnessContrast'], 
                    {
                        'uNegative': {'type': '1f', 'value': negative},
                        'uMultiplier': {'type': '1f', 'value': multiplier},
                        'uAdder': {'type': '1f', 'value': adder}
                    }
                );
        }        
        t.filterSprite.filters = [shader]; 
    } else if (t.make.renderType === 'canvas2d') {
        var multiplier = t.brightness * t.contrast,
            adder = -t.contrast * 128 + 128,
            canvas = new PIXI.CanvasBuffer (t.renderer.width, t.renderer.height);
        canvas.context.drawImage (t.make.load.series[t.serieIdCharged].serie[t.positionInSerie].source, 0, 0, t.make.load.series[t.serieIdCharged].serie[t.positionInSerie].source.width, t.make.load.series[t.serieIdCharged].serie[t.positionInSerie].height);
        var pixelsData = canvas.context.getImageData (0, 0, canvas.width, canvas.height);
        for (var i = 0; i < pixelsData.data.length; i += 4) {            
            pixelsData.data[i] = pixelsData.data[i] * multiplier + adder;
            pixelsData.data[i + 1] = pixelsData.data[i + 1] * multiplier + adder;
            pixelsData.data[i + 2] = pixelsData.data[i + 2] * multiplier + adder;         
            if (pixelsData.data[i] > 255) {                    
                pixelsData.data[i] = 255;
            } else if (pixelsData.data[i] < 0) {
                pixelsData.data[i] = 0;
            }            
            if (pixelsData.data[i + 1] > 255) { 
                pixelsData.data[i + 1] = 255;
            } else if (pixelsData.data[i + 1] < 0) {
                pixelsData.data[i + 1] = 0;
            }             
            if (pixelsData.data[i + 2] > 255) {
                pixelsData.data[i + 2] = 255;
            } else if (pixelsData.data[i + 2] < 0) {
                pixelsData.data[i + 2] = 0;
            }
            if (t.make.negativeState) {
                pixelsData.data[i] = 255 - pixelsData.data[i];
                pixelsData.data[i + 1] = 255 - pixelsData.data[i + 1];
                pixelsData.data[i + 2] = 255 - pixelsData.data[i + 2];
            }
        }
        canvas.context.putImageData (pixelsData, 0, 0);
        var texture = new PIXI.Texture.fromCanvas (canvas.canvas);
        t.textureSprite.texture = texture;
        var canvas = new PIXI.CanvasBuffer (t.renderer.width, t.renderer.height);
        canvas.context.rect (0, 0, t.renderer.width, t.renderer.height);            
        if (t.make.negativeState) {
            canvas.context.fillStyle = 'rgba(255, 255, 255, 1)';
            $('#'+ t.layerId).css('background', '#FFF');
            if (t.make.environment === 'desktop') {
                t.dicomInformation.style = {font: '12px Arial', fill: '#000'};
                t.layerInformation.style = {font: '12px Arial', fill: '#000'};
            }            
        } else {
            canvas.context.fillStyle = 'rgba(0, 0, 0, 1)';
            $('#'+ t.layerId).css('background', '#000');
            if (t.make.environment === 'desktop') {
                t.dicomInformation.style = {font: '12px Arial', fill: '#FFF'};
                t.layerInformation.style = {font: '12px Arial', fill: '#FFF'};
            }            
        } 
        canvas.context.fill ();            
        var texture = PIXI.Texture.fromCanvas (canvas.canvas);
        t.transformationSprite.texture = texture;
        t.filterSprite.texture = texture;
        t.container.texture = texture; 
    }    
    t.dicomLayerInformation ();
};
/*
 * Displays the scene on screen.
 * 
 * @memberof layer
 */
MIRROR.layer.prototype.render = function () {
    this.renderer.render(this.stage);
};

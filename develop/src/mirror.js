/**
 * @file        Main class of the MIRROR STANDARD application
 * @author      Toth Limitada <contacto@toth.cl>
 * @copyright   2015 Toth Limitada
 * @license     {@link http://www.toth.cl}
 */

/**
 * @namespace MIRROR
 */

/* global LANGUAGE, UI, FILTER */

"use strict";

var MIRROR = MIRROR || {};
/*
 * MIRROR STANDARD version.
 */
MIRROR.version = '2.0.4';
/*
 * MIRROR STANDARD release date.
 */
MIRROR.releaseDate = '2015-07-29';
/*
 * Copyright date.
 */
MIRROR.copyrightDate = new Date().getFullYear();
/*
 * Language.
 */
MIRROR.language = LANGUAGE;
/*
 * DOM templates.
 */
MIRROR.ui = UI;
/*
 * Webgl filters.
 */
MIRROR.filter = FILTER;
/*
 * Interaction and configuration core.
 *
 * @class
 * @memberof MIRROR
 * @param studyId {string}: unique ID for the study.
 */
MIRROR.maker = function (studyId) {    
    this.studyId = studyId;
    /*
     * Object containing the contexts.
     *
     * @member object
     */
    this.layers = {};
    /*
     * Loader object.
     *
     * @member object
     */
    this.load = null;
    /*
     * Render type.
     *
     * @member string {webgl|canvas2d}
     */
    this.renderType = null;
    /*
     * Environment type.
     *
     * @member string {desktop|landscape|portrait}
     */
    this.environment = null;
    /*
     * Device type.
     *
     * @member string
     */
    this.device = null;
    /*
     * Browser type.
     *
     * @member string
     */
    this.browser = null;
    /*
     * Orientation mode.
     *
     * @member string {landscape|portrait}
     */
    this.orientation = null;
    /*
     * Image buttons.
     * 
     * @member object
     */
    this.buttons = {};
    /*
     * When the device is smartphone.
     *
     * @member boolean
     */
    this.isPhone = false;
    /*
     * Count when the browser starts resized.
     *
     * @member integer
     */
    this.resizeStart = 0;
    /*
     * Total number of contexts.
     *
     * @member integer
     */
    this.maxTotalLayers = 4;
    /*
     * Total number of contexts displayed.
     *
     * @member integer
     */
    this.totalLayers = 1;
    /*
     * Imitation tool state {active|inactive}.
     *
     * @member boolean
     */
    this.imitationLayers = false;
    /*
     * Thumbnails for each series for mobile.
     *
     * @member array
     */
    this.thumbnails = [];
    /*
     * Context selection tool state {active|inactive}.
     *
     * @member boolean
     */
    this.layersStatus = false;
    /*
     * Thumbnails selection tool state {active|inactive}.
     *
     * @member boolean
     */
    this.thumbnailsSeriesState = false;
    /*
     * Rotation tool state {active|inactive}.
     *
     * @member boolean
     */
    this.rotationState = false;
    /*
     * Window level presets selection tool state {active|inactive}.
     *
     * @member boolean
     */
    this.windowLevelPresetsState = false;
    /*
     * Window level default tool state {active|inactive}.
     *
     * @member boolean
     */
    this.windowLevelPresetsDefaultState = false;
    /*
     * Window level bone tool state {active|inactive}.
     *
     * @member boolean
     */
    this.windowLevelPresetsBoneState = false;
    /*
     * Window level abdomen tool state {active|inactive}.
     *
     * @member boolean
     */
    this.windowLevelPresetsAbdomenState = false;
    /*
     * Window level angio tool state {active|inactive}.
     *
     * @member boolean
     */
    this.windowLevelPresetsAngioState = false;
    /*
     * Window level brain tool state {active|inactive}.
     *
     * @member boolean
     */
    this.windowLevelPresetsBrainState = false;
    /*
     * Window level chest tool state {active|inactive}.
     *
     * @member boolean
     */
    this.windowLevelPresetsChestState = false;
    /*
     * Window level lungs tool state {active|inactive}.
     *
     * @member boolean
     */
    this.windowLevelPresetsLungsState = false;
    /*
     * Magnifying glass tool state {active|inactive}.
     *
     * @member boolean
     */
    this.magnifyingGlassState = false;
    /*
     * Negative tool state {active|inactive}.
     *
     * @member boolean
     */
    this.negativeState = false;
    /*
     * Film mode tool state {active|inactive}.
     *
     * @member boolean
     */
    this.filmModeState = false;
    /*
     * Measuring selection tool state {active|inactive}.
     *
     * @member boolean
     */
    this.measuringState = false;
    /*
     * Measuring segment tool state {active|inactive}.
     *
     * @member boolean
     */
    this.measuringSegmentState = false;
    /*
     * Measuring angle tool state {active|inactive}.
     *
     * @member boolean
     */
    this.measuringAngleState = false;
    /*
     * Measuring area tool state {active|inactive}.
     *
     * @member boolean
     */
    this.measuringAreaState = false;
    /*
     * Measuring hounsfield selection tool state {active|inactive}.
     *
     * @member boolean
     */
    this.hounsfieldState = false;
    /*
     * Mail state. 
     * 
     * @member boolean
     */
    this.mailState = false;
    /*
     * Reports state. 
     * 
     * @member boolean
     */
    this.reportsState = false;
    /*
     * Counter for loading study message in mobile devices. 
     *
     * @member integer
     */
    this.loadingStudyCounterMobile = 0;
    /*
     * Measuring type
     * 
     * @member string {segment|angle|area}
     */
    this.measuringTool = 'segment';
    /*
     * State for display layer information.
     * 
     * @member boolean
     */
    this.infoState = true;
    /*
     * Submenu content.
     * 
     * @member boolean
     */
    this.submenuContent = null;
    /*
     * Modal content.
     * 
     * @member boolean
     */
    this.modalContent = null;
    /*
     * Hammer object for gestures.
     * 
     * @member object        
     */
    this.hammerManager = null;
};
/*
 * Layer/Context/Desktop/Scene that displays images.
 *
 * @class
 * @memberof MIRROR
 * @param make {object}: maker object.
 * @param layerId {string}: unique ID for the context.
 */
MIRROR.layer = function (make, layerId) {
    this.make = make;
    this.layerId = layerId;
    /*
     * Size of the context.
     *
     * @member integer
     */
    this.width = 0;
    this.height = 0;
    /*
     * When the browser window resized finishes.
     *
     * @member boolean
     */
    this.resizeEnd = true;
    /*
     * When the context is active it is displayed.
     *
     * @member boolean
     */
    this.displayed = false;
    /*
     * When the context is selected.
     *
     * @member boolean
     */
    this.selected = false;
    /*
     * When the context is leading other contexts.
     *
     * @member boolean
     */
    this.leadImitation = false;
    /*
     * Set ID appended to context.
     *
     * @member string
     */
    this.serieIdCharged = null;
    /*
     * Image position within the set.
     *
     * @member integer
     */
    this.positionInSerie = 0;
    /*
     * PIXI.Renderer.
     * 
     * @member PIXI object
     */
    this.renderer = null; 
    /*
     * PIXI.Container.
     *
     * @member PIXI object
     */
    this.stage = null;
    /*
     * PIXI.renderer
     *
     * @member PIXI object
     */
    this.renderer = null;
    /*
     * PIXI.Sprite who contains all other sprites.
     * 
     * @member PIXI object
     */
    this.container = null;
    /*
     * PIXI.Sprite where filters are applied.
     *
     * @member PIXI object
     */    
    this.filterSprite = null;   
    /*
     * PIXI.Sprite where transformations are applied.
     *
     * @member PIXI object
     */    
    this.transformationSprite = null;   
    /*
     * PIXI.Sprite who record the pivot point for rotation.
     *
     * @member PIXI object
     */
    this.pivotSprite = null;
    /*
     * PIXI.Sprite where textures are applied.
     * 
     * @member PIXI object
     */
    this.textureSprite = null;
    /*
     * PIXI.Sprite for localizer.
     *
     * @member PIXI object
     */
    this.localizer = null;     
    /*
     * Displays information from dicom file.
     *
     * @member PIXI object|DOM object
     */
    this.dicomInformation = null;
    /*
     * Displays scene information.
     *
     * @member PIXI object|DOM object
     */
    this.layerInformation = null;
    /*
     * Records the mouse button for mouse move event.
     * 
     * @member integer
     */
    this.eventWhich = 0;
    /*
     * Records the position of the mouse on the scene by pressing the button.
     *
     * @member object
     */
    this.globalDown = {x: 0, y: 0};
    /*
     * Records the position of the mouse in the transformed coordinates of the scene.
     *
     * @member object
     */
    this.localDown = {x: 0, y: 0};
    this.localDownTexture = {x: 0, y: 0};
    /*
     * Records the position when the mouse moves in the scene with the button pressed.
     *
     * @member object
     */
    this.globalMove = {x: 0, y: 0};
    /*
     * Records the transformations made.
     *
     * @member array
     */
    this.transformations = [];
    /*
     * When a transformation was made by the mouse.
     *
     * @member boolean
     */
    this.transformated = false;
    /*
     * Last scale for mobile.
     *
     * @member float
     */
    this.lastScale = 1;
    /*
     * Last scale for responsive system.
     *
     * @member float
     */
    this.lastResponsiveScale = 1;
    /*
     * The scene transformed scale.
     *
     * @member float
     */
    this.scale = 1;
    /*
     * Ratio to apply the scale.
     *
     * @member float
     */
    this.ratio = 0;
    /*
     * Accumulated ratio for responsive system.
     *
     * @member float
     */
    this.ratioAccumulated = 1;
    /*
     * Last accumulated ratio for responsive system.
     * 
     * @member float
     */
    this.lastRatioAccumulated = 1;
    /*
     * Difference between global and local positions for zoom.
     *
     * @member object
     */
    this.diffZoom = {x: 0, y: 0};
    /*
     * Difference between globalMove and globalDown positions.
     *
     * @member object
     */
    this.pan = {x: 0, y: 0};
    /*
     * Difference between global and local positions for pan.
     *
     * @member object
     */
    this.diffPan = {x: 0, y: 0};
    /*
     * The scene transformed rotation.
     *
     * @member float
     */
    this.rotation = 0;
    /*
     * Rotation ratio.
     *
     * @member float
     */
    this.rotate = 0;
    /*
     * Difference between global and local positions for rotation.
     *
     * @member object
     */
    this.diffRotation = {x: 0, y: 0};
    /*
     * Delta for CSS filters
     * 
     * @member object
     */
    this.deltaFilter = {x: 1, y: 1};
    /*
     * Brightness ratio
     *
     * @member float
     */
    this.brightness = 1;
    /*
     * @member float
     */
    this.diffBrightness = 0;
    /*
     * Contrast ratio
     *
     * @member float
     */
    this.contrast = 1;
    /*
     * CSS brightness ratio
     *
     * @member float
     */
    this.brightnessCSS = 1;
    /*
     * CSS contrast ratio
     *
     * @member float
     */
    this.contrastCSS = 1;
    /*
     * CSS negative ratio
     *
     * @member integer
     */
    this.negativeCSS = 0;
    /*
     * Window width ratio
     *
     * @member integer
     */
    this.windowWidth = null;
    /*
     * Window center ratio
     *
     * @member integer
     */
    this.windowCenter = null;
    /*
     * Measuring object
     *
     * @member object
     */
    this.measuring = null;
    /*
     * Hounsfield object
     *
     * @member object
     */
    this.hounsfield = null;
    /*
     * Support variable
     *
     * @member float|integer
     */
    this.lastY = 0;
    /*
     * Hammer object for gestures.
     * 
     * @member object        
     */
    this.hammerManager = null;
    /*
     * Interval object for film tool.
     * 
     * @member interval        
     */
    this.filmInterval = null;
};
/*
 * Object that records all data from a set.
 *
 * @class
 * @memberof MIRROR
 * @param make {object}: maker object.
 * @param studyId {string}: unique ID for the study.
 */
MIRROR.loader = function (make, studyId) {
    this.make = make;
    this.studyId = studyId;
    /*
     * Study description from dicom file.
     *
     * @member string
     */
    this.studyDescription = null;
    /*
     * Logged if the study is loaded.
     *
     * @member boolean
     */
    this.studyCharged = false;
    /*
     * Total number of sets in the study.
     *
     * @member integer
     */
    this.totalSeries = 0;
    /*
     * Total number of series loaded.
     *
     * @member integer
     */
    this.totalSeriesCharged = 0;
    /*
     * Lock of series selection for mobile.
     *
     * @member boolean
     */
    this.blockAttachSerieMobile = false;
    /*
     * Records all the study series.
     *
     * @member object
     */
    this.series = {};
    /*
     * Charging interval for mobile.
     *
     * @member interval
     */
    this.intervalChargeSerie = null;
    /*
     * Charging state.
     * 
     * @member boolean
     */
    this.charging = false;
    /*
     * Tail order for charge series.
     * 
     * @member array
     */
    this.tailCharging = [];
};
/*
 * Object that records all data for a set.
 *
 * @class
 * @memberof MIRROR
 * @param load {object}: loader object.
 * @param serieId {string}: unique ID for the set.
 * @param pixelSpacing {float|string}: pixel spacing from dicom file.
 * @param windowWidth {float|string}: window width from dicom file.
 * @param windowCenter {float|string}: window center from dicom file.
 * @param rescaleSlope {float|string}: rescale slope from dicom file.
 * @param rescaleIntercept {float|string}: rescale instercept from dicom file.
 * @param dimensions {array}: columns and rows from dicom file.
 * @param rows {integer|string}: image height from dicom file.
 * @param reports {object}: reports from dicom file.
 * @param patientName {string}: patient name from dicom file.
 * @param patientRut {string}: patient DNI from dicom file.
 * @param patientSex {string}: patient sex from dicom file.
 * @param serieName {string}: serie name from dicom file.
 * @param institution {string}: institution name from dicom file.
 * @param serieBodyPart {string}: body part name from dicom file.
 * @param serieDescription {string}: serie description from dicom file.
 * @param modality {string}: modality from dicom file.
 * @param sliceThickness {float}: slice thickness from dicom file.
 * @param frameOfReferenceUID {string}: frame of reference UID from dicom file.
 * @param totalElements {integer}: total number of dicom files.
 * @param modality {string}: modality from dicom file. 
 * @param bitsStored {integer}: bitsStored from dicom file.
 * @param numberOfFrames {integer}: numberOfFrames from dicom file.
 * @param frameTime {float}: frameTime from dicom file.
 */
MIRROR.serie = function (load, serieId, pixelSpacing, windowWidth, windowCenter, rescaleSlope, rescaleIntercept, dimensions, reports, patientName, patientRut, patientSex, 
                        serieName, institution, serieBodyPart, serieDescription, modality, sliceThickness, frameOfReferenceUID, totalElements, bitsStored, numberOfFrames, 
                        frameTime) {
    this.load = load;
    this.serieId = serieId;
    this.pixelSpacing = (pixelSpacing === undefined || pixelSpacing === '' || pixelSpacing === null) ? null : parseFloat(pixelSpacing);
    this.windowWidth = (windowWidth === undefined || windowWidth === '' || windowWidth === null) ? null : parseFloat(windowWidth);
    this.windowCenter = (windowCenter === undefined || windowCenter === '' || windowCenter === null) ? null : parseFloat(windowCenter);
    this.rescaleSlope = (rescaleSlope === undefined || rescaleSlope === '' || rescaleSlope === null) ? null : parseFloat(rescaleSlope);
    this.rescaleIntercept = (rescaleIntercept === undefined || rescaleIntercept === '' || rescaleIntercept === null) ? null : parseFloat(rescaleIntercept);
    this.lowerBound = (this.windowWidth !== null && this.windowCenter !== null) ? ((this.windowWidth * (-0.5)) + this.windowCenter) : null;
    this.upperBound = (this.windowWidth !== null && this.windowCenter !== null) ? ((this.windowWidth * 0.5) + this.windowCenter) : null;
    this.dimensions = (dimensions === undefined || dimensions === '' || dimensions === null || dimensions.length === 0) ? null : dimensions;
    this.reports = (reports === undefined || reports === '' || reports === null) ? null : reports;
    this.patientName = (patientName === undefined || patientName === '' || patientName === null) ? null : patientName;
    this.patientRut = (patientRut === undefined || patientRut === '' || patientRut === null) ? null : patientRut;
    this.patientSex = (patientSex === undefined || patientSex === '' || patientSex === null) ? null : patientSex;
    this.serieName = (serieName === undefined || serieName === '' || serieName === null) ? null : serieName;
    this.institution = (institution === undefined || institution === '' || institution === null) ? null : institution;
    this.serieBodyPart = (serieBodyPart === undefined || serieBodyPart === '' || serieBodyPart === null) ? null : serieBodyPart;
    this.serieDescription = (serieDescription === undefined || serieDescription === '' || serieDescription === null) ? null : serieDescription;
    this.modality = (modality === undefined || modality === '' || modality === null) ? null : modality;
    this.sliceThickness = (sliceThickness === undefined || sliceThickness === '' || sliceThickness === null) ? null : parseFloat(sliceThickness);
    this.frameOfReferenceUID = (frameOfReferenceUID === undefined || frameOfReferenceUID === '' || frameOfReferenceUID === null) ? null : frameOfReferenceUID;
    this.totalElements = (totalElements === undefined || totalElements === '' || totalElements === null) ? null : totalElements;
    this.bitsStored = (bitsStored === undefined || bitsStored === '' || bitsStored === null) ? null : parseInt(bitsStored);
    this.numberOfFrames = (numberOfFrames === undefined || numberOfFrames === '' || numberOfFrames === null) ? null : parseInt(numberOfFrames);
    this.frameTime = (frameTime === undefined || frameTime === '' || frameTime === null) ? null : parseFloat(frameTime);
    /*
     * Object that records the image orientation patient from dicom file.
     *
     * @member array
     */
    this.imageOrientationPatient = [];
    /*
     * Object that records the normal vector.
     *
     * @member array
     */
    this.normalVector = {};
    /*
     * Object that records the image position patient from dicom file.
     *
     * @member array
     */
    this.imagePositionPatient = [];
    /*
     * Orientation plane of the set.
     *
     * @member string {axial|coronal|sagittal}
     */
    this.orientationPlane = null;
    /*
     * Direction of the image position patient from dicom file.
     *
     * @member integer {1|-1}
     */
    this.imagePositionPatientDirection = null;
    /*
     * Record the space between slices.
     *
     * @member float
     */
    this.spaceBetweenSlices = null;
    /*
     * Object that records the slice position.
     *
     * @member array
     */
    this.slicePosition = [];
    /*
     * Object that records the textures for each image.
     *
     * @member array
     */
    this.serie = [];
    /*
     * Object that records the url of each image.
     *
     * @member array
     */
    this.imagesURL = [];
    /*
     * Object that records the path of each dicom file.
     *
     * @member array
     */
    this.dicomsPath = [];
    /*
     * Object that records the frame on the image within the dicom file (used for multiframes).
     *
     * @member array
     */
    this.imagesFrame = [];
    /*
     * Logged if the set is still charging.
     *
     * @member boolean
     */
    this.charging = false;
    /*
     * Logged if the set is loaded.
     *
     * @member boolean
     */
    this.charged = false;
    /*
     * Logged if the series is loaded with errors.
     *
     * @member boolean
     */
    this.chargedWithError = false;
    /*
     * Record the total number of images loaded.
     *
     * @member integer
     */
    this.totalCharging = 0;
    /*
     * Record the total number of images loaded with errors.
     *
     * @member integer
     */
    this.totalChargingWithError = 0;
    /*
     * Space between each image to the navigation bar.
     *
     * @member integer
     */
    this.multiplierPaddingNavigatorBar = 0;
    /*
     * Space between each image to the navigation bar.
     *
     * @member integer
     */
    this.allSameDimensions = false;
};
/*
 * Measuring tool to calculate segments, angles and areas.
 *
 * @class
 * @memberof MIRROR
 * @param layer {object}: context where it is applied the measure.
 */
MIRROR.measuring = function (layer) {
    this.layer = layer;
    /*
     * Temporary canvas to show the calculations.
     *
     * @member DOM object
     */
    this.canvas = document.createElement ('canvas');
    this.canvas.setAttribute ('id', 'canvas_measuring_'+ this.layer.layerId);
    this.canvas.width = this.layer.renderer.width;
    this.canvas.height = this.layer.renderer.height;
    this.canvas.style.zIndex = 100;
    this.canvas.style.position = 'absolute';
    this.canvas.style.left = '0px';
    this.canvas.style.top = '0px';
    this.context = this.canvas.getContext ('2d');
    /*
     * Object that records a calculation.
     *
     * @memberof measuring
     * @member object
     * @param points {array}: calculation points.
     * @param done {boolean}: flag that records the end of the calculation.
     * @param calcule [integer}: stores the calculation.
     * @param type {string {segment|angle|area}}: type of calculation.
     * @param making {boolean}: flag that recorded if still doing measurement.
     */
    this.shape = function () {
        this.points = [];
        this.done = false;
        this.calcule = 0;
        this.type = null;
        this.making = false;
    };
    /*
     * Object that records each calculation that is made.
     *
     * @member array
     */
    this.shapes = [];
    /*
     * Current point.
     *
     * @member object
     */
    this.point = false;
    this.down = false;
};
/*
 * Measuring hounsfield units tool to calculate points, circles, ellipses and polygons.
 *
 * @class
 * @memberof MIRROR
 * @param layer {object}: context where it is applied the measure.
 */
MIRROR.hounsfield = function(layer){
    this.layer = layer;
    this.TOOL = {
        NONE: 0,
        POINT: 1,
        ELIPSE: 2,
        POLYGON: 3
    };
    this.selectedTool = this.TOOL.NONE;
    this.shapes = [];
    this.currentShape = null;
    this.selectedPoint = null;

    this.initialize();
};

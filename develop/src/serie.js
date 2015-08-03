/**
 * @file        Functions of the serie class
 * @author      Toth Limitada <contacto@toth.cl>
 * @copyright   2015 Toth Limitada
 * @license     {@link http://www.toth.cl}
 */

/**
 * @namespace MIRROR
 */

/* global MIRROR */

/*
 * Check if all dimensions are equals.
 * 
 * @memberof serie
 */
MIRROR.serie.prototype.checkAllSameDimensions = function () {
    var countEquals = 0;
    for (var i = 0; i < this.dimensions.length; i++) {
        if (this.dimensions[0].columns === this.dimensions[i].columns && this.dimensions[0].rows === this.dimensions[i].rows) {
            countEquals++;
        }
    }
    if (countEquals === this.dimensions.length) {
        this.allSameDimensions = true;
    } else {
        this.allSameDimensions = false;
    }
};
/*
 * Records the url and dicom path of the images.
 * 
 * @memberof serie
 * @param imagesURL {array}
 * @param dicomsPath {array}
 */
MIRROR.serie.prototype.setParametersToEachElement = function (imagesURL, dicomsPath, imagesFrame) {
    for (var i = 0; i < imagesURL.length; i++) {
        this.imagesURL[i] = imagesURL[i];
        this.dicomsPath[i] = dicomsPath[i];
        this.imagesFrame[i] = imagesFrame[i];
        if (this.orientationPlane !== null && this.imageOrientationPatient.length === 6 && this.imagePositionPatient.length === 3) {
            if (this.orientationPlane === 'axial') {
                this.slicePosition[i] = this.normalVector.x * this.imagePositionPatient[0] + this.normalVector.y * this.imagePositionPatient[1] + this.normalVector.z * (this.imagePositionPatient[2] + (i * this.spaceBetweenSlices * this.imagePositionPatientDirection));
            } else if (this.orientationPlane === 'sagittal') {
                this.slicePosition[i] = this.normalVector.x * (this.imagePositionPatient[0] + (i * this.spaceBetweenSlices * this.imagePositionPatientDirection)) + this.normalVector.y * this.imagePositionPatient[1] + this.normalVector.z * this.imagePositionPatient[2];
            } else if (this.orientationPlane === 'coronal') {
                this.slicePosition[i] = this.normalVector.x * this.imagePositionPatient[0] + this.normalVector.y * (this.imagePositionPatient[1] + (i * this.spaceBetweenSlices * this.imagePositionPatientDirection)) + this.normalVector.z * this.imagePositionPatient[2];
            }    
        }            
    }
};
/*
 * Records the image orientation patient of the dicom files.
 * 
 * @memberof serie
 * @param imageOrientationPatient {array}
 */
MIRROR.serie.prototype.setImageOrientationPatient = function (imageOrientationPatient) {
    if (imageOrientationPatient !== null && imageOrientationPatient.length === 6) {
        for (var i = 0; i < imageOrientationPatient.length; i++) {
            this.imageOrientationPatient[i] = (imageOrientationPatient[i] === undefined || imageOrientationPatient[i] === '' || imageOrientationPatient[i] === null) ? null : parseFloat(imageOrientationPatient[i]);
        }
        this.__setNormalVector ();
        this.__setOrientationPlane ();
    }    
};
/*
 * Records the normal vector.
 * 
 * @memberof serie
 */
MIRROR.serie.prototype.__setNormalVector = function () {
    this.normalVector.x = this.imageOrientationPatient[1] * this.imageOrientationPatient[5] - this.imageOrientationPatient[2] * this.imageOrientationPatient[4];
    this.normalVector.y = this.imageOrientationPatient[2] * this.imageOrientationPatient[3] - this.imageOrientationPatient[0] * this.imageOrientationPatient[5];
    this.normalVector.z = this.imageOrientationPatient[0] * this.imageOrientationPatient[4] - this.imageOrientationPatient[1] * this.imageOrientationPatient[3];
};
/*
 * Set the orientation plane of the serie.
 * 
 * @memberof serie
 * @param imageOrientationPatient {array}
 */
MIRROR.serie.prototype.__setOrientationPlane = function () {
    var a = parseFloat((this.imageOrientationPatient[0]).toFixed (0)),
        b = parseFloat((this.imageOrientationPatient[1]).toFixed (0)),
        f = parseFloat((this.imageOrientationPatient[5]).toFixed (0));
    if ((a === 1 || a === -1) && (f === 1 || f === -1)) {
        this.orientationPlane = 'coronal';
    } else if ((b === 1 || b === -1) && (f === 1 || f === -1)) {
        this.orientationPlane = 'sagittal';
    } else {
        this.orientationPlane = 'axial';
    }
};
/*
 * Records the image position patient of the dicom files.
 * 
 * @memberof serie
 * @param imagePositionPatient {array}
 */
MIRROR.serie.prototype.setImagePositionPatient = function (imagePositionPatient) {
    if (imagePositionPatient !== null && imagePositionPatient.length === 2) {
        if (imagePositionPatient[0].length === 3 && imagePositionPatient[1].length === 3) {
            for (var i = 0; i < imagePositionPatient[0].length; i++) {
                this.imagePositionPatient[i] = (imagePositionPatient[0][i] === undefined || imagePositionPatient[0][i] === '' || imagePositionPatient[0][i] === null) ? null : parseFloat(imagePositionPatient[0][i]);
            }  
            this.__setSpaceBetweenSlices (imagePositionPatient);
            this.__setImagePositionPatientDirection (imagePositionPatient);
        }            
    }    
};
/*
 * Set the space between slices.
 * 
 * @memberof serie
 * @param imagePositionPatient {array}
 */
MIRROR.serie.prototype.__setSpaceBetweenSlices = function (imagePositionPatient) {
    var slice1 = this.normalVector.x * imagePositionPatient[0][0] + this.normalVector.y * imagePositionPatient[0][1] + this.normalVector.z * imagePositionPatient[0][2],
        slice2 = this.normalVector.x * imagePositionPatient[1][0] + this.normalVector.y * imagePositionPatient[1][1] + this.normalVector.z * imagePositionPatient[1][2];
    this.spaceBetweenSlices = Math.abs (slice1 - slice2);         
};
/*
 * Set the direction of the slices.
 * 
 * @memberof serie
 * @param imagePositionPatient {array}
 */
MIRROR.serie.prototype.__setImagePositionPatientDirection = function (imagePositionPatient) {
    if (this.orientationPlane === 'axial') {
        if (parseFloat(imagePositionPatient[0][2]) > parseFloat(imagePositionPatient[1][2])) {
            this.imagePositionPatientDirection = -1;
        } else {
            this.imagePositionPatientDirection = 1;
        }                
    } else if (this.orientationPlane === 'coronal') {
        if (parseFloat(imagePositionPatient[0][1]) > parseFloat(imagePositionPatient[1][1])) {
            this.imagePositionPatientDirection = -1;
        } else {
            this.imagePositionPatientDirection = 1;
        }
    } else if (this.orientationPlane === 'sagittal') {
        if (parseFloat(imagePositionPatient[0][0]) > parseFloat(imagePositionPatient[1][0])) {
            this.imagePositionPatientDirection = -1;
        } else {
            this.imagePositionPatientDirection = 1;
        }
    }     
};
/*
 * Calculate the space between images for the navigation bar.
 * 
 * @memberof serie
 */
MIRROR.serie.prototype.setMultiplierPaddingNavigatorBar = function () {
    if (this.load.make.environment !== 'portrait') {
        var containerHeight = $('#navigator_'+ this.load.make.environment).height ();
        this.multiplierPaddingNavigatorBar = containerHeight / this.imagesURL.length;
    } else {
        var containerWidth = $('#navigator_'+ this.load.make.environment).width ();
        this.multiplierPaddingNavigatorBar = containerWidth / this.imagesURL.length;
    }    
};
/*
 * Fires global events. Drag set.
 * 
 * @memberof serie
 */
MIRROR.serie.prototype.commonEventsHandler = function () {
    var t = this;
    $('#'+ t.serieId).draggable({ 
        containment: 'html',
        helper: 'clone',
        appendTo: 'body',
        zIndex: 1000
    });  
};
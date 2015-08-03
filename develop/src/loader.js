/**
 * @file        Functions of the loader class
 * @author      Toth Limitada <contacto@toth.cl>
 * @copyright   2015 Toth Limitada
 * @license     {@link http://www.toth.cl}
 */

/**
 * @namespace MIRROR
 */

/* global PIXI, MIRROR */

/*
 * Getting study.
 * 
 * @memberof loader
 */
MIRROR.loader.prototype.study = function () {
    var t = this;
    $.post('../services/getStudy.py', {pk: t.studyId}, function (dataParsed) {
        if (dataParsed.length > 0) {
            t.make.checkIfWindowLevelIsSet (dataParsed);
            t.studyDescription = (dataParsed[0].study_desc !== undefined || dataParsed[0].study_desc !== '') ? dataParsed[0].study_desc : null;
            t.studyCharged = true;
            t.totalSeries = dataParsed.length; 
            t.__setSeries (dataParsed);        
            if (!t.make.isPhone) {
                t.make.globalInformation ();
            }
            if ($('#loading_study').length > 0) {
                $('#loading_study').remove ();
            }
        } else {
            if ($('#loading_study').length > 0) {
                $('#loading_study').remove ();
            }
            alert(MIRROR.language.study['no_data']);
        } 
    });
};
/*
 * Assigning information series.
 * 
 * @memberof loader
 * @param dataParsed {object}: study information.
 */
MIRROR.loader.prototype.__setSeries = function (dataParsed) {
    var t = this;    
    if (t.make.environment === 'desktop') {
        var seriesToolsbarContent = '<div style="width: 90px; height: '+ 85 * t.totalSeries +'px; text-align: center;"></div>';
        $('#series_toolsbar').append (seriesToolsbarContent);    
    }    
    for (var i = 0; i < t.totalSeries; i++) {
        t.series['serie_'+ i] = new MIRROR.serie (t, 'serie_'+ i, dataParsed[i].pixelSpacing, dataParsed[i].windowWidth, dataParsed[i].windowCenter, dataParsed[i].rescaleSlope, dataParsed[i].rescaleIntercept, 
            dataParsed[i].dimensions, dataParsed[i].reports, dataParsed[i].patient_name, dataParsed[i].patient_rut, dataParsed[i].patient_sex, dataParsed[i].name, dataParsed[i].institution, dataParsed[i].series_body_part, 
            dataParsed[i].series_desc, dataParsed[i].modality, dataParsed[i].sliceThickness, dataParsed[i].frameOfReferenceUID, dataParsed[i].totalElements, dataParsed[i].bitsStored, dataParsed[i].numberOfFrames, 
            dataParsed[i].frameTime);
        t.series['serie_'+ i].checkAllSameDimensions ();
        t.series['serie_'+ i].setImageOrientationPatient (dataParsed[i].imageOrientationPatient);
        t.series['serie_'+ i].setImagePositionPatient (dataParsed[i].imagePositionPatient);
        t.series['serie_'+ i].setParametersToEachElement (dataParsed[i].images, dataParsed[i].dicomPathsImages, dataParsed[i].imagesFrame);
        if (t.make.environment === 'desktop') {
            if (t.series['serie_'+ i].imagesURL.length > 1) {
                t.make.thumbnails['serie_'+ i] = '<img id="serie_'+ i +'" src="../../wado.php?requestType=WADO'+ t.series['serie_'+ i].imagesURL[(t.series['serie_'+ i].imagesURL.length / 2).toFixed(0)] +'&columns=80" style=" padding-bottom: 3px; border: 1px solid #4C4C4C;" />';
            } else {
                t.make.thumbnails['serie_'+ i] = '<img id="serie_'+ i +'" src="../../wado.php?requestType=WADO'+ t.series['serie_'+ i].imagesURL[0] +'&columns=80" style=" padding-bottom: 3px; border: 1px solid #4C4C4C;" />';
            }            
        } else {
            t.make.thumbnails['serie_'+ i] = $('<div></div>');
            if (t.series['serie_'+ i].serieDescription !== null) {
                var thumbnailsSpan = $('<span style="color: #FFF; font-size: 8pt;">'+ t.series['serie_'+ i].serieDescription +'</span><br />');
                t.make.thumbnails['serie_'+ i].append (thumbnailsSpan);
            }  
            if (t.series['serie_'+ i].imagesURL.length > 1) {
                var thumbnailsImage = $('<img id="serie_'+ i +'" src="../../wado.php?requestType=WADO'+ t.series['serie_'+ i].imagesURL[(t.series['serie_'+ i].imagesURL.length / 2).toFixed(0)] +'&columns=80" style=" padding-bottom: 3px; border: 1px solid #4C4C4C;" /><br />');
            } else {
                var thumbnailsImage = $('<img id="serie_'+ i +'" src="../../wado.php?requestType=WADO'+ t.series['serie_'+ i].imagesURL[0] +'&columns=80" style=" padding-bottom: 3px; border: 1px solid #4C4C4C;" /><br />');
            }
            
            t.make.thumbnails['serie_'+ i].append (thumbnailsImage);
        }        
        if (t.make.environment === 'desktop') {
            $('#series_toolsbar').children().append (t.make.thumbnails['serie_'+ i]);
            var dataSerie = '';            
            if (t.series['serie_'+ i].serieBodyPart !== null) {
                dataSerie += '<span style="text-decoration: underline;">'+ MIRROR.language.toolsbar.thumbnails['body_part'] +'</span>: '+ t.series['serie_'+ i].serieBodyPart +'<br />';
            }
            if (t.series['serie_'+ i].serieName !== null) {
                dataSerie += '<span style="text-decoration: underline;">'+ MIRROR.language.toolsbar.thumbnails['name_serie'] +'</span>: '+ t.series['serie_'+ i].serieName +'<br />';
            }  
            if (t.series['serie_'+ i].serieDescription !== null) {
                dataSerie += '<span style="text-decoration: underline;">'+ MIRROR.language.toolsbar.thumbnails['serie_desc'] +'</span>: '+ t.series['serie_'+ i].serieDescription +'<br />';
            }
            if (t.series['serie_'+ i].imagesURL.length > 0) {
                dataSerie += '<span style="text-decoration: underline;">'+ MIRROR.language.toolsbar.thumbnails['total_images'] +'</span>: '+ t.series['serie_'+ i].imagesURL.length +'<br />';
            } 
            $('#serie_'+ i).tothtip ($('<div>'+ dataSerie +'</div>'));
        }        
        t.series['serie_'+ i].commonEventsHandler ();        
    } 
    if (t.make.environment === 'desktop') {
        $('#series_toolsbar').perfectScrollbar();
    } 
};
/*
 * Attaching set to context.
 * 
 * @memberof loader
 * @param layerId {object}: unique ID for the context.
 * @param serieId {object}: unique ID for the serie.
 */
MIRROR.loader.prototype.statusSerie = function (layerId, serieId) {
    var t = this;
    if (t.series[serieId].charged) {
        t.make.layers[layerId].applySerie (t.series[serieId].serie[0], $('#'+ layerId).width (), $('#'+ layerId).height ());
        if ($('#navigator_bar_'+ layerId).length > 0) {
            if (t.make.environment !== 'portrait') {
                $('#navigator_bar_'+ layerId).height (t.series[serieId].totalCharging * t.series[serieId].multiplierPaddingNavigatorBar);
            } else {
                $('#navigator_bar_'+ layerId).width (t.series[serieId].totalCharging * t.series[serieId].multiplierPaddingNavigatorBar);
            }            
        } 
    } else {        
        if (t.make.environment === 'desktop') {
            if (!t.series[serieId].charging) {
                t.series[serieId].charged = false;  
                t.series[serieId].totalCharging = 0;
                t.series[serieId].totalChargingWithError = 0;
                t.series[serieId].charging = true;
                t.tailCharging.push (serieId);
                t.charging = true;
                if (t.make.layersState) {
                    $('#submenu').remove ();
                    t.make.layersState = false;
                } 
                $('#layers').html (t.make.buttons.layers.disable);
                $('#'+ layerId).children().children().children().html (MIRROR.language.workspace['loading']);
                t.__chargeSerie (layerId, serieId, function () {
                    t.tailCharging.shift ();
                    if (t.tailCharging.length === 0) {
                        t.charging = false;
                        $('#layers').html (t.make.buttons.layers.inactive);
                    }                    
                    t.series[serieId].charging = false;
                    if (t.series[serieId].totalCharging === t.series[serieId].imagesURL.length) {                    
                        t.series[serieId].charged = true;         
                        t.totalSeriesCharged++;
                        t.series[serieId].chargedWithError = false;
                    }  
                    t.make.layers[layerId].dicomLayerInformation ();        
                    t.make.globalInformation ();                    
                });
            } else {
                if (t.series[serieId].serie[0] === undefined) {
                    var forceIntervalBaseTextureCharge = setInterval (function () {
                        if (t.series[serieId].serie[0] !== undefined) {
                            t.make.layers[layerId].applySerie (t.series[serieId].serie[0], $('#'+ layerId).width (), $('#'+ layerId).height ());
                            clearInterval (forceIntervalBaseTextureCharge);
                        }
                    }, 10);
                } else {
                    t.make.layers[layerId].applySerie (t.series[serieId].serie[0], $('#'+ layerId).width (), $('#'+ layerId).height ());
                }     
            }           
        } else if (t.make.environment !== 'desktop') {
            t.blockAttachSerieMobile = true;            
            if ($('#series_thumbnails_submenu').length > 0) {
                $('#series_thumbnails_submenu').append(
                    '<div id="blockAttachSerie" style="display: table; position: absolute; left: 0px; top: 0px; width: 100%; height: '+ ($('#series_thumbnails_submenu').height ()) +'px; background: rgba(66, 66, 66, 0.8);">'+
                        '<div style="display: table-cell; vertical-align: middle">'+
                            '<img src="../img/loading.svg" />'+
                        '</div>'+
                    '</div>'
                );
            }
            t.series[serieId].charged = false;  
            t.series[serieId].totalCharging = 0;
            t.series[serieId].totalChargingWithError = 0;
            t.tailCharging.push (serieId);
            t.charging = true;
            if (t.make.layersState) {
                $('#submenu').remove ();
                t.make.layersState = false;
            } 
            $('#layers').html (t.make.buttons.layers.disable);
            $('#'+ layerId).children().children().children().html (MIRROR.language.workspace['loading']);
            t.__chargeSerieSlow (layerId, serieId, function () {
                t.tailCharging.shift ();
                if (t.tailCharging.length === 0) {
                    t.charging = false;
                    $('#layers').html (t.make.buttons.layers.inactive);
                }     
                clearInterval(t.intervalChargeSerie);
                t.blockAttachSerieMobile = false;
                if (t.series[serieId].totalCharging === t.series[serieId].imagesURL.length) {                    
                    t.series[serieId].charged = true;         
                    t.totalSeriesCharged++;
                    t.series[serieId].chargedWithError = false;
                }
                if ($('#blockAttachSerie').length > 0) {
                    $('#blockAttachSerie').remove ();
                }
                if (!t.make.isPhone) {
                    t.make.layers[layerId].dicomLayerInformation ();        
                    t.make.globalInformation ();
                }            
            });
        }
    }
};
/*
 * Loading the images of the set.
 * 
 * @memberof loader
 * @param layerId {object}: unique ID for the context.
 * @param serieId {object}: unique ID for the serie.
 * @param callback
 */
MIRROR.loader.prototype.__chargeSerie = function (layerId, serieId, callback) {
    var t = this;
    for (var i = 0; i < t.series[serieId].imagesURL.length; i++) {
        if (t.series[serieId].serie[i] !== undefined) {
            t.series[serieId].serie[i].destroy ();
        }        
        t.series[serieId].serie[i] = new PIXI.BaseTexture.fromImage ('../../wado.php?requestType=WADO'+ t.series[serieId].imagesURL[i]);         
        t.series[serieId].serie[i].on ('loaded', (function (j, s) {
            return function () {                
                s.series[serieId].totalCharging++;                
                if ($('#navigator_bar_'+ layerId).length > 0) {
                    if (t.make.environment !== 'portrait') {
                        $('#navigator_bar_'+ layerId).height (s.series[serieId].totalCharging * s.series[serieId].multiplierPaddingNavigatorBar);
                    } else {
                        $('#navigator_bar_'+ layerId).width (s.series[serieId].totalCharging * s.series[serieId].multiplierPaddingNavigatorBar);
                    }                    
                }
                for (var layer in s.make.layers) {
                    if (s.make.layers[layer].serieIdCharged === serieId && layerId !== layer) {
                        s.make.layers[layer].dicomLayerInformation ();
                        if ($('#navigator_bar_'+ layer).length > 0) {
                            if (t.make.environment !== 'portrait') {
                                $('#navigator_bar_'+ layer).height (s.series[serieId].totalCharging * s.series[serieId].multiplierPaddingNavigatorBar);
                            } else {
                                $('#navigator_bar_'+ layer).width (s.series[serieId].totalCharging * s.series[serieId].multiplierPaddingNavigatorBar);
                            }                    
                        }                        
                    }
                } 
                if (j === 0) {    
                    s.make.layers[layerId].applySerie (s.series[serieId].serie[0], $('#'+ layerId).width (), $('#'+ layerId).height ());
                    if (s.series[serieId].imagesURL.length === 1) {
                        callback ();
                    }
                } 
                if (s.series[serieId].totalCharging === s.series[serieId].imagesURL.length) {                    
                    callback ();
                }
                s.make.layers[layerId].dicomLayerInformation ();   
            };
        })(i, t));
        t.series[serieId].serie[i].once ('error', (function (j, s) {  
            return function () {
                s.series[serieId].chargedWidthError = true;
                s.series[serieId].totalChargingWithError++;
                if (s.series[serieId].totalChargingWithError === 1) { 
//                    s.make.popup ('error_charging');
                    callback ();
                }                 
            };            
        })(i, t));      
    }
};
/*
 * Loading the images of the set for mobile.
 * 
 * @memberof loader
 * @param layerId {object}: unique ID for the context.
 * @param serieId {object}: unique ID for the serie.
 * @param callback
 */
MIRROR.loader.prototype.__chargeSerieSlow = function (layerId, serieId, callback) {
    var t = this,
        i = 0;
    t.intervalChargeSerie = setInterval (function () {
        if (t.series[serieId].serie[i] !== undefined) {
            t.series[serieId].serie[i].destroy ();
        }        
        t.series[serieId].serie[i] = new PIXI.BaseTexture.fromImage ('../../wado.php?requestType=WADO'+ t.series[serieId].imagesURL[i]);         
        t.series[serieId].serie[i].on ('loaded', (function (j, s) {
            return function () {
                s.charging = true;
                if (s.make.layersState) {
                    $('#submenu').remove ();
                }                
                $('#layers').html (s.make.buttons.layers.disable);
                s.series[serieId].totalCharging++; 
                s.make.layers[layerId].dicomLayerInformation ();  
                if ($('#navigator_bar_'+ layerId).length > 0) {
                    if (t.make.environment !== 'portrait') {
                        $('#navigator_bar_'+ layerId).height (s.series[serieId].totalCharging * s.series[serieId].multiplierPaddingNavigatorBar);
                    } else {
                        $('#navigator_bar_'+ layerId).width (s.series[serieId].totalCharging * s.series[serieId].multiplierPaddingNavigatorBar);
                    }   
                }                
                if (j === 0) {            
                    s.make.layers[layerId].applySerie (s.series[serieId].serie[0], $('#'+ layerId).width (), $('#'+ layerId).height ());
                    if (s.series[serieId].imagesURL.length === 1) {
                        callback ();
                    }
                } else if (s.series[serieId].totalCharging === s.series[serieId].imagesURL.length) {
                    callback ();
                }
                s.make.layers[layerId].dicomLayerInformation ();   
            };
        })(i, t));
        t.series[serieId].serie[i].once ('error', (function (j, s) {  
            return function () {
                s.series[serieId].chargedWidthError = true;
                s.series[serieId].totalChargingWithError++;
                if (s.series[serieId].totalChargingWithError === 1) { 
//                    s.make.popup ('error_charging');
                    callback ();
                }                
            };            
        })(i, t));   
        i++;
    }, 175); //75
};

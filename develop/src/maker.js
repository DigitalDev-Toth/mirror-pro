/**
 * @file        Functions of the maker class
 * @author      Toth Limitada <contacto@toth.cl>
 * @copyright   2015 Toth Limitada
 * @license     {@link http://www.toth.cl}
 */

/**
 * @namespace MIRROR
 */

/* global PIXI, MIRROR, Hammer */

/*
 * Initializes the core configuration.
 * 
 * @memberof maker
 */
MIRROR.maker.prototype.init = function () {
    PIXI.utils._saidHello = true;
    this.__globalConfiguration ();
};
/*
 * Setting.
 * 
 * @memberof maker
 */
MIRROR.maker.prototype.__globalConfiguration = function () {
    this.__detectBrowser ();
    this.__detectRenderType ();
    this.__detectDevice ();    
    this.__detectOrientation ();
    this.__loadButtons ();
    this.__choiceEnvironment ();
    this.__globalEventsHandler ();
    this.__loadStudy ();
    this.__setLayers ();
    this.__rendering ();    
};
/*
 * Detects browser technology compatibility {webgl|canvas2d}.
 * 
 * @memberof maker
 */
MIRROR.maker.prototype.__detectRenderType = function () {
    var detectRenderer = PIXI.autoDetectRenderer ();
    if (this.browser === 'msie') {
        $('#renderers').append (detectRenderer.view);
    }
    if (detectRenderer.type === 1) {
        this.renderType = 'webgl';
    } else if (detectRenderer.type === 2) {
        this.renderType = 'canvas2d';
    }
};
/*
 * Detects the type of device.
 * 
 * @memberof maker
 */
MIRROR.maker.prototype.__detectDevice = function () {
    var android = navigator.userAgent.match (/Android/i),
        apple = navigator.userAgent.match (/iPhone|iPad|iPod/i);
    if (android !== null) {
        this.device = 'android';
    } else if (apple !== null) {
        this.device = 'apple';
    } else {
        this.device = 'desktop';
    }
};
/*
 * Detects the browser used.
 * 
 * @memberof maker
 */
MIRROR.maker.prototype.__detectBrowser = function () {
    if (navigator.userAgent.indexOf ('Firefox') !== -1) {
        this.browser = 'firefox';        
    } else if (navigator.userAgent.indexOf ('MSIE') !== -1 || navigator.userAgent.indexOf ('rv:11') !== -1) {
        this.browser = 'msie';
    } else if (navigator.userAgent.indexOf ('Chrome') !== -1) {
        this.browser = 'chrome';
    }
};
/*
 * Detects the orientation of the device.
 * 
 * @memberof maker
 */
MIRROR.maker.prototype.__detectOrientation = function () {
    if (this.device !== 'desktop' && this.device !== null) {
        if ($(window).width () > $(window).height ()) {
            this.orientation = 'landscape';
            if ($(window).width () < 800) {
                this.isPhone = true;
            }
        } else {
            this.orientation = 'portrait';
            if ($(window).height () < 800) {
                this.isPhone = true;
            }
        }
    }
};
/*
 * Load image buttons.
 * 
 * @memberof maker
 */
MIRROR.maker.prototype.__loadButtons = function () {
    var t = this,
        sizeBar = {
            'width': '35px',
            'height': '35px'
        },
        sizeSubmenu = {
            'width': '50px',
            'height': '50px'
        };
    t.buttons.abdomen = {
        active: $('<img id="button_window_level_presets_abdomen" src="../img/abdomen_active.png" class="toolSubmenu" style="cursor: pointer;" />').css (sizeSubmenu),
        inactive: $('<img id="button_window_level_presets_abdomen" src="../img/abdomen_inactive.png" class="toolSubmenu" style="cursor: pointer;" />').css (sizeSubmenu),
        disable: $('<img id="button_window_level_presets_abdomen" src="../img/abdomen_disable.png" class="toolSubmenu" style="cursor: pointer;" />').css (sizeSubmenu),
        where: 'submenu'
    };
    t.buttons.angio = {
        active: $('<img id="button_window_level_presets_angio" src="../img/angio_active.png" class="toolSubmenu" style="cursor: pointer;" />').css (sizeSubmenu),
        inactive: $('<img id="button_window_level_presets_angio" src="../img/angio_inactive.png" class="toolSubmenu" style="cursor: pointer;" />').css (sizeSubmenu),
        disable: $('<img id="button_window_level_presets_angio" src="../img/angio_disable.png" class="toolSubmenu" style="cursor: pointer;" />').css (sizeSubmenu),
        where: 'submenu'
    };
    t.buttons.angle = {
        active: $('<img id="button_measuring_angle" src="../img/angle_active.png" class="toolSubmenu" style="cursor: pointer;" />').css (sizeSubmenu),
        inactive: $('<img id="button_measuring_angle" src="../img/angle_inactive.png" class="toolSubmenu" style="cursor: pointer;" />').css (sizeSubmenu),
        disable: $('<img id="button_measuring_angle" src="../img/angle_disable.png" class="toolSubmenu" style="cursor: pointer;" />').css (sizeSubmenu),
        where: 'submenu'
    };
    t.buttons.area = {
        active: $('<img id="button_measuring_area" src="../img/area_active.png" class="toolSubmenu" style="cursor: pointer;" />').css (sizeSubmenu),
        inactive: $('<img id="button_measuring_area" src="../img/area_inactive.png" class="toolSubmenu" style="cursor: pointer;" />').css (sizeSubmenu),
        disable: $('<img id="button_measuring_area" src="../img/area_disable.png" class="toolSubmenu" style="cursor: pointer;" />').css (sizeSubmenu),
        where: 'submenu'
    };
    t.buttons.bone = {
        active: $('<img id="button_window_level_presets_bone" src="../img/bone_active.png" class="toolSubmenu" style="cursor: pointer;" />').css (sizeSubmenu),
        inactive: $('<img id="button_window_level_presets_bone" src="../img/bone_inactive.png" class="toolSubmenu" style="cursor: pointer;" />').css (sizeSubmenu),
        disable: $('<img id="button_window_level_presets_bone" src="../img/bone_disable.png" class="toolSubmenu" style="cursor: pointer;" />').css (sizeSubmenu),
        where: 'submenu'
    };
    t.buttons.brain = {
        active: $('<img id="button_window_level_presets_brain" src="../img/brain_active.png" class="toolSubmenu" style="cursor: pointer;" />').css (sizeSubmenu),
        inactive: $('<img id="button_window_level_presets_brain" src="../img/brain_inactive.png" class="toolSubmenu" style="cursor: pointer;" />').css (sizeSubmenu),
        disable: $('<img id="button_window_level_presets_brain" src="../img/brain_disable.png" class="toolSubmenu" style="cursor: pointer;" />').css (sizeSubmenu),
        where: 'submenu'
    };
    t.buttons.chest = {
        active: $('<img id="button_window_level_presets_chest" src="../img/chest_active.png" class="toolSubmenu" style="cursor: pointer;" />').css (sizeSubmenu),
        inactive: $('<img id="button_window_level_presets_chest" src="../img/chest_inactive.png" class="toolSubmenu" style="cursor: pointer;" />').css (sizeSubmenu),
        disable: $('<img id="button_window_level_presets_chest" src="../img/chest_disable.png" class="toolSubmenu" style="cursor: pointer;" />').css (sizeSubmenu),
        where: 'submenu'
    };
    t.buttons.close = {
        active: $('<img id="button_close" src="../img/close_active.png" class="toolBar" style="cursor: pointer;" />').css (sizeBar),
        inactive: $('<img id="button_close" src="../img/close_inactive.png" class="toolBar" style="cursor: pointer;" />').css (sizeBar),
        disable: $('<img id="button_close" src="../img/close_disable.png" class="toolBar" style="cursor: pointer;" />').css (sizeBar),
        where: 'bar'
    };
    t.buttons.default = {
        active: $('<img id="button_window_level_presets_default" src="../img/default_active.png" class="toolSubmenu" style="cursor: pointer;" />').css (sizeSubmenu),
        inactive: $('<img id="button_window_level_presets_default" src="../img/default_inactive.png" class="toolSubmenu" style="cursor: pointer;" />').css (sizeSubmenu),
        disable: $('<img id="button_window_level_presets_default" src="../img/default_disable.png" class="toolSubmenu" style="cursor: pointer;" />').css (sizeSubmenu),
        where: 'submenu'
    };
    t.buttons.ellipse = {
        active: $('<img id="button_hounsfield_ellipse" src="../img/ellipse_active.png" class="toolSubmenu" style="cursor: pointer;" />').css (sizeSubmenu),
        inactive: $('<img id="button_hounsfield_ellipse" src="../img/ellipse_inactive.png" class="toolSubmenu" style="cursor: pointer;" />').css (sizeSubmenu),
        disable: $('<img id="button_hounsfield_ellipse" src="../img/ellipse_disable.png" class="toolSubmenu" style="cursor: pointer;" />').css (sizeSubmenu),
        where: 'submenu'
    };
    t.buttons.email = {
        active: $('<img id="button_email" src="../img/email_active.png" class="toolBar" style="cursor: pointer;" data-toggle="modal" data-target="#modal" />').css (sizeBar),
        inactive: $('<img id="button_email" src="../img/email_inactive.png" class="toolBar" style="cursor: pointer;" data-toggle="modal" data-target="#modal" />').css (sizeBar),
        disable: $('<img id="button_email" src="../img/email_disable.png" class="toolBar" style="cursor: pointer;" />').css (sizeBar),
        where: 'bar'
    };
    t.buttons.film_mode = {
        active: $('<img id="button_film_mode" src="../img/film_mode_active.png" class="toolBar" style="cursor: pointer;" />').css (sizeBar),
        inactive: $('<img id="button_film_mode" src="../img/film_mode_inactive.png" class="toolBar" style="cursor: pointer;" />').css (sizeBar),
        disable: $('<img id="button_film_mode" src="../img/film_mode_disable.png" class="toolBar" style="cursor: pointer;" />').css (sizeBar),
        where: 'bar'
    };
    t.buttons.hu = {
        active: $('<img id="button_hounsfield" src="../img/hu_active.png" class="toolBar" style="cursor: pointer;" />').css (sizeBar),
        inactive: $('<img id="button_hounsfield" src="../img/hu_inactive.png" class="toolBar" style="cursor: pointer;" />').css (sizeBar),
        disable: $('<img id="button_hounsfield" src="../img/hu_disable.png" class="toolBar" style="cursor: pointer;" />').css (sizeBar),
        where: 'bar'
    };
    t.buttons.imitation = {
        active: $('<img id="button_imitation" src="../img/imitation_active.png" class="toolBar" style="cursor: pointer;" />').css (sizeBar),
        inactive: $('<img id="button_imitation" src="../img/imitation_inactive.png" class="toolBar" style="cursor: pointer;" />').css (sizeBar),
        disable: $('<img id="button_imitation" src="../img/imitation_disable.png" class="toolBar" style="cursor: pointer;" />').css (sizeBar),
        where: 'bar'
    };
    t.buttons.layers_1 = {
        active: $('<img id="button_layers_1" src="../img/layers_1_active.png" class="toolSubmenu" style="cursor: pointer;" />').css (sizeSubmenu),
        inactive: $('<img id="button_layers_1" src="../img/layers_1_inactive.png" class="toolSubmenu" style="cursor: pointer;" />').css (sizeSubmenu),
        disable: $('<img id="button_layers_1" src="../img/layers_1_disable.png" class="toolSubmenu" style="cursor: pointer;" />').css (sizeSubmenu),
        where: 'submenu'
    };
    t.buttons.layers_2 = {
        active: $('<img id="button_layers_2" src="../img/layers_2_active.png" class="toolSubmenu" style="cursor: pointer;" />').css (sizeSubmenu),
        inactive: $('<img id="button_layers_2" src="../img/layers_2_inactive.png" class="toolSubmenu" style="cursor: pointer;" />').css (sizeSubmenu),
        disable: $('<img id="button_layers_2" src="../img/layers_2_disable.png" class="toolSubmenu" style="cursor: pointer;" />').css (sizeSubmenu),
        where: 'submenu'
    };
    t.buttons.layers_3 = {
        active: $('<img id="button_layers_3" src="../img/layers_3_active.png" class="toolSubmenu" style="cursor: pointer;" />').css (sizeSubmenu),
        inactive: $('<img id="button_layers_3" src="../img/layers_3_inactive.png" class="toolSubmenu" style="cursor: pointer;" />').css (sizeSubmenu),
        disable: $('<img id="button_layers_3" src="../img/layers_3_disable.png" class="toolSubmenu" style="cursor: pointer;" />').css (sizeSubmenu),
        where: 'submenu'
    };
    t.buttons.layers_4 = {
        active: $('<img id="button_layers_4" src="../img/layers_4_active.png" class="toolSubmenu" style="cursor: pointer;" />').css (sizeSubmenu),
        inactive: $('<img id="button_layers_4" src="../img/layers_4_inactive.png" class="toolSubmenu" style="cursor: pointer;" />').css (sizeSubmenu),
        disable: $('<img id="button_layers_4" src="../img/layers_4_disable.png" class="toolSubmenu" style="cursor: pointer;" />').css (sizeSubmenu),
        where: 'submenu'
    };
    t.buttons.layers = {
        active: $('<img id="button_layers" src="../img/layers_active.png" class="toolBar" style="cursor: pointer;" />').css (sizeBar),
        inactive: $('<img id="button_layers" src="../img/layers_inactive.png" class="toolBar" style="cursor: pointer;" />').css (sizeBar),
        disable: $('<img id="button_layers" src="../img/layers_disable.png" class="toolBar" style="cursor: pointer;" />').css (sizeBar),
        where: 'bar'
    };
    t.buttons.lungs = {
        active: $('<img id="button_window_level_presets_lungs" src="../img/lungs_active.png" class="toolSubmenu" style="cursor: pointer;" />').css (sizeSubmenu),
        inactive: $('<img id="button_window_level_presets_lungs" src="../img/lungs_inactive.png" class="toolSubmenu" style="cursor: pointer;" />').css (sizeSubmenu),
        disable: $('<img id="button_window_level_presets_lungs" src="../img/lungs_disable.png" class="toolSubmenu" style="cursor: pointer;" />').css (sizeSubmenu),
        where: 'submenu'
    };
    t.buttons.magnifying_glass = {
        active: $('<img id="button_magnifying_glass" src="../img/magnifying_glass_active.png" class="toolBar" style="cursor: pointer;" />').css (sizeBar),
        inactive: $('<img id="button_magnifying_glass" src="../img/magnifying_glass_inactive.png" class="toolBar" style="cursor: pointer;" />').css (sizeBar),
        disable: $('<img id="button_magnifying_glass" src="../img/magnifying_glass_disable.png" class="toolBar" style="cursor: pointer;" />').css (sizeBar),
        where: 'bar'
    };
    t.buttons.measuring = {
        active: $('<img id="button_measuring" src="../img/measuring_active.png" class="toolBar" style="cursor: pointer;" />').css (sizeBar),
        inactive: $('<img id="button_measuring" src="../img/measuring_inactive.png" class="toolBar" style="cursor: pointer;" />').css (sizeBar),
        disable: $('<img id="button_measuring" src="../img/measuring_disable.png" class="toolBar" style="cursor: pointer;" />').css (sizeBar),
        where: 'bar'
    };
    t.buttons.negative = {
        active: $('<img id="button_negative" src="../img/negative_active.png" class="toolBar" style="cursor: pointer;" />').css (sizeBar),
        inactive: $('<img id="button_negative" src="../img/negative_inactive.png" class="toolBar" style="cursor: pointer;" />').css (sizeBar),
        disable: $('<img id="button_negative" src="../img/negative_disable.png" class="toolBar" style="cursor: pointer;" />').css (sizeBar),
        where: 'bar'
    };
    t.buttons.point = {
        active: $('<img id="button_hounsfield_point" src="../img/point_active.png" class="toolSubmenu" style="cursor: pointer;" />').css (sizeSubmenu),
        inactive: $('<img id="button_hounsfield_point" src="../img/point_inactive.png" class="toolSubmenu" style="cursor: pointer;" />').css (sizeSubmenu),
        disable: $('<img id="button_hounsfield_point" src="../img/point_disable.png" class="toolSubmenu" style="cursor: pointer;" />').css (sizeSubmenu),
        where: 'submenu'
    };
    t.buttons.polygon = {
        active: $('<img id="button_hounsfield_polygon" src="../img/polygon_active.png" class="toolSubmenu" style="cursor: pointer;" />').css (sizeSubmenu),
        inactive: $('<img id="button_hounsfield_polygon" src="../img/polygon_inactive.png" class="toolSubmenu" style="cursor: pointer;" />').css (sizeSubmenu),
        disable: $('<img id="button_hounsfield_polygon" src="../img/polygon_disable.png" class="toolSubmenu" style="cursor: pointer;" />').css (sizeSubmenu),
        where: 'submenu'
    };
    t.buttons.presets = {
        active: $('<img id="button_window_level_presets" src="../img/presets_active.png" class="toolBar" style="cursor: pointer;" />').css (sizeBar),
        inactive: $('<img id="button_window_level_presets" src="../img/presets_inactive.png" class="toolBar" style="cursor: pointer;" />').css (sizeBar),
        disable: $('<img id="button_window_level_presets" src="../img/presets_disable.png" class="toolBar" style="cursor: pointer;" />').css (sizeBar),
        where: 'bar'
    };
    t.buttons.reports = {
        active: $('<img id="button_reports" src="../img/reports_active.png" class="toolBar" style="cursor: pointer;" data-toggle="modal" data-target="#modal" />').css (sizeBar),
        inactive: $('<img id="button_reports" src="../img/reports_inactive.png" class="toolBar" style="cursor: pointer;" data-toggle="modal" data-target="#modal" />').css (sizeBar),
        disable: $('<img id="button_reports" src="../img/reports_disable.png" class="toolBar" style="cursor: pointer;" />').css (sizeBar),
        where: 'bar'
    };
    t.buttons.reset = {
        active: $('<img id="button_reset" src="../img/reset_active.png" class="toolBar" style="cursor: pointer;" />').css (sizeBar),
        inactive: $('<img id="button_reset" src="../img/reset_inactive.png" class="toolBar" style="cursor: pointer;" />').css (sizeBar),
        disable: $('<img id="button_reset" src="../img/reset_disable.png" class="toolBar" style="cursor: pointer;" />').css (sizeBar),
        where: 'bar'
    };
    t.buttons.rotation = {
        active: $('<img id="button_rotation" src="../img/rotation_active.png" class="toolBar" style="cursor: pointer;" />').css (sizeBar),
        inactive: $('<img id="button_rotation" src="../img/rotation_inactive.png" class="toolBar" style="cursor: pointer;" />').css (sizeBar),
        disable: $('<img id="button_rotation" src="../img/rotation_disable.png" class="toolBar" style="cursor: pointer;" />').css (sizeBar),
        where: 'bar'
    };
    t.buttons.segment = {
        active: $('<img id="button_measuring_segment" src="../img/segment_active.png" class="toolSubmenu" style="cursor: pointer;" />').css (sizeSubmenu),
        inactive: $('<img id="button_measuring_segment" src="../img/segment_inactive.png" class="toolSubmenu" style="cursor: pointer;" />').css (sizeSubmenu),
        disable: $('<img id="button_measuring_segment" src="../img/segment_disable.png" class="toolSubmenu" style="cursor: pointer;" />').css (sizeSubmenu),
        where: 'submenu'
    };
    t.buttons.series = {
        active: $('<img id="button_thumbnails_series" src="../img/series_active.png" class="toolBar" style="cursor: pointer;" />').css (sizeBar),
        inactive: $('<img id="button_thumbnails_series" src="../img/series_inactive.png" class="toolBar" style="cursor: pointer;" />').css (sizeBar),
        disable: $('<img id="button_thumbnails_series" src="../img/series_disable.png" class="toolBar" style="cursor: pointer;" />').css (sizeBar),
        where: 'bar'
    };
};
/*
 * Select the environment to use.
 * 
 * @memberof maker
 */
MIRROR.maker.prototype.__choiceEnvironment = function () {
    if (this.device === 'desktop') {
        this.environment = 'desktop';
    } else {
        if (this.orientation === 'landscape') {
            this.environment = 'landscape';
        } else if (this.orientation === 'portrait') {
            this.environment = 'portrait';
        }
    }
    this.__updateDOM ();    
};
/*
 * Fires the global events associated with the environment.
 * 
 * @memberof maker
 */
MIRROR.maker.prototype.__globalEventsHandler = function () {
    var t = this;
    $(window).on ('contextmenu', function (event) {
        event.preventDefault ();
        return false;
    }).on ('resize', function () {
        t.resizeStart++;
        for (var layer in t.layers) {
            t.layers[layer].resizeEnd = false;
        }
        if (t.device !== 'desktop' && t.device !== null) {
            t.isPhone = false;
            t.__detectOrientation ();
            t.__choiceEnvironment ();
            t.__orientationChangeLayers ();
            if (t.layersState) {
                t.__actions ('button_layers');
            }
            if (t.measuringState) {
                t.__actions ('button_measuring');
            }
            if (t.hounsfieldState) {
                t.__actions ('button_measuring');
            }
            if (!t.isPhone) {
                t.globalInformation ();
            }
        } else if (t.device === 'desktop') {
            t.__responsiveSystem ();
            if (t.layersState) {
                t.__actions ('button_layers');
            }
            if (t.magnifyingGlassState) {
                t.__actions ('button_magnifying_glass');
            } 
            if (t.measuringState) {
                t.__actions ('button_measuring');
            }
            if (t.hounsfieldState) {
                t.__actions ('button_measuring');
            }
        }        
    }).on ('resizeEnd', function () {
        t.resizeStart = 0;
        for (var layer in t.layers) {
            t.layers[layer].resizeEnd = true;
        }
        t.__responsiveSystem ();        
    }).on ('dblclick', function (event) {
        if (t.environment === 'desktop') {
            t.__eventDoubleClicks (event);
        } 
    }).on ('click', function (event) {
        if (t.environment === 'desktop') {
            t.__eventClicks (event);
        }        
    }).on('mousedown', function (event) {
        if (t.environment === 'desktop') {
            t.__eventMouseDown (event); 
        }               
    }).on ('mouseup', function () {
        $(this).unbind ('mousemove');
    }).on ('keydown', function (event) {
        switch (event.keyCode) {
            case 16: // shift
                if (!event.altKey) {
                    t.__actions ('button_magnifying_glass');
                }
                break;
            case 87: // w
                t.__actions ('button_rotation');
                break;
            case 73: // i
                t.__actions ('button_imitation');
                break;
            case 70: // f
                t.__actions ('button_film_mode');
                break;
            case 78: // n
                t.__actions ('button_negative');
                break;
            case 77: // m
                t.__actions ('button_measuring');
                break;
            case 83: // s
                t.__actions ('button_measuring_segment');
                break;
            case 65: // a
                t.__actions ('button_measuring_angle');
                break;
            case 90: // z
                t.__actions ('button_measuring_area');
                break;
            case 72: // h
                t.__actions ('button_hounsfield');
                break;
            case 80: // p
                t.__actions ('button_hounsfield_point');
                break;
            case 69: // e
                t.__actions ('button_hounsfield_ellipse');
                break;
            case 75: // k
                t.__actions ('button_hounsfield_polygon');
                break;
            case 68: // d
                t.__actions ('button_reset');
                break;
            case 88: // x
                t.__actions ('button_close');
                break;
            case 82: // r
                t.__actions ('button_reports');
                break;
            case 67: // c
                t.__actions ('button_email');
                break;
            case 79: // o
                if (t.isPhone) {
                    t.__actions ('button_info_phone');
                } else {
                    t.__actions ('button_info');
                }                
                break;
            case 49: // 1 + alt + shift
                if (event.altKey && event.shiftKey) {
                    t.__actions ('button_window_level_presets_default');  
                } else if (!event.altKey && !event.shiftKey) {
                    t.__actions ('button_layers_1'); 
                }                              
                break;
            case 50: // 2 + alt + shift
                if (event.altKey && event.shiftKey) {
                    t.__actions ('button_window_level_presets_bone');       
                } else if (!event.altKey && !event.shiftKey) {
                    t.__actions ('button_layers_2');     
                }                        
                break;
            case 51: // 3 + alt + shift
                if (event.altKey && event.shiftKey) {
                    t.__actions ('button_window_level_presets_abdomen'); 
                } else if (!event.altKey && !event.shiftKey) {
                    t.__actions ('button_layers_3');  
                }                             
                break;
            case 52: // 4 + alt + shift
                if (event.altKey && event.shiftKey) {
                    t.__actions ('button_window_level_presets_angio'); 
                } else if (!event.altKey && !event.shiftKey) {
                    t.__actions ('button_layers_4');  
                }                             
                break;
            case 53: // 5 + alt + shift
                if (event.altKey && event.shiftKey) {
                    t.__actions ('button_window_level_presets_brain'); 
                }                               
                break;
            case 54: // 6 + alt + shift
                if (event.altKey && event.shiftKey) {
                    t.__actions ('button_window_level_presets_chest');         
                }                       
                break;
            case 55: // 7 + alt + shift
                if (event.altKey && event.shiftKey) {
                    t.__actions ('button_window_level_presets_lungs');      
                }                               
                break;
        }        
    }).on ('keyup', function (event) {
        if (event.keyCode === 16) {
            t.__actions ('button_magnifying_glass');
        }
    }).bind ('touchstart', function (event) {  
        $(this).unbind ('touchmove');
        if (t.environment !== 'desktop') {
            t.__eventMouseDown (event);
            t.__eventClicks (event);
        }
    }).bind ('touchmove', function (event) {
        event.preventDefault ();
    });
    this.hammerManager = new Hammer.Manager(document.body);
    this.hammerManager.add( new Hammer.Tap({event: 'doubletap', taps: 2}));
    this.hammerManager.on('doubletap', function(event) {
        if (t.environment !== 'desktop') {
            t.__eventDoubleClicks (event);
        }
    });
};
/*
 * Displays the navigation bar of the selected scene.
 * 
 * @memberof maker
 */
MIRROR.maker.prototype.__displayNavigatorBar = function (layerId) {
    if (this.layers[layerId].serieIdCharged !== null) {
        if (this.load.series[this.layers[layerId].serieIdCharged].totalElements > 1) {
            $('#navigator_'+ this.environment).html ('');
            $('#navigator_'+ this.environment).html (this.layers[layerId].navigatorBar ());
            this.layers[layerId].navigatorBarIndex ();
        }        
    } else {
        $('#navigator_'+ this.environment).html ('');
    }
};
/*
 * Run the click event action.
 * 
 * @memberof maker
 */
MIRROR.maker.prototype.__eventClicks = function (event) {
    this.__actions (event.target.id);  
};
/*
 * Run the double click event action.
 * 
 * @memberof maker
 */
MIRROR.maker.prototype.__eventDoubleClicks = function (event) {
    if (!this.measuringState) {
        if (event.target.id === 'canvas_layer_1' || event.target.id === 'canvas_layer_2' || event.target.id === 'canvas_layer_3' || event.target.id === 'canvas_layer_4') {
            if (this.totalLayers > 1) {
                if (this.layers[$('#'+ event.target.id).parent().get(0).id].selected) {  
                    if (!this.imitationLayers) {
                        this.layers[$('#'+ event.target.id).parent().get(0).id].selected = false;
                        $('#'+ event.target.id).parent().css({
                            'border': '3px solid #6C6C6C'
                        });                       
                        this.globalInformation ();
                    } else {
                        for (var layer in this.layers) {
                            if (this.layers[layer].selected && this.layers[layer].leadImitation) {
                                this.layers[layer].leadImitation = false;
                                $('#'+ layer).css({
                                    'border': '3px solid #FCBE39'
                                });
                            }
                        } 
                        if (this.layers[$('#'+ event.target.id).parent().get(0).id].serieIdCharged !== null) {
                            this.layers[$('#'+ event.target.id).parent().get(0).id].leadImitation = true;
                            $('#'+ event.target.id).parent().css({
                                'border': '3px solid red'
                            });
                        }                                                                         
                    }                        
                } else {
                    if (!this.imitationLayers) {
                        this.layers[$('#'+ event.target.id).parent().get(0).id].selected = true;
                        $('#'+ event.target.id).parent().css({
                            'border': '3px solid #FCBE39'
                        });                       
                        this.globalInformation ();
                    }                        
                }                
            }            
        } else if (($(event.target).parent().parent().get(0).id === 'layer_1') || 
                ($(event.target).parent().parent().get(0).id === 'layer_2') || 
                ($(event.target).parent().parent().get(0).id === 'layer_3') || 
                ($(event.target).parent().parent().get(0).id === 'layer_4')) {
            if (this.totalLayers > 1) {
                if (!this.imitationLayers) {
                    if (this.layers[$(event.target).parent().parent().get(0).id].selected) { 
                        this.layers[$(event.target).parent().parent().get(0).id].selected = false;
                        $(event.target).parent().parent().css({
                            'border': '3px solid #6C6C6C'
                        });
                        this.globalInformation ();
                    } else {
                        this.layers[$(event.target).parent().parent().get(0).id].selected = true;
                        $(event.target).parent().parent().css({
                            'border': '3px solid #FCBE39'
                        });                        
                        this.globalInformation ();
                    }
                }
            }
        }
    }       
};
/*
 * Run the mouse down event action.
 * 
 * @memberof maker
 */
MIRROR.maker.prototype.__eventMouseDown = function (event) {
    var t = this;
    if (!t.measuringState) {
        if ((event.target.id === 'navigator_bar_layer_1') || 
            (event.target.id === 'navigator_bar_layer_2') || 
            (event.target.id === 'navigator_bar_layer_3') || 
            (event.target.id === 'navigator_bar_layer_4')) {  
            var layerId = event.target.id.substr(event.target.id.length - 7),
                mouseDownX = (t.environment === 'desktop') ? (event.clientX - 24) : (event.originalEvent.touches[0].pageX),
                mouseDownY = (t.environment === 'desktop') ? (event.clientY - 24) : (event.originalEvent.touches[0].pageY - 24); 
            if (t.environment === 'desktop') {
                if (mouseDownY >= 0 && mouseDownY < ($('#navigator_'+ t.environment).height ())) {
                    t.layers[layerId].moveInSerie (-1, mouseDownY);
                }
                $(window).on('mousemove', function (eventMove) {                
                    var mouseMoveY = eventMove.clientY - 24; 
                    if (mouseMoveY >= 0 && mouseMoveY < ($('#navigator_'+ t.environment).height ())) {
                        var deltaY = mouseMoveY - mouseDownY;                    
                        if (deltaY > 0) {
                            t.layers[layerId].moveInSerie (-1, mouseMoveY);
                        } else if (deltaY < 0) {
                            t.layers[layerId].moveInSerie (1, mouseMoveY);
                        }
                        mouseDownY = mouseMoveY;
                    }                
                });
            } else {
                if (t.environment === 'portrait') {
                    if (mouseDownX >= 0 && mouseDownX < ($('#navigator_'+ t.environment).width ())) {
                        t.layers[layerId].moveInSerie (-1, mouseDownX);
                    }
                } else {
                    if (mouseDownY >= 0 && mouseDownY < ($('#navigator_'+ t.environment).height ())) {
                        t.layers[layerId].moveInSerie (-1, mouseDownY);
                    }
                }
                $(window).bind('touchmove', function (eventMove) {  
                    eventMove.preventDefault();
                    var mouseMoveX = eventMove.originalEvent.touches[0].pageX,
                        mouseMoveY = eventMove.originalEvent.touches[0].pageY - 24;
                    if (t.environment !== 'portrait') {
                        if (mouseMoveY >= 0 && mouseMoveY < ($('#navigator_'+ t.environment).height ())) {
                            var deltaY = mouseMoveY - mouseDownY;                    
                            if (deltaY > 0) {
                                t.layers[layerId].moveInSerie (-1, mouseMoveY);
                            } else if (deltaY < 0) {
                                t.layers[layerId].moveInSerie (1, mouseMoveY);
                            }
                            mouseDownY = mouseMoveY;
                        }   
                    } else {
                        if (mouseMoveX >= 0 && mouseMoveX < ($('#navigator_'+ t.environment).width ())) {
                            var deltaX = mouseMoveX - mouseDownX;                             
                            if (deltaX > 0) {                                
                                t.layers[layerId].moveInSerie (-1, mouseMoveX);
                            } else if (deltaX < 0) {
                                t.layers[layerId].moveInSerie (1, mouseMoveX);
                            }
                            mouseDownX = mouseMoveX;
                        }   
                    }                                 
                });
            }
        } else if ((event.target.id === 'canvas_layer_1') || 
            (event.target.id === 'canvas_layer_2') || 
            (event.target.id === 'canvas_layer_3') || 
            (event.target.id === 'canvas_layer_4')) {            
            var layerId = event.target.id.substr(event.target.id.length - 7);
            t.__displayNavigatorBar (layerId);
            for (var layer in t.layers) {
                t.layers[layerId].addLocalizer (layer);
            }
        }
    }   
};
/*
 * Actions made in the environment with buttons.
 * 
 * @memberof maker
 */
MIRROR.maker.prototype.__actions = function (actionId) {
    switch (actionId) {
        case 'button_layers':
            if (!this.layersState && !this.load.charging && !this.magnifyingGlassState && !this.measuringState && !this.hounsfieldState && !this.windowLevelPresetsState) {
                this.__toolsWithout ();
                $('#layers').html (this.buttons.layers.active);
                this.layersState = true;   
            } else if (!this.load.charging && !this.magnifyingGlassState && !this.measuringState && !this.hounsfieldState && !this.windowLevelPresetsState) {
                $('#layers').html (this.buttons.layers.inactive);
                this.layersState = false;
            }
            if (this.layersState) {
                var submenu = $('<div><div>'),
                    layers = [],
                    title = '<div style="width: 100%; color: #FFF; font-weight: bold; text-align: center">'+ MIRROR.language.submenu['layers'] +'</div>';
                if (this.totalLayers === 1) {
                    layers.push ($('<div id="layers_1" style="display: inline-block;"></div>').html (this.buttons.layers_1.active));
                } else {
                    layers.push ($('<div id="layers_1" style="display: inline-block;"></div>').html (this.buttons.layers_1.inactive));
                }
                if (this.totalLayers === 2) {
                    layers.push ($('<div id="layers_2" style="display: inline-block;"></div>').html (this.buttons.layers_2.active));
                } else {
                    layers.push ($('<div id="layers_2" style="display: inline-block;"></div>').html (this.buttons.layers_2.inactive));
                }
                if (this.totalLayers === 3 && this.environment === 'desktop') {
                    layers.push ($('<div id="layers_3" style="display: inline-block;"></div>').html (this.buttons.layers_3.active));
                } else if (this.environment === 'desktop') {
                    layers.push ($('<div id="layers_3" style="display: inline-block;"></div>').html (this.buttons.layers_3.inactive));
                }   
                if (this.totalLayers === 4 && this.environment === 'desktop') {
                    layers.push ($('<div id="layers_4" style="display: inline-block;"></div>').html (this.buttons.layers_4.active));
                } else if (this.environment === 'desktop') {
                    layers.push ($('<div id="layers_4" style="display: inline-block;"></div>').html (this.buttons.layers_4.inactive));
                }
                submenu.append (title);
                for (var i = 0; i < layers.length; i++) {
                    submenu.append (layers[i]);
                }
                this.__submenu (submenu);
            } else if (!this.measuringState && !this.hounsfieldState && !this.windowLevelPresetsState) {
                $('#submenu').remove ();
            }
            break;
        case 'button_layers_1':            
            if (!this.magnifyingGlassState && !this.measuringState && !this.hounsfieldState && !this.windowLevelPresetsState) {
                this.totalLayers = 1;
                $('#layers_1').html (this.buttons.layers_1.active);
                $('#layers_2').html (this.buttons.layers_2.inactive);
                $('#layers_3').html (this.buttons.layers_3.inactive);
                $('#layers_4').html (this.buttons.layers_4.inactive);                
                this.__updateLayers ();
                this.__displayNavigatorBar ('layer_1');
                this.__responsiveSystem ();
                $('#imitation').html (this.buttons.imitation.disable);
                for (var layer in this.layers) {
                    this.layers[layer].removeLocalizer ();
                }
            }            
            break;
        case 'button_layers_2':
            if (!this.magnifyingGlassState && !this.measuringState && !this.hounsfieldState && !this.windowLevelPresetsState) {
                this.totalLayers = 2;
                $('#layers_1').html (this.buttons.layers_1.inactive);
                $('#layers_2').html (this.buttons.layers_2.active);
                $('#layers_3').html (this.buttons.layers_3.inactive);
                $('#layers_4').html (this.buttons.layers_4.inactive);
                this.__updateLayers ();
                this.__displayNavigatorBar ('layer_1');
                this.__responsiveSystem ();
                $('#imitation').html (this.buttons.imitation.inactive);
                for (var layer in this.layers) {
                    this.layers[layer].removeLocalizer ();
                }
            }            
            break;
        case 'button_layers_3':
            if (!this.magnifyingGlassState && !this.measuringState && !this.hounsfieldState && !this.windowLevelPresetsState) {
                this.totalLayers = 3;
                $('#layers_1').html (this.buttons.layers_1.inactive);
                $('#layers_2').html (this.buttons.layers_2.inactive);
                $('#layers_3').html (this.buttons.layers_3.active);
                $('#layers_4').html (this.buttons.layers_4.inactive);
                this.__updateLayers ();
                this.__displayNavigatorBar ('layer_1');
                this.__responsiveSystem ();
                $('#imitation').html (this.buttons.imitation.inactive);
                for (var layer in this.layers) {
                    this.layers[layer].removeLocalizer ();
                }
            }            
            break;
        case 'button_layers_4':
            if (!this.magnifyingGlassState && !this.measuringState && !this.hounsfieldState && !this.windowLevelPresetsState) {
                this.totalLayers = 4;
                $('#layers_1').html (this.buttons.layers_1.inactive);
                $('#layers_2').html (this.buttons.layers_2.inactive);
                $('#layers_3').html (this.buttons.layers_3.inactive);
                $('#layers_4').html (this.buttons.layers_4.active);
                this.__updateLayers ();
                this.__displayNavigatorBar ('layer_1');
                this.__responsiveSystem ();
                $('#imitation').html (this.buttons.imitation.inactive);
                for (var layer in this.layers) {
                    this.layers[layer].removeLocalizer ();
                }
            }            
            break;
        case 'button_thumbnails_series':
            if (!this.thumbnailsSeriesState && !this.measuringState && !this.hounsfieldState && !this.windowLevelPresetsState) {
                this.__toolsWithout ();
                $('#thumbnails_series').html (this.buttons.series.active);
                this.thumbnailsSeriesState = true; 
            } else if (!this.measuringState && !this.hounsfieldState && !this.windowLevelPresetsState) {
                $('#thumbnails_series').html (this.buttons.series.inactive);
                this.thumbnailsSeriesState = false;
            }
            if (this.thumbnailsSeriesState) {
                var thumbnailsSeries = $('<div></div>'),
                    thumbnailsSeriesTitle = $('<div style="min-width: 120px; color: #FFF; font-weight: bold; text-align: center">'+ MIRROR.language.submenu['series'] +'</div>'),
                    thumbnailsSeriesContent = $('<div id="series_thumbnails_submenu" style="position: relative; min-width: 120px; max-height: '+ ($(window).height () - 100) +'px; text-align: left; overflow: hidden; padding-left: 10px;"></div>');
                for (var thumb in this.thumbnails) {                    
                    thumbnailsSeriesContent.append (this.thumbnails[thumb]);                    
                }
                thumbnailsSeries.append (thumbnailsSeriesTitle);
                thumbnailsSeries.append (thumbnailsSeriesContent);
                this.__submenu (thumbnailsSeries);
                for (var thumb in this.thumbnails) {       
                    this.load.series[thumb].commonEventsHandler ();
                }
                if (this.load.blockAttachSerieMobile) {
                    $('#series_thumbnails_submenu').append(
                        '<div id="blockAttachSerie" style="display: table; position: absolute; left: 0px; top: 0px; width: 100%; height: '+ ($('#series_thumbnails_submenu').height ()) +'px; background: rgba(66, 66, 66, 0.8);">'+
                            '<div style="display: table-cell; vertical-align: middle">'+
                                '<img src="../img/loading.svg" />'+
                            '</div>'+
                        '</div>'
                    );
                } else {
                    if ($('#blockAttachSerie').length > 0) {
                        $('#blockAttachSerie').remove ();
                    }
                }
            } else if (!this.measuringState && !this.hounsfieldState && !this.windowLevelPresetsState) {
                $('#submenu').remove ();
            } 
            break;
        case 'button_magnifying_glass':
            if (!this.magnifyingGlassState && !this.filmModeState && !this.measuringState && !this.hounsfieldState) {
                this.__toolsWithout ();
                $('#magnifying_glass').html (this.buttons.magnifying_glass.active);
                this.magnifyingGlassState = true;
                $('#film_mode').html (this.buttons.film_mode.disable);
                $('#layers').html (this.buttons.layers.disable);
                $('#measuring').html (this.buttons.measuring.disable);
                $('#hounsfield').html (this.buttons.hu.disable);
                $('#reset').html (this.buttons.reset.disable);
            } else if (!this.filmModeState && !this.measuringState && !this.hounsfieldState) {
                $('#magnifying_glass').html (this.buttons.magnifying_glass.inactive);
                this.magnifyingGlassState = false;
                $('#film_mode').html (this.buttons.film_mode.inactive);
                $('#layers').html (this.buttons.layers.inactive);
                $('#measuring').html (this.buttons.measuring.inactive);
                $('#hounsfield').html (this.buttons.hu.inactive);
                $('#reset').html (this.buttons.reset.inactive);
            }
            for (var layer in this.layers) {
                this.layers[layer].magnifyingGlass ();
            }      
            break;
        case 'button_negative':
            if (!this.negativeState) {
                this.__toolsWithout ();
                $('#negative').html (this.buttons.negative.active);
                this.negativeState = true;
            } else {
                $('#negative').html (this.buttons.negative.inactive);
                this.negativeState = false;
            }
            for (var layer in this.layers) {
                this.layers[layer].negative ();
            }
            break;
        case 'button_film_mode':
            if (!this.filmModeState && !this.magnifyingGlassState && !this.measuringState && !this.hounsfieldState) {
                this.__toolsWithout ();
                $('#film_mode').html (this.buttons.film_mode.active);
                this.filmModeState = true;
                $('#magnifying_glass').html (this.buttons.magnifying_glass.disable);
                $('#measuring').html (this.buttons.measuring.disable);
                $('#hounsfield').html (this.buttons.hu.disable);
            } else if (!this.magnifyingGlassState && !this.measuringState && !this.hounsfieldState) {
                $('#film_mode').html (this.buttons.film_mode.inactive);
                this.filmModeState = false;
                $('#magnifying_glass').html (this.buttons.magnifying_glass.inactive);
                $('#measuring').html (this.buttons.measuring.inactive);
                $('#hounsfield').html (this.buttons.hu.inactive);
            }
            for (var layer in this.layers) {
                this.layers[layer].filmMode ();
            }
            break;
        case 'button_measuring':
            if (!this.measuringState && !this.hounsfieldState && !this.windowLevelPresetsState && !this.filmModeState && !this.magnifyingGlassState && !this.rotationState) {
                this.__toolsWithout ();
                $('#measuring').html (this.buttons.measuring.active);
                this.measuringState = true;
                $('#thumbnails_series').html (this.buttons.series.disable);
                $('#imitation').html (this.buttons.imitation.disable);
                $('#rotation').html (this.buttons.rotation.disable);
                $('#magnifying_glass').html (this.buttons.magnifying_glass.disable);
                $('#film_mode').html (this.buttons.film_mode.disable);
                $('#layers').html (this.buttons.layers.disable);
                $('#hounsfield').html (this.buttons.hu.disable);
                $('#window_level_presets').html (this.buttons.presets.disable);
                $('#reset').html (this.buttons.reset.disable);
            } else if (!this.hounsfieldState && !this.windowLevelPresetsState && !this.filmModeState && !this.magnifyingGlassState && !this.rotationState) {
                $('#measuring').html (this.buttons.measuring.inactive);
                this.measuringState = false;
                this.measuringSegmentState = false;
                this.measuringAngleState = false;
                this.measuringAreaState = false;
                for (var layer in this.layers) {
                    this.layers[layer].commonMeasuring ();
                }
                $('#thumbnails_series').html (this.buttons.series.inactive);
                if (this.totalLayers > 1) {
                    $('#imitation').html (this.buttons.imitation.inactive);
                }
                $('#rotation').html (this.buttons.rotation.inactive);
                $('#magnifying_glass').html (this.buttons.magnifying_glass.inactive);
                $('#film_mode').html (this.buttons.film_mode.inactive);
                $('#layers').html (this.buttons.layers.inactive);
                $('#hounsfield').html (this.buttons.hu.inactive);
                $('#window_level_presets').html (this.buttons.presets.inactive);
                $('#reset').html (this.buttons.reset.inactive);
            }            
            if (this.measuringState) {
                var submenu = $('<div></div>'),
                    container = $('<div style="display: table-cell;"></div>'),
                    title = '<div style="width: 100%; color: #FFF; font-weight: bold; text-align: center">'+ MIRROR.language.submenu['measuring'] +'</div>',
                    tools = [];
                tools.push ($('<div id="measuring_segment" style="display: inline-block;"></div>').html (this.buttons.segment.inactive));
                tools.push ($('<div id="measuring_angle" style="display: inline-block;"></div>').html (this.buttons.angle.inactive));
                tools.push ($('<div id="measuring_area" style="display: inline-block;"></div>').html (this.buttons.area.inactive));
                container.append (title);
                for (var i = 0; i < tools.length; i++) {
                    container.append (tools[i]);
                }
                submenu.append (container);
                submenu.append (
                    '<div style="display: table-cell; width: 10px;"></div>'+
                    '<div id="button_submenu_min" style="display: table-cell; cursor: pointer; background: #6C6C6C; width: 10px; vertical-align: middle; font-family: Oswald, sans-serif; font-size: 20pt; border-top-right-radius: 5px; border-bottom-right-radius: 5px;"><</div>'
                );
                this.__submenu (submenu);
                if (this.measuringTool === 'segment') {
                    this.__actions ('button_measuring_segment');
                } else if (this.measuringTool === 'angle') {
                    this.__actions ('button_measuring_angle');
                } else if (this.measuringTool === 'area') {
                    this.__actions ('button_measuring_area');
                }
            } else if (!this.hounsfieldState && !this.windowLevelPresetsState) {
                $('#submenu').remove ();
            }
            break;
        case 'button_measuring_segment':
            if (this.measuringState && !this.measuringSegmentState && !this.hounsfieldState && !this.windowLevelPresetsState && !this.filmModeState && !this.magnifyingGlassState) {
                this.__toolsWithoutMeasuring ();
                $('#measuring_segment').html (this.buttons.segment.active);
                this.measuringSegmentState = true;
                this.measuringTool = 'segment';
            } 
            for (var layer in this.layers) {
                this.layers[layer].measuringTool = 'segment';
                this.layers[layer].commonMeasuring ();
            }
            break;
        case 'button_measuring_angle':
            if (this.measuringState && !this.measuringAngleState && !this.hounsfieldState && !this.windowLevelPresetsState && !this.filmModeState && !this.magnifyingGlassState) {
                this.__toolsWithoutMeasuring ();
                $('#measuring_angle').html (this.buttons.angle.active);
                this.measuringAngleState = true;
                this.measuringTool = 'angle';
            } 
            for (var layer in this.layers) {
                this.layers[layer].measuringTool = 'angle';
                this.layers[layer].commonMeasuring ();
            }
            break;
        case 'button_measuring_area':
            if (this.measuringState && !this.measuringAreaState && !this.hounsfieldState && !this.windowLevelPresetsState && !this.filmModeState && !this.magnifyingGlassState) {
                this.__toolsWithoutMeasuring ();
                $('#measuring_area').html (this.buttons.area.active);
                this.measuringAreaState = true;
                this.measuringTool = 'area';
            } 
            for (var layer in this.layers) {
                this.layers[layer].measuringTool = 'area';
                this.layers[layer].commonMeasuring ();
            }
            break;
        case 'button_hounsfield':
            if (!this.hounsfieldState && !this.measuringState && !this.windowLevelPresetsState && !this.filmModeState && !this.magnifyingGlassState && !this.rotationState) {
                this.__toolsWithout ();
                $('#hounsfield').html (this.buttons.hu.active);
                this.hounsfieldState = true;
                for (var layer in this.layers) {
                    this.layers[layer].hounsfield.initialize();
                }
                $('#thumbnails_series').html (this.buttons.series.disable);
                $('#imitation').html (this.buttons.imitation.disable);
                $('#rotation').html (this.buttons.rotation.disable);
                $('#magnifying_glass').html (this.buttons.magnifying_glass.disable);
                $('#film_mode').html (this.buttons.film_mode.disable);
                $('#layers').html (this.buttons.layers.disable);
                $('#measuring').html (this.buttons.measuring.disable);
                $('#window_level_presets').html (this.buttons.presets.disable);
                $('#reset').html (this.buttons.reset.disable);
            } else if (this.hounsfieldState && !this.measuringState && !this.windowLevelPresetsState && !this.filmModeState && !this.magnifyingGlassState && !this.rotationState) {
                $('#hounsfield').html (this.buttons.hu.inactive);
                this.hounsfieldState = false;
                for (var layer in this.layers) {
                    this.layers[layer].hounsfield.clear();
                }
                $('#thumbnails_series').html (this.buttons.series.inactive);
                if (this.totalLayers > 1) {
                    $('#imitation').html (this.buttons.imitation.inactive);
                }
                $('#rotation').html (this.buttons.rotation.inactive);
                $('#magnifying_glass').html (this.buttons.magnifying_glass.inactive);
                $('#film_mode').html (this.buttons.film_mode.inactive);
                $('#layers').html (this.buttons.layers.inactive);
                $('#measuring').html (this.buttons.measuring.inactive);
                $('#window_level_presets').html (this.buttons.presets.inactive);
                $('#reset').html (this.buttons.reset.inactive);
            }

            if (this.hounsfieldState) {
                var submenu = $('<div></div>'),
                    container = $('<div style="display: table-cell;"></div>'),
                    title = '<div style="width: 100%; color: #FFF; font-weight: bold; text-align: center">'+ MIRROR.language.submenu['hounsfield'] +'</div>',
                    tools = [];
                tools.push ($('<div id="hounsfield_point" style="display: inline-block;"></div>').html (this.buttons.point.inactive));
                tools.push ($('<div id="hounsfield_ellipse" style="display: inline-block;"></div>').html (this.buttons.ellipse.inactive));
                tools.push ($('<div id="hounsfield_polygon" style="display: inline-block;"></div>').html (this.buttons.polygon.inactive));
                container.append (title);
                for (var i = 0; i < tools.length; i++) {
                    container.append (tools[i]);
                }
                submenu.append (container);
                submenu.append (
                    '<div style="display: table-cell; width: 10px;"></div>'+
                    '<div id="button_submenu_min" style="display: table-cell; cursor: pointer; background: #6C6C6C; width: 10px; vertical-align: middle; font-family: Oswald, sans-serif; font-size: 20pt; border-top-right-radius: 5px; border-bottom-right-radius: 5px;"><</div>'
                );
                this.__submenu (submenu);
            } else if (!this.measuringState && !this.windowLevelPresetsState) {
                $('#submenu').remove ();
            }
            break;
        case 'button_hounsfield_point':
            if (this.hounsfieldState && !this.measuringState && !this.windowLevelPresetsState && !this.filmModeState && !this.magnifyingGlassState) {
                $('#hounsfield_point').html (this.buttons.point.active);
                $('#hounsfield_ellipse').html (this.buttons.ellipse.inactive);
                $('#hounsfield_polygon').html (this.buttons.polygon.inactive);
                for (var layer in this.layers) {
                    this.layers[layer].hounsfield.selectPointTool();
                }
            }
            break;
        case 'button_hounsfield_ellipse':
            if (this.hounsfieldState && !this.measuringState && !this.windowLevelPresetsState && !this.filmModeState && !this.magnifyingGlassState) {
                $('#hounsfield_point').html (this.buttons.point.inactive);
                $('#hounsfield_ellipse').html (this.buttons.ellipse.active);
                $('#hounsfield_polygon').html (this.buttons.polygon.inactive);
                for (var layer in this.layers) {
                    this.layers[layer].hounsfield.selectElipseTool();
                }
            }
            break;
        case 'button_hounsfield_polygon':
            if (this.hounsfieldState && !this.measuringState && !this.windowLevelPresetsState && !this.filmModeState && !this.magnifyingGlassState) {
                $('#hounsfield_point').html (this.buttons.point.inactive);
                $('#hounsfield_ellipse').html (this.buttons.ellipse.inactive);
                $('#hounsfield_polygon').html (this.buttons.polygon.active);
                for (var layer in this.layers) {
                    this.layers[layer].hounsfield.selectPolygonTool();
                }
            }
            break;
        case 'button_rotation':
            if (!this.rotationState && !this.measuringState && !this.hounsfieldState) {
                $('#rotation').html (this.buttons.rotation.active);
                this.rotationState = true;
                $('#measuring').html (this.buttons.measuring.disable);
                $('#hounsfield').html (this.buttons.hu.disable);
            } else if (!this.measuringState && !this.hounsfieldState) {
                $('#rotation').html (this.buttons.rotation.inactive);
                this.rotationState = false;
                $('#measuring').html (this.buttons.measuring.inactive);
                $('#hounsfield').html (this.buttons.hu.inactive);
            }
            break;
        case 'button_window_level_presets':
            if (!this.windowLevelPresetsState && !this.measuringState && !this.hounsfieldState) {
                this.__toolsWithout ();
                $('#window_level_presets').html (this.buttons.presets.active);
                this.windowLevelPresetsState = true;  
                $('#thumbnails_series').html (this.buttons.series.disable);
                $('#layers').html (this.buttons.layers.disable);
                $('#measuring').html (this.buttons.measuring.disable);
                $('#hounsfield').html (this.buttons.hu.disable);
            } else if (!this.measuringState && !this.hounsfieldState) {
                $('#window_level_presets').html (this.buttons.presets.inactive);
                this.windowLevelPresetsState = false;
                $('#thumbnails_series').html (this.buttons.series.inactive);
                $('#layers').html (this.buttons.layers.inactive);
                $('#measuring').html (this.buttons.measuring.inactive);
                $('#hounsfield').html (this.buttons.hu.inactive);
            }
            if (this.windowLevelPresetsState) {
                var submenu = $('<div></div>'),
                    title = '<div style="width: 100%; color: #FFF; font-weight: bold; text-align: center">'+ MIRROR.language.submenu['presets'] +'</div>',
                    presets = [];
                presets.push ($('<div id="presets_default" style="display: inline-block;"></div>').html (this.buttons.default.inactive));
                presets.push ($('<div id="presets_bone" style="display: inline-block;"></div>').html (this.buttons.bone.inactive));
                presets.push ($('<div id="presets_abdomen" style="display: inline-block;"></div>').html (this.buttons.abdomen.inactive));
                presets.push ($('<div id="presets_angio" style="display: inline-block;"></div>').html (this.buttons.angio.inactive));
                presets.push ($('<div id="presets_brain" style="display: inline-block;"></div>').html (this.buttons.brain.inactive));
                presets.push ($('<div id="presets_chest" style="display: inline-block;"></div>').html (this.buttons.chest.inactive));
                presets.push ($('<div id="presets_lungs" style="display: inline-block;"></div>').html (this.buttons.lungs.inactive));
                submenu.append (title);
                for (var i = 0; i < presets.length; i++) {
                    submenu.append (presets[i]);
                }
                this.__submenu (submenu);
            } else if (!this.measuringState && !this.hounsfieldState) {
                $('#submenu').remove ();
            }
            break;
        case 'button_window_level_presets_default':
            if (this.windowLevelPresetsState && !this.windowLevelPresetsDefaultState && !this.filmModeState && !this.magnifyingGlassState) {
                this.__toolsWithoutPresets ();
                $('#presets_default').html (this.buttons.default.active);
                this.windowLevelPresetsDefaultState = true;
            } 
            for (var layer in this.layers) {
                this.layers[layer].windowLevelPresets ('default');
            }
            break;
        case 'button_window_level_presets_bone':
            if (this.windowLevelPresetsState && !this.windowLevelPresetsBoneState && !this.filmModeState && !this.magnifyingGlassState) {
                this.__toolsWithoutPresets ();
                $('#presets_bone').html (this.buttons.bone.active);
                this.windowLevelPresetsBoneState = true;
            } 
            for (var layer in this.layers) {
                this.layers[layer].windowLevelPresets ('bone');
            }
            break;
        case 'button_window_level_presets_abdomen':
            if (this.windowLevelPresetsState && !this.windowLevelPresetsAbdomenState && !this.filmModeState && !this.magnifyingGlassState) {
                this.__toolsWithoutPresets ();
                $('#presets_abdomen').html (this.buttons.abdomen.active);
                this.windowLevelPresetsAbdomenState = true;
            } 
            for (var layer in this.layers) {
                this.layers[layer].windowLevelPresets ('abdomen');
            }
            break;
        case 'button_window_level_presets_angio':
            if (this.windowLevelPresetsState && !this.windowLevelPresetsAngioState && !this.filmModeState && !this.magnifyingGlassState) {
                this.__toolsWithoutPresets ();
                $('#presets_angio').html (this.buttons.angio.active);
                this.windowLevelPresetsAngioState = true;
            } 
            for (var layer in this.layers) {
                this.layers[layer].windowLevelPresets ('angio');
            }
            break;
        case 'button_window_level_presets_brain':
            if (this.windowLevelPresetsState && !this.windowLevelPresetsBrainState && !this.filmModeState && !this.magnifyingGlassState) {
                this.__toolsWithoutPresets ();
                $('#presets_brain').html (this.buttons.brain.active);
                this.windowLevelPresetsBrainState = true;
            } 
            for (var layer in this.layers) {
                this.layers[layer].windowLevelPresets ('brain');
            }
            break;
        case 'button_window_level_presets_chest':
            if (this.windowLevelPresetsState && !this.windowLevelPresetsChestState && !this.filmModeState && !this.magnifyingGlassState) {
                this.__toolsWithoutPresets ();
                $('#presets_chest').html (this.buttons.chest.active);
                this.windowLevelPresetsChestState = true;
            } 
            for (var layer in this.layers) {
                this.layers[layer].windowLevelPresets ('chest');
            }
            break;
        case 'button_window_level_presets_lungs':
            if (this.windowLevelPresetsState && !this.windowLevelPresetsLungsState && !this.filmModeState && !this.magnifyingGlassState) {
                this.__toolsWithoutPresets ();
                $('#presets_lungs').html (this.buttons.lungs.active);
                this.windowLevelPresetsLungsState = true;
            } 
            for (var layer in this.layers) {
                this.layers[layer].windowLevelPresets ('lungs');
            }
            break;
        case 'button_close':
            window.close ();
            break;
        case 'button_close_popup':
            $('#popup').remove ();        
            break;
        case 'button_reset':
            if (this.negativeState) {
                this.__actions ('button_negative'); 
            }            
            if (!this.magnifyingGlassState && !this.measuringState && !this.hounsfieldState && !this.windowLevelPresetsState) {
                for (var layer in this.layers) {
                    this.layers[layer].defaultState ();
                }
            }            
            break;
        case 'button_reports':
            $('#label_title_modal').html (MIRROR.language.modal['report_title']);
            $('#content_modal').html ('content report');
            break;
        case 'button_email':
            $('#label_title_modal').html (MIRROR.language.modal['email_title']);
            $('#content_modal').html ('content email');
            break;
        case 'button_info_phone':
            this.modalContent = '';
            if (this.layers['layer_1'].serieIdCharged !== null) {
                if (this.load.series[this.layers['layer_1'].serieIdCharged].patientName !== null) {
                    this.modalContent += MIRROR.language.dicomInformation['patient_name'] +': '+ this.load.series[this.layers['layer_1'].serieIdCharged].patientName +'<br />';
                }
                if (this.load.series[this.layers['layer_1'].serieIdCharged].patientRut !== null) {
                    this.modalContent += MIRROR.language.dicomInformation['dni_age'] +': '+ this.load.series[this.layers['layer_1'].serieIdCharged].patientRut +'<br />';
                }
                if (this.load.series[this.layers['layer_1'].serieIdCharged].patientSex !== null) {
                    this.modalContent += MIRROR.language.dicomInformation['sex'] +': '+ this.load.series[this.layers['layer_1'].serieIdCharged].patientSex +'<br />';
                }
                if (this.load.studyDescription !== null) {
                    this.modalContent += MIRROR.language.dicomInformation['study_desc'] +': '+ this.load.studyDescription +'<br />';
                }
                if (this.load.series[this.layers['layer_1'].serieIdCharged].serieDescription !== null) {
                    this.modalContent += MIRROR.language.dicomInformation['serie_desc'] +': '+ this.load.series[this.layers['layer_1'].serieIdCharged].serieDescription +'<br />';
                }
                if (this.load.series[this.layers['layer_1'].serieIdCharged].serieBodyPart !== null) {
                    this.modalContent += MIRROR.language.dicomInformation['body_part'] +': '+ this.load.series[this.layers['layer_1'].serieIdCharged].serieBodyPart +'<br />';
                }
                if (this.load.series[this.layers['layer_1'].serieIdCharged].serieName !== null) {
                    this.modalContent += MIRROR.language.dicomInformation['serie_name'] +': '+ this.load.series[this.layers['layer_1'].serieIdCharged].serieName +'<br />';
                }
                if (this.load.series[this.layers['layer_1'].serieIdCharged].modality !== null) {
                    this.modalContent += MIRROR.language.dicomInformation['modality'] +': '+ this.load.series[this.layers['layer_1'].serieIdCharged].modality +'<br />';
                }
                if (this.load.series[this.layers['layer_1'].serieIdCharged].institution !== null) {
                    this.modalContent += MIRROR.language.dicomInformation['institution'] +': '+ this.load.series[this.layers['layer_1'].serieIdCharged].institution;      
                }
                $('#label_title_modal').html (MIRROR.language.modal['info_title']);
                $('#content_modal').html (this.modalContent);
            } else {
                this.modalContent += MIRROR.language.modal['info_content_no_data'];
                $('#label_title_modal').html (MIRROR.language.modal['info_title']);
                $('#content_modal').html (this.modalContent);
            }           
            break;
        case 'button_info':
            if (!this.infoState) {
                $('#button_info').css ({
                    'background': '#F69322', 
                    'padding-left': '8px', 
                    'padding-right': '8px', 
                    'border': '1px #F69322 solid',
                    'border-radius': '2px',
                    'color': '#FFF'
                });
                this.infoState = true;
            } else {
                $('#button_info').css ({
                    'background': '#4C4C4C', 
                    'padding-left': '8px', 
                    'padding-right': '8px', 
                    'border': '1px #F69322 solid',
                    'border-radius': '2px',
                    'color': '#FFF'
                });
                this.infoState = false;
            }
            for (var layer in this.layers) {
                this.layers[layer].displayDicomLayerInformation ();
            }
            break;
        case 'button_submenu_min':
            this.submenuContent = $('#submenu').children();
            $('#submenu').remove ();
            var submenu = $('<div></div>');
            if (this.environment === 'desktop') {
                submenu.append (
                    '<div style="display: table-cell; width: 5px; height: 70px;"></div>'+
                    '<div id="button_submenu_max" style="display: table-cell; cursor: pointer; color: #FFF; background: #F69322; width: 15px; vertical-align: middle; font-family: Oswald, sans-serif; font-size: 20pt; border-top-right-radius: 5px; border-bottom-right-radius: 5px;">></div>'
                );
            } else {
                submenu.append (
                    '<div style="display: table-cell; width: 5px; height: 60px;"></div>'+
                    '<div id="button_submenu_max" style="display: table-cell; cursor: pointer; color: #FFF; background: #F69322; width: 15px; vertical-align: middle; font-family: Oswald, sans-serif; font-size: 20pt; border-top-right-radius: 5px; border-bottom-right-radius: 5px;">></div>'
                );
            }           
            this.__submenu (submenu);
            break;
        case 'button_submenu_max':
            $('#submenu').remove ();
            this.__submenu (this.submenuContent);
            break;
        case 'button_imitation':
            if (this.totalLayers > 1 && !this.measuringState && !this.hounsfieldState) {
                if (!this.imitationLayers) {
                    var firstSelected = false;
                    for (var layer in this.layers) {
                        if (!firstSelected && this.layers[layer].serieIdCharged !== null && this.layers[layer].selected && this.layers[layer].displayed) {
                            this.__toolsWithout ();
                            $('#imitation').html (this.buttons.imitation.active);
                            this.imitationLayers = true;                
                            this.layers[layer].leadImitation = true;
                            $('#'+ layer).css({
                                'border': '3px solid red'
                            });
                            firstSelected = true;
                        }
                    }                    
                } else {
                    $('#imitation').html (this.buttons.imitation.inactive);
                    this.imitationLayers = false;
                    for (var layer in this.layers) {
                        if (this.layers[layer].selected && this.layers[layer].leadImitation) {
                            this.layers[layer].leadImitation = false;
                            $('#'+ layer).css({
                                'border': '3px solid #FCBE39'
                            });
                        }
                    } 
                }
            }    
            break;
    }
};
/*
 * Exclude tools.
 * 
 * @memberof maker
 */
MIRROR.maker.prototype.__toolsWithout = function () {
    if (this.layersState || this.thumbnailsSeriesState || this.windowLevelPresetsState) {
        this.layersState = false; 
        this.thumbnailsSeriesState = false;
        this.windowLevelPresetsState = false;
        $('#layers').html (this.buttons.layers.inactive);  
        $('#thumbnails_series').html (this.buttons.series.inactive);
        $('#window_level_presets').html (this.buttons.presets.inactive);
        $('#submenu').remove ();
    }
};
/*
 * Exclude measuring tools.
 * 
 * @memberof maker
 */
MIRROR.maker.prototype.__toolsWithoutMeasuring = function () {
    if (this.measuringSegmentState || this.measuringAngleState || this.measuringAreaState) {
        this.measuringSegmentState = false; 
        this.measuringAngleState = false;
        this.measuringAreaState = false;
        $('#measuring_segment').html (this.buttons.segment.inactive);                      
        $('#measuring_angle').html (this.buttons.angle.inactive);
        $('#measuring_area').html (this.buttons.area.inactive);
    }
};
/*
 * Exclude window level presets tools.
 * 
 * @memberof maker
 */
MIRROR.maker.prototype.__toolsWithoutPresets = function () {
    if (this.windowLevelPresetsDefaultState || this.windowLevelPresetsBoneState || this.windowLevelPresetsAbdomenState || 
        this.windowLevelPresetsAngioState || this.windowLevelPresetsBrainState || this.windowLevelPresetsChestState || 
        this.windowLevelPresetsLungsState) {
        this.windowLevelPresetsDefaultState = false;
        this.windowLevelPresetsBoneState = false;
        this.windowLevelPresetsAbdomenState = false;
        this.windowLevelPresetsAngioState = false;
        this.windowLevelPresetsBrainState = false;
        this.windowLevelPresetsChestState = false;
        this.windowLevelPresetsLungsState = false;
        $('#presets_default').html (this.buttons.default.inactive);
        $('#presets_bone').html (this.buttons.bone.inactive);
        $('#presets_abdomen').html (this.buttons.abdomen.inactive);
        $('#presets_angio').html (this.buttons.angio.inactive);
        $('#presets_brain').html (this.buttons.brain.inactive);
        $('#presets_chest').html (this.buttons.chest.inactive);
        $('#presets_lungs').html (this.buttons.lungs.inactive);  
    }
};
/*
 * It generates first instance of a context.
 * 
 * @memberof maker
 */
MIRROR.maker.prototype.__setLayers = function () { 
    $('#workspace').html(MIRROR.ui['layers_'+ this.totalLayers]);
    if (this.environment !== 'desktop') {
        this.__layersSizeConfiguration ();
    } 
    for (var i = 1; i <= this.maxTotalLayers; i++) {
        this.layers['layer_'+ i] = new MIRROR.layer (this, 'layer_'+ i);
        if (i <= this.totalLayers) {
            this.layers['layer_'+ i].displayed = true;
        } else {
            this.layers['layer_'+ i].displayed = false;
        }
        this.layers['layer_'+ i].init ($('#layer_'+ i).width (), $('#layer_'+ i).height ());
        if (i === 1) {
            this.layers['layer_'+ i].selected = true;
        }        
    }
    
};
/*
 * Updates the configuration of the contexts.
 * 
 * @memberof maker
 */
MIRROR.maker.prototype.__updateLayers = function () {
    var layersSort = {},
        i = 1;
    for (var layer in this.layers) {
        if (this.layers[layer].selected) {
            layersSort['layer_'+ i] = this.layers[layer];
            i++;
        }            
    }
    for (var layer in this.layers) {
        if (!this.layers[layer].selected) {
            layersSort['layer_'+ i] = this.layers[layer];
            i++;
        }            
    }
    this.layers = layersSort;
    for (var i = 1;  i <= this.maxTotalLayers; i++) {
        if (i <= this.totalLayers) {
            this.layers['layer_'+ i].displayed = true;
        } else {
            this.layers['layer_'+ i].displayed = false;
            this.layers['layer_'+ i].serieIdCharged = null;
        }
        this.layers['layer_'+ i].updateContext ();
    }
    $('#workspace').html (MIRROR.ui['layers_'+ this.totalLayers]);
    if (this.environment !== 'desktop') {
        this.__layersSizeConfiguration ();
    } 
    for (var i = 1;  i <= this.totalLayers; i++) {
        if (this.layers['layer_'+ i].displayed) {
            this.layers['layer_'+ i].updateLayerConfiguration ('layer_'+ i, $('#layer_'+ i).width (), $('#layer_'+ i).height ());
        }        
    }
    if (this.totalLayers === 1) {
        this.__actions ('button_imitation');     
    }
    this.__checkSeriesDisplayed ();
};
/*
 * Load the study.
 * 
 * @memberof maker
 */
MIRROR.maker.prototype.__loadStudy = function () {
    this.load = new MIRROR.loader (this, this.studyId);
    this.load.study ();
};
/*
 * It assigns a set to a context.
 * 
 * @memberof maker
 */
MIRROR.maker.prototype.attachSerieToLayer = function (layerId, serieId) {
    if (this.layers[layerId].displayed) {
        if (this.layers[layerId].serieIdCharged === null || !this.load.series[this.layers[layerId].serieIdCharged].charging) {
            this.layers[layerId].selected = true;
            $('#'+ this.layers[layerId].layerId).css({
                'border': '3px solid #FCBE39'
            });
            this.layers[layerId].serieIdCharged = serieId; 
            this.__checkSeriesDisplayed ();
            this.load.series[serieId].setMultiplierPaddingNavigatorBar ();
            this.__displayNavigatorBar (layerId);
            this.load.statusSerie (layerId, serieId);
        }        
    }
};
/*
 * Updates the configuration for a new orientation.
 * 
 * @memberof maker
 */
MIRROR.maker.prototype.__orientationChangeLayers = function () {
    $('#workspace').html (MIRROR.ui['layers_'+ this.totalLayers]); 
    this.__layersSizeConfiguration ();
    for (var layer in this.layers) {
        if (this.layers[layer].displayed) {
            this.layers[layer].updateLayerConfiguration (layer, $('#'+ layer).width (), $('#'+ layer).height ()); 
        } 
    }
    for (var i = 0; i < this.load.totalSeries; i++) {
        this.load.series['serie_'+ i].setMultiplierPaddingNavigatorBar ();
    }
    this.__displayNavigatorBar ('layer_1');
};
/*
 * Check if series are displayed for thumbnails.
 * 
 * @memberof maker
 */
MIRROR.maker.prototype.__checkSeriesDisplayed = function () {    
    for (var serie in this.load.series) {        
        var count = 0;
        for (var layer in this.layers) {
            if (serie === this.layers[layer].serieIdCharged) {
                count++;
            }
        }
        if (count > 0) {            
            $('#'+ serie).css ('border', '1px solid #F69322');
        } else {
            $('#'+ serie).css ('border', '1px solid #4C4C4C');
        }
    }
};
/*
 * Displays general environment information.
 * 
 * @memberof maker
 */
MIRROR.maker.prototype.globalInformation = function () {
    var content = '';
    content += MIRROR.language.globalInformation['total_series'] +': '+ this.load.totalSeries;
    content += ' | '+ MIRROR.language.globalInformation['total_series_charged'] +': '+ this.load.totalSeriesCharged;
    content += ' | '+ MIRROR.language.globalInformation['total_layers_selected'] +': '+ this.__totalLayersSelectedGlobalInformation ();
    if (this.infoState) {
        content += ' | <div id="button_info" style="display: inline-block; cursor: pointer; background: #F69322; padding-left: 8px; padding-right: 8px; border: 1px #F69322 solid; border-radius: 2px; color: #FFF;">'+ MIRROR.language.globalInformation['info'] +'</div>';
    } else {
        content += ' | <div id="button_info" style="display: inline-block; cursor: pointer; background: #4C4C4C; padding-left: 8px; padding-right: 8px; border: 1px #F69322 solid; border-radius: 2px; color: #FFF;">'+ MIRROR.language.globalInformation['info'] +'</div>';
    }  
    $('#general_information').html (content);
};
/*
 * Selected contexts counter.
 * 
 * @memberof maker
 * @return integer
 */
MIRROR.maker.prototype.__totalLayersSelectedGlobalInformation = function () {
    var count = 0;
    for (var layer in this.layers) {
        if (this.layers[layer].selected) {
            count++;
        }
    }
    return count;
};
/*
 * Draw the environment on the DOM.
 * 
 * @memberof maker
 */
MIRROR.maker.prototype.__updateDOM = function () {
    var t = this;
    if (t.browser === 'msie') {
        $('#main').html (MIRROR.ui[t.environment]);
    } else {
        $('body').html (MIRROR.ui[t.environment]);
    }    
    $('#mirror').html ('');
    $('#mirror').append (MIRROR.ui['toolsbar_'+ t.environment]);
    $('#mirror').append (MIRROR.ui['workspace_'+ t.environment]);
    $('#mirror').append (MIRROR.ui['navigator_'+ t.environment]);
    $('#copyright_year').html (MIRROR.copyrightDate);
    $('#version'). html (MIRROR.version);
    t.__responsiveSystem ();
    t.__toolsInEnvironment ();
    t.__toolsButtonsSizeStyle ();
    if (t.environment !== 'desktop') {
        if (t.loadingStudyCounterMobile === 0) {
            t.__loadingStudy ();
        }        
        t.loadingStudyCounterMobile++;
    } else {
        t.__loadingStudy ();
    }    
};
/*
 * Adjust the proportions of the environment on the screen.
 * 
 * @memberof maker
 */
MIRROR.maker.prototype.__responsiveSystem = function () {
    var t = this;
    if (t.environment === 'desktop') {
        var toolsbarWidth = 102,
            toolsbarHeight = $(window).height () - 3,
            navigatorWidth = 50,
            navigatorHeight = $(window).height () - 31,
            workspaceParentWidth = $(window).width () - toolsbarWidth - navigatorWidth - 14,
            workspaceParentHeight = $(window).height () - 3,
            workspaceHeight = $(window).height () - 51;
        $('#toolsbar_'+ t.environment).width (toolsbarWidth);
        $('#toolsbar_'+ t.environment).height (toolsbarHeight);
        $('#navigator_'+ t.environment).width (navigatorWidth);
        $('#navigator_'+ t.environment).height (navigatorHeight);
        $('#workspace').parent().width (workspaceParentWidth);
        $('#workspace').parent().height (workspaceParentHeight);
        $('#workspace').height (workspaceHeight);
        var seriesToolsbarHeight = ($(window).height ()) - ($('#series_toolsbar').offset().top + 8);
        $('#series_toolsbar').height (seriesToolsbarHeight);
        if (this.load !== null) {
            if (this.load.studyCharged) {
                $('#series_toolsbar').perfectScrollbar('update');
            }
        }
        if ($(window).width () < 660) {
            $('#general_information').css ('display', 'none');
        } else {
            $('#general_information').css ('display', 'table-cell');
        }
        if (this.totalLayers === 1) {
            $('#layer_1').height (workspaceHeight - 6);
        } else if (this.totalLayers === 2) {
            $('#layer_1').height (workspaceHeight - 6);
            $('#layer_2').height (workspaceHeight - 6);
        } else if (this.totalLayers === 3) {
            $('#layer_1').height ((workspaceHeight / 2) - 6);
            $('#layer_2').height ((workspaceHeight / 2) - 6);
            $('#layer_3').height (workspaceHeight - 6);
        } else if (this.totalLayers === 4) {
            $('#layer_1').height ((workspaceHeight / 2) - 6);
            $('#layer_2').height ((workspaceHeight / 2) - 6);
            $('#layer_3').height ((workspaceHeight / 2) - 6);
            $('#layer_4').height ((workspaceHeight / 2) - 6);
        }        
        for (var layer in t.layers) {
            if (t.layers[layer].displayed) {
                t.layers[layer].responsiveLayer ($('#'+ layer).width (), $('#'+ layer).height ());
            }            
        }
    } else if (t.environment === 'landscape') {
        if (t.isPhone) {
            $('.btn').css('font-size', '10px');            
            $('#general_information').parent().remove();
            var navigatorWidth = 30,    
                toolsbarWidth = 50,            
                workspaceWidth = $(window).width () - toolsbarWidth - navigatorWidth - 14;
            $('#toolsbar_'+ t.environment).width (toolsbarWidth);
            $('#toolsbar_'+ t.environment).height ($(window).height () - 3);
            $('#navigator_'+ t.environment).width (navigatorWidth);
            $('#navigator_'+ t.environment).height ($(window).height () - 31);
            $('#workspace').parent().width (workspaceWidth); 
            $('#workspace').parent().height ($(window).height () - 3);
            $('#workspace').height (($(window).height () - 31)); 
            $('#button_imitation').remove ();
            $('#button_layers').remove ();
        } else {
            var navigatorWidth = 50,
                toolsbarWidth = 50,            
                workspaceWidth = $(window).width () - toolsbarWidth - navigatorWidth - 14;
            $('#toolsbar_'+ t.environment).width (toolsbarWidth);
            $('#toolsbar_'+ t.environment).height ($(window).height () - 3);
            $('#navigator_'+ t.environment).width (navigatorWidth);
            $('#navigator_'+ t.environment).height ($(window).height () - 31);
            $('#workspace').parent().width (workspaceWidth); 
            $('#workspace').parent().height ($(window).height () - 3);
            $('#workspace').height (($(window).height () - 51));   
        }
    } else if (t.environment === 'portrait') {
        if (t.isPhone) {
            $('.btn').css('font-size', '7px');
            var toolsbarHeight = 34,
                navigatorHeight = 30,
                workspaceHeight = $(window).height () - toolsbarHeight - navigatorHeight - 33;
            $('#workspace').parent().height (workspaceHeight); 
            $('#workspace').height (workspaceHeight); 
            $('#navigator_'+ t.environment).height (31);
            $('#button_imitation').remove ();
            $('#button_layers').remove ();
            $('#copyright').css ('font-size', '12px');
        } else {            
            var toolsbarHeight = 52,
                navigatorHeight = 50,
                workspaceHeight = $(window).height () - toolsbarHeight - navigatorHeight - 13;
            $('#workspace').parent().height (workspaceHeight); 
            $('#workspace').height (workspaceHeight);
        } 
    }          
};
MIRROR.maker.prototype.__loadingStudy = function () {
    var elementDOM = ''+
        '<div id="loading_study" style="display: table; position: absolute; left: 0px; top: 0px; z-index: 1500; width: 100%; height: '+ $(window).height () +'px; background: rgba(66, 66, 66, 0.8);">'+
            '<div style="display: table-cell; vertical-align: middle; text-align: center">'+
                '<img src="../img/loading.svg" /><br />'+
                '<span style="color: #F69322; cursor: default; font-family: Oswald, sans-serif; font-size: 20pt; -webkit-user-select: none; -moz-user-select: -moz-none; -ms-user-select: none; user-select: none;">'+ MIRROR.language.mirror['loading_study'] +'</span>'+
            '</div>'+
        '</div>';
    $('body').append (elementDOM);
};
/*
 * Check if window level is null and remove presets it is.
 * 
 * @memberof maker
 */
MIRROR.maker.prototype.checkIfWindowLevelIsSet = function (dataParsed) {
    var countIsSet = 0;
    for (var i = 0; i < dataParsed.length; i++) {
        if (dataParsed[i].windowWidth === null && dataParsed[i].windowCenter === null) {
            countIsSet++;
        }
    }
    if (countIsSet === dataParsed.length && this.renderType === 'webgl') {
        $('#window_level_presets').remove ();
    }
    if (this.environment === 'desktop') {
        var seriesToolsbarHeight = ($(window).height ()) - ($('#series_toolsbar').offset().top + 8);
        $('#series_toolsbar').height (seriesToolsbarHeight);
    }    
};
/*
 * Selected tools for the environment.
 * 
 * @memberof maker
 */
MIRROR.maker.prototype.__toolsInEnvironment = function () {
    var tools = [];
    if (this.environment === 'desktop') {
        if (this.renderType === 'webgl') {
            tools.push($('<div id="imitation" style="display: inline-block;"></div>').html (this.buttons.imitation.disable));
            tools.push($('<div id="rotation" style="display: inline-block;"></div>').html (this.buttons.rotation.inactive));
            tools.push($('<div id="magnifying_glass" style="display: inline-block;"></div>').html (this.buttons.magnifying_glass.inactive));
            tools.push($('<div id="negative" style="display: inline-block;"></div>').html (this.buttons.negative.inactive));
            tools.push($('<div id="film_mode" style="display: inline-block;"></div>').html (this.buttons.film_mode.inactive));
            tools.push($('<div id="layers" style="display: inline-block;"></div>').html (this.buttons.layers.inactive));
            tools.push($('<div id="measuring" style="display: inline-block;"></div>').html (this.buttons.measuring.inactive));
            tools.push($('<div id="hounsfield" style="display: inline-block;"></div>').html (this.buttons.hu.inactive));
            tools.push($('<div id="window_level_presets" style="display: inline-block;"></div>').html (this.buttons.presets.inactive));
            tools.push($('<div id="reset" style="display: inline-block;"></div>').html (this.buttons.reset.inactive));
            tools.push($('<div id="close" style="display: inline-block;"></div>').html (this.buttons.close.inactive));
            if (this.reportsState) {
                    tools.push($('<div id="reports" style="display: inline-block;"></div>').html (this.buttons.reports.inactive));
                } else {
                    tools.push($('<div id="reports" style="display: inline-block;"></div>').html (this.buttons.reports.disable));
                }  
            if (this.mailState) {
                tools.push($('<div id="email" style="display: inline-block;"></div>').html (this.buttons.email.inactive)); 
            } else {
                tools.push($('<div id="email" style="display: inline-block;"></div>').html (this.buttons.email.disable)); 
            }            
        } else if (this.renderType === 'canvas2d') {
            tools.push($('<div id="imitation" style="display: inline-block;"></div>').html (this.buttons.imitation.disable));
            tools.push($('<div id="rotation" style="display: inline-block;"></div>').html (this.buttons.rotation.inactive));
            tools.push($('<div id="magnifying_glass" style="display: inline-block;"></div>').html (this.buttons.magnifying_glass.inactive));
            tools.push($('<div id="negative" style="display: inline-block;"></div>').html (this.buttons.negative.inactive));
            tools.push($('<div id="film_mode" style="display: inline-block;"></div>').html (this.buttons.film_mode.inactive));
            tools.push($('<div id="layers" style="display: inline-block;"></div>').html (this.buttons.layers.inactive));
            tools.push($('<div id="measuring" style="display: inline-block;"></div>').html (this.buttons.measuring.inactive));
            tools.push($('<div id="hounsfield" style="display: inline-block;"></div>').html (this.buttons.hu.inactive));
            tools.push($('<div id="reset" style="display: inline-block;"></div>').html (this.buttons.reset.inactive));
            tools.push($('<div id="close" style="display: inline-block;"></div>').html (this.buttons.close.inactive));
            if (this.reportsState) {
                    tools.push($('<div id="reports" style="display: inline-block;"></div>').html (this.buttons.reports.inactive));
                } else {
                    tools.push($('<div id="reports" style="display: inline-block;"></div>').html (this.buttons.reports.disable));
                }  
            if (this.mailState) {
                tools.push($('<div id="email" style="display: inline-block;"></div>').html (this.buttons.email.inactive)); 
            } else {
                tools.push($('<div id="email" style="display: inline-block;"></div>').html (this.buttons.email.disable)); 
            } 
        }
    } else if (this.environment === 'landscape') {
        if (this.renderType === 'webgl') {
            if (!this.isPhone) {
                tools.push($('<div id="thumbnails_series" style="display: inline-block;"></div>').html (this.buttons.series.inactive));
                if (this.totalLayers === 1) {
                    tools.push($('<div id="imitation" style="display: inline-block;"></div>').html (this.buttons.imitation.disable));
                } else {
                    tools.push($('<div id="imitation" style="display: inline-block;"></div>').html (this.buttons.imitation.inactive));
                } 
                tools.push($('<div id="negative" style="display: inline-block;"></div>').html (this.buttons.negative.inactive));
                tools.push($('<div id="film_mode" style="display: inline-block;"></div>').html (this.buttons.film_mode.inactive));
                tools.push($('<div id="layers" style="display: inline-block;"></div>').html (this.buttons.layers.inactive));
                tools.push($('<div id="measuring" style="display: inline-block;"></div>').html (this.buttons.measuring.inactive));
                tools.push($('<div id="hounsfield" style="display: inline-block;"></div>').html (this.buttons.hu.inactive));
                tools.push($('<div id="window_level_presets" style="display: inline-block;"></div>').html (this.buttons.presets.inactive));
                tools.push($('<div id="reset" style="display: inline-block;"></div>').html (this.buttons.reset.inactive));
                tools.push($('<div id="close" style="display: inline-block;"></div>').html (this.buttons.close.inactive));
                if (this.reportsState) {
                    tools.push($('<div id="reports" style="display: inline-block;"></div>').html (this.buttons.reports.inactive));
                } else {
                    tools.push($('<div id="reports" style="display: inline-block;"></div>').html (this.buttons.reports.disable));
                }  
                if (this.mailState) {
                    tools.push($('<div id="email" style="display: inline-block;"></div>').html (this.buttons.email.inactive)); 
                } else {
                    tools.push($('<div id="email" style="display: inline-block;"></div>').html (this.buttons.email.disable)); 
                } 
            } else {
                tools.push($('<div id="thumbnails_series" style="display: inline-block;"></div>').html (this.buttons.series.inactive));
                tools.push($('<div id="negative" style="display: inline-block;"></div>').html (this.buttons.negative.inactive));
                tools.push($('<div id="film_mode" style="display: inline-block;"></div>').html (this.buttons.film_mode.inactive));
                tools.push($('<div id="measuring" style="display: inline-block;"></div>').html (this.buttons.measuring.inactive));
                tools.push($('<div id="hounsfield" style="display: inline-block;"></div>').html (this.buttons.hu.inactive));
                tools.push($('<div id="reset" style="display: inline-block;"></div>').html (this.buttons.reset.inactive));
                tools.push($('<div id="close" style="display: inline-block;"></div>').html (this.buttons.close.inactive));
                if (this.reportsState) {
                    tools.push($('<div id="reports" style="display: inline-block;"></div>').html (this.buttons.reports.inactive));
                } else {
                    tools.push($('<div id="reports" style="display: inline-block;"></div>').html (this.buttons.reports.disable));
                }  
                if (this.mailState) {
                    tools.push($('<div id="email" style="display: inline-block;"></div>').html (this.buttons.email.inactive)); 
                } else {
                    tools.push($('<div id="email" style="display: inline-block;"></div>').html (this.buttons.email.disable)); 
                }
                tools.push($('<div id="button_info_phone" style="display: inline-block; cursor: pointer; margin-top: 10px; background: #4C4C4C; padding-left: 8px; padding-right: 8px; border: 0px #F69322 solid; border-radius: 2px; color: #FFF;" data-toggle="modal" data-target="#modal"><span class="glyphicon glyphicon-info-sign"></span></div>'));
            }         
        } else if (this.renderType === 'canvas2d') {
            if (!this.isPhone) {
                tools.push($('<div id="thumbnails_series" style="display: inline-block;"></div>').html (this.buttons.series.inactive));
                if (this.totalLayers === 1) {
                    tools.push($('<div id="imitation" style="display: inline-block;"></div>').html (this.buttons.imitation.disable));
                } else {
                    tools.push($('<div id="imitation" style="display: inline-block;"></div>').html (this.buttons.imitation.inactive));
                } 
                tools.push($('<div id="negative" style="display: inline-block;"></div>').html (this.buttons.negative.inactive));
                tools.push($('<div id="film_mode" style="display: inline-block;"></div>').html (this.buttons.film_mode.inactive));
                tools.push($('<div id="layers" style="display: inline-block;"></div>').html (this.buttons.layers.inactive));
                tools.push($('<div id="measuring" style="display: inline-block;"></div>').html (this.buttons.measuring.inactive));
                tools.push($('<div id="hounsfield" style="display: inline-block;"></div>').html (this.buttons.hu.inactive));
                tools.push($('<div id="reset" style="display: inline-block;"></div>').html (this.buttons.reset.inactive));
                tools.push($('<div id="close" style="display: inline-block;"></div>').html (this.buttons.close.inactive));
                if (this.reportsState) {
                    tools.push($('<div id="reports" style="display: inline-block;"></div>').html (this.buttons.reports.inactive));
                } else {
                    tools.push($('<div id="reports" style="display: inline-block;"></div>').html (this.buttons.reports.disable));
                }  
                if (this.mailState) {
                    tools.push($('<div id="email" style="display: inline-block;"></div>').html (this.buttons.email.inactive)); 
                } else {
                    tools.push($('<div id="email" style="display: inline-block;"></div>').html (this.buttons.email.disable)); 
                }
            } else {
                tools.push($('<div id="thumbnails_series" style="display: inline-block;"></div>').html (this.buttons.series.inactive));
                tools.push($('<div id="negative" style="display: inline-block;"></div>').html (this.buttons.negative.inactive));
                tools.push($('<div id="film_mode" style="display: inline-block;"></div>').html (this.buttons.film_mode.inactive));
                tools.push($('<div id="measuring" style="display: inline-block;"></div>').html (this.buttons.measuring.inactive));
                tools.push($('<div id="hounsfield" style="display: inline-block;"></div>').html (this.buttons.hu.inactive));
                tools.push($('<div id="reset" style="display: inline-block;"></div>').html (this.buttons.reset.inactive));
                tools.push($('<div id="close" style="display: inline-block;"></div>').html (this.buttons.close.inactive));
                if (this.reportsState) {
                    tools.push($('<div id="reports" style="display: inline-block;"></div>').html (this.buttons.reports.inactive));
                } else {
                    tools.push($('<div id="reports" style="display: inline-block;"></div>').html (this.buttons.reports.disable));
                }  
                if (this.mailState) {
                    tools.push($('<div id="email" style="display: inline-block;"></div>').html (this.buttons.email.inactive)); 
                } else {
                    tools.push($('<div id="email" style="display: inline-block;"></div>').html (this.buttons.email.disable)); 
                } 
                tools.push($('<div id="button_info_phone" style="display: inline-block; cursor: pointer; margin-top: 10px; background: #4C4C4C; padding-left: 8px; padding-right: 8px; border: 0px #F69322 solid; border-radius: 2px; color: #FFF;" data-toggle="modal" data-target="#modal"><span class="glyphicon glyphicon-info-sign"></span></div>'));
            }
        }
    } else if (this.environment === 'portrait') {
        if (this.renderType === 'webgl') {
            if (!this.isPhone) {
                tools.push($('<div id="thumbnails_series" style="display: inline-block;"></div>').html (this.buttons.series.inactive));
                if (this.totalLayers === 1) {
                    tools.push($('<div id="imitation" style="display: inline-block;"></div>').html (this.buttons.imitation.disable));
                } else {
                    tools.push($('<div id="imitation" style="display: inline-block;"></div>').html (this.buttons.imitation.inactive));
                }                
                tools.push($('<div id="negative" style="display: inline-block;"></div>').html (this.buttons.negative.inactive));
                tools.push($('<div id="film_mode" style="display: inline-block;"></div>').html (this.buttons.film_mode.inactive));
                tools.push($('<div id="layers" style="display: inline-block;"></div>').html (this.buttons.layers.inactive));                
                tools.push($('<div id="measuring" style="display: inline-block;"></div>').html (this.buttons.measuring.inactive));
                tools.push($('<div id="hounsfield" style="display: inline-block;"></div>').html (this.buttons.hu.inactive));
                tools.push($('<div id="window_level_presets" style="display: inline-block;"></div>').html (this.buttons.presets.inactive));
                tools.push($('<div id="reset" style="display: inline-block;"></div>').html (this.buttons.reset.inactive));
                tools.push($('<div id="close" style="display: inline-block;"></div>').html (this.buttons.close.inactive));
                if (this.reportsState) {
                    tools.push($('<div id="reports" style="display: inline-block;"></div>').html (this.buttons.reports.inactive));
                } else {
                    tools.push($('<div id="reports" style="display: inline-block;"></div>').html (this.buttons.reports.disable));
                }  
                if (this.mailState) {
                    tools.push($('<div id="email" style="display: inline-block;"></div>').html (this.buttons.email.inactive)); 
                } else {
                    tools.push($('<div id="email" style="display: inline-block;"></div>').html (this.buttons.email.disable)); 
                } 
                if (this.infoState) {
                    tools.push($('<div style="display: table; height: 30px; float: right;"><div style="display: table-cell; vertical-align: middle;"><div id="button_info" style="display: inline-block; cursor: pointer; float: right; background: #F69322; padding-left: 8px; padding-right: 8px; border: 1px #F69322 solid; border-radius: 2px; color: #FFF;">'+ MIRROR.language.globalInformation['info'] +'</div></div></div>'));
                } else {
                    tools.push($('<div style="display: table; height: 30px; float: right;"><div style="display: table-cell; vertical-align: middle;"><div id="button_info" style="display: inline-block; cursor: pointer; float: right; background: #4C4C4C; padding-left: 8px; padding-right: 8px; border: 1px #F69322 solid; border-radius: 2px; color: #FFF;">'+ MIRROR.language.globalInformation['info'] +'</div></div></div>'));
                } 
            } else {
                tools.push($('<div id="thumbnails_series" style="display: inline-block;"></div>').html (this.buttons.series.inactive));
                tools.push($('<div id="negative" style="display: inline-block;"></div>').html (this.buttons.negative.inactive));
                tools.push($('<div id="film_mode" style="display: inline-block;"></div>').html (this.buttons.film_mode.inactive));
                tools.push($('<div id="measuring" style="display: inline-block;"></div>').html (this.buttons.measuring.inactive));
                tools.push($('<div id="hounsfield" style="display: inline-block;"></div>').html (this.buttons.hu.inactive));
                tools.push($('<div id="reset" style="display: inline-block;"></div>').html (this.buttons.reset.inactive));
                tools.push($('<div id="close" style="display: inline-block;"></div>').html (this.buttons.close.inactive));
                if (this.reportsState) {
                    tools.push($('<div id="reports" style="display: inline-block;"></div>').html (this.buttons.reports.inactive));
                } else {
                    tools.push($('<div id="reports" style="display: inline-block;"></div>').html (this.buttons.reports.disable));
                }  
                if (this.mailState) {
                    tools.push($('<div id="email" style="display: inline-block;"></div>').html (this.buttons.email.inactive)); 
                } else {
                    tools.push($('<div id="email" style="display: inline-block;"></div>').html (this.buttons.email.disable)); 
                } 
                tools.push($('<div style="display: table; height: 25px; float: right;"><div style="display: table-cell; vertical-align: middle;"><div id="button_info_phone" style="display: inline-block; cursor: pointer; float: right; background: #4C4C4C; padding-left: 8px; padding-right: 8px; border: 0px #F69322 solid; border-radius: 2px; color: #FFF;" data-toggle="modal" data-target="#modal"><span class="glyphicon glyphicon-info-sign"></span></div></div></div>'));
            }               
        } else if (this.renderType === 'canvas2d') {
            if (!this.isPhone) {
                tools.push($('<div id="thumbnails_series" style="display: inline-block;"></div>').html (this.buttons.series.inactive));
                if (this.totalLayers === 1) {
                    tools.push($('<div id="imitation" style="display: inline-block;"></div>').html (this.buttons.imitation.disable));
                } else {
                    tools.push($('<div id="imitation" style="display: inline-block;"></div>').html (this.buttons.imitation.inactive));
                } 
                tools.push($('<div id="negative" style="display: inline-block;"></div>').html (this.buttons.negative.inactive));
                tools.push($('<div id="film_mode" style="display: inline-block;"></div>').html (this.buttons.film_mode.inactive));
                tools.push($('<div id="layers" style="display: inline-block;"></div>').html (this.buttons.layers.inactive));
                tools.push($('<div id="measuring" style="display: inline-block;"></div>').html (this.buttons.measuring.inactive));
                tools.push($('<div id="hounsfield" style="display: inline-block;"></div>').html (this.buttons.hu.inactive));
                tools.push($('<div id="reset" style="display: inline-block;"></div>').html (this.buttons.reset.inactive));
                tools.push($('<div id="close" style="display: inline-block;"></div>').html (this.buttons.close.inactive));
                if (this.reportsState) {
                    tools.push($('<div id="reports" style="display: inline-block;"></div>').html (this.buttons.reports.inactive));
                } else {
                    tools.push($('<div id="reports" style="display: inline-block;"></div>').html (this.buttons.reports.disable));
                }                
                if (this.mailState) {
                    tools.push($('<div id="email" style="display: inline-block;"></div>').html (this.buttons.email.inactive)); 
                } else {
                    tools.push($('<div id="email" style="display: inline-block;"></div>').html (this.buttons.email.disable)); 
                } 
                if (this.infoState) {
                    tools.push($('<div style="display: table; height: 30px; float: right;"><div style="display: table-cell; vertical-align: middle;"><div id="button_info" style="display: inline-block; cursor: pointer; float: right; background: #F69322; padding-left: 8px; padding-right: 8px; border: 1px #F69322 solid; border-radius: 2px; color: #FFF;">'+ MIRROR.language.globalInformation['info'] +'</div></div></div>'));
                } else {
                    tools.push($('<div style="display: table; height: 30px; float: right;"><div style="display: table-cell; vertical-align: middle;"><div id="button_info" style="display: inline-block; cursor: pointer; float: right; background: #4C4C4C; padding-left: 8px; padding-right: 8px; border: 1px #F69322 solid; border-radius: 2px; color: #FFF;">'+ MIRROR.language.globalInformation['info'] +'</div></div></div>'));
                } 
            } else {
                tools.push($('<div id="thumbnails_series" style="display: inline-block;"></div>').html (this.buttons.series.inactive));
                tools.push($('<div id="negative" style="display: inline-block;"></div>').html (this.buttons.negative.inactive));
                tools.push($('<div id="film_mode" style="display: inline-block;"></div>').html (this.buttons.film_mode.inactive));
                tools.push($('<div id="measuring" style="display: inline-block;"></div>').html (this.buttons.measuring.inactive));
                tools.push($('<div id="hounsfield" style="display: inline-block;"></div>').html (this.buttons.hu.inactive));
                tools.push($('<div id="reset" style="display: inline-block;"></div>').html (this.buttons.reset.inactive));
                tools.push($('<div id="close" style="display: inline-block;"></div>').html (this.buttons.close.inactive));
                if (this.reportsState) {
                    tools.push($('<div id="reports" style="display: inline-block;"></div>').html (this.buttons.reports.inactive));
                } else {
                    tools.push($('<div id="reports" style="display: inline-block;"></div>').html (this.buttons.reports.disable));
                }  
                if (this.mailState) {
                    tools.push($('<div id="email" style="display: inline-block;"></div>').html (this.buttons.email.inactive)); 
                } else {
                    tools.push($('<div id="email" style="display: inline-block;"></div>').html (this.buttons.email.disable)); 
                }
                tools.push($('<div style="display: table; height: 25px; float: right;"><div style="display: table-cell; vertical-align: middle;"><div id="button_info_phone" style="display: inline-block; cursor: pointer; float: right; background: #4C4C4C; padding-left: 8px; padding-right: 8px; border: 0px #F69322 solid; border-radius: 2px; color: #FFF;" data-toggle="modal" data-target="#modal"><span class="glyphicon glyphicon-info-sign"></span></div></div></div>')); 
            }
        }
    }            
    for (var i = 0; i < tools.length; i++) {
        $('#buttons_toolsbar').append (tools[i]);
    }    
};
/*
 * Buttons configuration.
 * 
 * @memberof maker
 */
MIRROR.maker.prototype.__toolsButtonsSizeStyle = function () {
    var t = this;
    if (t.environment === 'desktop') {
        $('.toolBar').each (function () {
            $(this).parent().css ({
                'padding': '2px'
            });                
        });
        for (var button in t.buttons) {
            if (t.buttons[button].where === 'submenu') {
                t.buttons[button].inactive.css ({
                    'margin-top': '0px',
                    'margin-left': '3px'
                });
                t.buttons[button].active.css ({
                    'margin-top': '0px',
                    'margin-left': '3px'
                });
                t.buttons[button].disable.css ({
                    'margin-top': '0px',
                    'margin-left': '3px'
                });
            }                
        }
        var seriesToolsbarHeight = ($(window).height ()) - ($('#series_toolsbar').offset().top + 8);
        $('#series_toolsbar').height (seriesToolsbarHeight);
    } else if (t.environment === 'landscape') {
        if (t.isPhone) {
            $('.toolBar').each (function () {
                $(this).parent().css ('display', 'block');                
            });
            for (var button in t.buttons) {
                if (t.buttons[button].where === 'bar') {
                    t.buttons[button].active.css ({
                        'width': '26px',
                        'height': '26px',
                        'margin-top': '1px',
                        'margin-left': '0px'
                    });
                    t.buttons[button].inactive.css ({
                        'width': '26px',
                        'height': '26px',
                        'margin-top': '1px',
                        'margin-left': '0px'
                    });
                    t.buttons[button].disable.css ({
                        'width': '26px',
                        'height': '26px',
                        'margin-top': '1px',
                        'margin-left': '0px'
                    });
                } else if (t.buttons[button].where === 'submenu') {
                    t.buttons[button].inactive.css ({
                        'width': '40px',
                        'height': '40px',
                        'margin-top': '0px',
                        'margin-left': '3px'
                    });
                    t.buttons[button].active.css ({
                        'width': '40px',
                        'height': '40px',
                        'margin-top': '0px',
                        'margin-left': '3px'
                    });
                    t.buttons[button].disable.css ({
                        'width': '40px',
                        'height': '40px',
                        'margin-top': '0px',
                        'margin-left': '3px'
                    });
                }                
            }
        } else {
            for (var button in t.buttons) {
                if (t.buttons[button].where === 'bar') {
                    t.buttons[button].active.css ({
                        'width': '32px',
                        'height': '32px',
                        'margin-top': '3px',
                        'margin-left': '0px'
                    });
                    t.buttons[button].inactive.css ({
                        'width': '32px',
                        'height': '32px',
                        'margin-top': '3px',
                        'margin-left': '0px'
                    });
                    t.buttons[button].disable.css ({
                        'width': '32px',
                        'height': '32px',
                        'margin-top': '3px',
                        'margin-left': '0px'
                    });
                } else if (t.buttons[button].where === 'submenu') {
                    t.buttons[button].inactive.css ({
                        'width': '40px',
                        'height': '40px',
                        'margin-top': '0px',
                        'margin-left': '3px'
                    });
                    t.buttons[button].active.css ({
                        'width': '40px',
                        'height': '40px',
                        'margin-top': '0px',
                        'margin-left': '3px'
                    });
                    t.buttons[button].disable.css ({
                        'width': '40px',
                        'height': '40px',
                        'margin-top': '0px',
                        'margin-left': '3px'
                    });
                }                
            }
        }
    } else if (t.environment === 'portrait') {
        if (t.isPhone) {            
            for (var button in t.buttons) {
                if (t.buttons[button].where === 'bar') {
                    t.buttons[button].active.css ({
                        'width': '25px',
                        'height': '25px',
                        'margin-top': '0px',
                        'margin-left': '1px'
                    });
                    t.buttons[button].inactive.css ({
                        'width': '25px',
                        'height': '25px',
                        'margin-top': '0px',
                        'margin-left': '1px'
                    });
                    t.buttons[button].disable.css ({
                        'width': '25px',
                        'height': '25px',
                        'margin-top': '0px',
                        'margin-left': '1px'
                    });
                } else if (t.buttons[button].where === 'submenu') {
                    t.buttons[button].active.css ({
                        'width': '40px',
                        'height': '40px',
                        'margin-top': '0px',
                        'margin-left': '3px'
                    });
                    t.buttons[button].inactive.css ({
                        'width': '40px',
                        'height': '40px',
                        'margin-top': '0px',
                        'margin-left': '3px'
                    });
                    t.buttons[button].disable.css ({
                        'width': '40px',
                        'height': '40px',
                        'margin-top': '0px',
                        'margin-left': '3px'
                    });
                }                
            } 
        } else {            
            for (var button in t.buttons) {
                if (t.buttons[button].where === 'bar') {
                    t.buttons[button].active.css ({
                        'width': '32px',
                        'height': '32px',
                        'margin-top': '0px',
                        'margin-left': '3px'
                    });
                    t.buttons[button].inactive.css ({
                        'width': '32px',
                        'height': '32px',
                        'margin-top': '0px',
                        'margin-left': '3px'
                    });
                    t.buttons[button].disable.css ({
                        'width': '32px',
                        'height': '32px',
                        'margin-top': '0px',
                        'margin-left': '3px'
                    });
                } else if (t.buttons[button].where === 'submenu') {
                    t.buttons[button].inactive.css ({
                        'width': '40px',
                        'height': '40px',
                        'margin-top': '0px',
                        'margin-left': '3px'
                    });
                    t.buttons[button].active.css ({
                        'width': '40px',
                        'height': '40px',
                        'margin-top': '0px',
                        'margin-left': '3px'
                    });
                    t.buttons[button].disable.css ({
                        'width': '40px',
                        'height': '40px',
                        'margin-top': '0px',
                        'margin-left': '3px'
                    });
                }                
            }            
        } 
    }      
};
/*
 * Contexts proportion for change of orientation.
 * 
 * @memberof maker
 */
MIRROR.maker.prototype.__layersSizeConfiguration = function () {
    if (this.totalLayers === 1) {
        if (this.environment === 'landscape') {
            $('#layer_1').height (($('#workspace').height () - 6)); 
        } else {
            $('#layer_1').height (($('#workspace').height () - 14)); 
        }               
    } else if (this.totalLayers === 2) {
        if (this.environment === 'landscape') {
            $('#layer_1').height (($('#workspace').height () - 6)); 
            $('#layer_2').height (($('#workspace').height () - 6)); 
        } else {
            $('#layer_1').removeClass('col-xs-6').addClass('col-xs-12').height (($('#workspace').height () / 2) - 10); 
            $('#layer_2').removeClass('col-xs-6').addClass('col-xs-12').height (($('#workspace').height () / 2) - 10); 
        }
    }   
};
/*
 * Tools menu.
 * 
 * @memberof maker
 */
MIRROR.maker.prototype.__submenu = function (content) {
    if (this.environment === 'portrait') {
        var submenu = $('<div id="submenu" style="position: absolute; top: '+ ($('#toolsbar_'+ this.environment).height() + 20) +'px; left: 3px; background: #424242; padding: 6px; z-index: 1000; text-align: center; border-top-right-radius: 5px; border-bottom-right-radius: 5px;"></div>');
        submenu.html (content);
    } else {
        var submenu = $('<div id="submenu" style="position: absolute; top: 20px; left: '+ ($('#toolsbar_'+ this.environment).width() + 3) +'px; background: #424242; padding: 6px; z-index: 1000; text-align: center; border-top-right-radius: 5px; border-bottom-right-radius: 5px;"></div>');
        submenu.html (content);
    }    
    $('body').append (submenu);
    $('#series_thumbnails_submenu').perfectScrollbar();
    this.__checkSeriesDisplayed ();
};
/*
 * Dialog box.
 * 
 * @memberof maker
 */
MIRROR.maker.prototype.popup = function (action) {
    var popup = '';
    popup += '<div id="popup" style="color: #FFF; background: #424242; padding: 20px; border-radius: 6px; text-align: center; display: table; position: absolute; top: '+ ($(window).height () / 2) +'px; left: '+ ($(window).width () / 2) +'px;">';
    popup += '<div style="display: table-cenll; vertical-align: middle;">';
    if (action === 'error_charging') {
        popup += MIRROR.language.popup['error_charging'];
    }    
    popup += '<br /><br /><br />';
    popup += '</div>';
    popup += '<div style="display: table-cenll; vertical-align: bottom;">';
    popup += '<button id="button_close_popup" class="btn btn-warning">'+ MIRROR.language.popup['button_close_popup'] +'</button>';
    popup += '</div>';
    popup += '</div>';
    $('body').append (popup);
    $('#popup').css ({
        'left': ($(window).width () / 2 - $('#popup').width () / 2) +'px',
        'top': ($(window).height () / 2 - $('#popup').height () / 2) +'px'
    });
};
/*
 * Loop rendering.
 * 
 * @memberof maker
 */
MIRROR.maker.prototype.__rendering = function () {  
    for (var layer in this.layers) {
        if (this.layers[layer].displayed && this.layers[layer].stage !== null && this.layers[layer].renderer !== null) {            
            this.layers[layer].render ();
        }       
    }    
    requestAnimationFrame (this.__rendering.bind (this));
};

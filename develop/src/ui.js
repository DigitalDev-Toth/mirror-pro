/**
 * @file        DOM templates
 * @author      Toth Limitada <contacto@toth.cl>
 * @copyright   2015 Toth Limitada
 * @license     {@link http://www.toth.cl}
 */

/* global LANGUAGE */

var UI = {
    'desktop': 
        '<div class="container-fluid" style="margin: 0px; padding: 0px;">'+
            '<div class="row" style="margin: 0px; padding: 0px;">'+
                '<div id="mirror" class="col-xs-12" style="margin: 0px; padding: 0px;">'+                    
                '</div>'+
            '</div>'+
        '</div>'+
        '<div id="modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">'+
            '<div class="modal-dialog modal-lg">'+
                '<div class="modal-content" style="background: #424242; color: #FFF;">'+
                    '<div class="modal-header" style="border-bottom: 1px solid #F69322;">'+
                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
                        '<h4 class="modal-title" id="label_title_modal"></h4>'+
                    '</div>'+
                    '<div class="modal-body">'+
                        '<div id="content_modal"></div>'+                        
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>',

    'landscape':
        '<div class="container-fluid" style="margin: 0px; padding: 0px;">'+
            '<div class="row" style="margin: 0px; padding: 0px;">'+
                '<div id="mirror" class="col-xs-12" style="margin: 0px; padding: 0px;">'+
                '</div>'+
            '</div>'+
        '</div>'+
        '<div id="modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">'+
            '<div class="modal-dialog modal-lg">'+
                '<div class="modal-content" style="background: #424242; color: #FFF;">'+
                    '<div class="modal-header" style="border-bottom: 1px solid #F69322;">'+
                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
                        '<h4 class="modal-title" id="label_title_modal"></h4>'+
                    '</div>'+
                    '<div class="modal-body">'+
                        '<div id="content_modal"></div>'+                        
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>',

    'portrait':
        '<div class="container-fluid" style="margin: 0px; padding: 0px;">'+
            '<div class="row" style="margin: 0px; padding: 0px;">'+
                '<div id="copyright" style="background: #F69322; width: 100%; height: 20px; text-align: right; color: #FFF;">Toth Limitada <span id="copyright_year"></span> &copy; Mirror Estándar ['+ LANGUAGE.mirror['version'] +' <span id="version"></span>]</div>'+
                '<div id="mirror" class="col-xs-12" style="margin: 0px; padding: 0px; border-left: 3px solid #F69322; border-right: 3px solid #F69322; border-bottom: 3px solid #F69322;">'+                    
                '</div>'+
            '</div>'+
        '</div>'+
        '<div id="modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">'+
            '<div class="modal-dialog modal-lg">'+
                '<div class="modal-content" style="background: #424242; color: #FFF;">'+
                    '<div class="modal-header" style="border-bottom: 1px solid #F69322;">'+
                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
                        '<h4 class="modal-title" id="label_title_modal"></h4>'+
                    '</div>'+
                    '<div class="modal-body">'+
                        '<div id="content_modal"></div>'+                        
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>',
    
    'toolsbar_desktop':
        '<div id="toolsbar_desktop" class="col-xs-1" style="background: #4C4C4C; height: '+ $(window).height () +'px; border-left: 3px solid #F69322; border-bottom: 3px solid #F69322; margin: 0px; padding: 0px;">'+
            '<div style="background: #F69322; width: 100%; height: 20px; text-align: center; color: #FFF; font-weight: bold;">Herramientas</div>'+
            '<div id="buttons_toolsbar" style="width: 100%; padding: 12px; padding-top: 5px; text-align: center;">'+
            '</div>'+
            '<div id="series_toolsbar" style="position: relative; width: 100%; display: block; overflow-y: auto; overflow-x: hidden; text-align: center; margin: 0px; padding: 0px; padding-left: 4px; padding-right: 4px;"></div>'+
        '</div>',
    
    'toolsbar_landscape':
        '<div id="toolsbar_landscape" class="col-xs-1" style="background: #4C4C4C; height: '+ $(window).height () +'px; border-left: 3px solid #F69322; border-bottom: 3px solid #F69322; margin: 0px; padding: 0px;">'+
            '<div style="background: #F69322; width: 100%; height: 20px; text-align: center; color: #FFF; font-weight: bold;"></div>'+
            '<div id="buttons_toolsbar" style="width: 100%; padding-top: 5px; padding-bottom: 5px; text-align: center;">'+
            '</div>'+            
        '</div>',

    'toolsbar_portrait':
        '<div id="toolsbar_portrait" class="col-xs-12" style="background: #4C4C4C; margin: 0px; padding: 0px;">'+
            '<div id="buttons_toolsbar" style="width: 100%; padding: 5px; text-align: left;">'+
            '</div>'+            
        '</div>',

    'workspace_desktop':
        '<div class="col-xs-10" style="background: #6C6C6C; height: '+ $(window).height () +'px; border-bottom: 3px solid #F69322; margin: 0px; padding: 0px;">'+
            '<div style="background: #F69322; width: 100%; height: 20px; text-align: right; color: #FFF;">Toth Limitada <span id="copyright_year"></span> &copy; Mirror Estándar ['+ LANGUAGE.mirror['version'] +' <span id="version"></span>]</div>'+
            '<div id="workspace" style="background: #6C6C6C; width: 100%; height: '+ ($(window).height () - 42) +'px; margin: 0px; padding: 4px;"></div>'+                
            '<div style="background: #4C4C4C; display: table; width: 101%; height: 20px; color: #FFF; font-size: 8pt; margin: 0px; padding: 0px;">'+
                '<div id="general_information" style="display: table-cell; vertical-align: middle; padding-left: 20px;">'+                    
                '</div>'+
            '</div>'+
        '</div>',

    'workspace_landscape':
        '<div class="col-xs-10" style="background: #6C6C6C; height: '+ $(window).height () +'px; border-bottom: 3px solid #F69322; margin: 0px; padding: 0px;">'+
            '<div style="background: #F69322; width: 100%; height: 20px; text-align: right; color: #FFF;">Toth Limitada <span id="copyright_year"></span> &copy; Mirror Estándar ['+ LANGUAGE.mirror['version'] +' <span id="version"></span>]</div>'+
            '<div id="workspace" style="background: #6C6C6C; width: 100%; height: '+ ($(window).height () - 43) +'px; margin: 0px; padding: 4px;"></div>'+                
            '<div style="background: #4C4C4C; display: table; width: 101%; height: 20px; color: #FFF; font-size: 8pt; margin: 0px; padding: 0px;">'+
                '<div id="general_information" style="display: table-cell; vertical-align: middle; padding-left: 20px;">'+                    
                '</div>'+
            '</div>'+
        '</div>',

    'workspace_portrait':
        '<div class="col-xs-12" style="background: #6C6C6C; margin: 0px; padding: 0px;">'+            
            '<div id="workspace" style="background: #6C6C6C; width: 100%; margin: 0px; padding: 4px;"></div>'+                
        '</div>',
    
    'navigator_desktop':
        '<div id="navigator_desktop" class="col-xs-1" style="background: #4C4C4C; height: '+ $(window).height () +'px; margin: 0px; padding: 4px; border-top: 20px solid #F69322; border-right: 3px solid #F69322; border-bottom: 3px solid #F69322;">'+
        '</div>',

    'navigator_landscape':
        '<div id="navigator_landscape" class="col-xs-1" style="background: #4C4C4C; height: '+ $(window).height () +'px; margin: 0px; padding: 4px; border-top: 20px solid #F69322; border-right: 3px solid #F69322; border-bottom: 3px solid #F69322;">'+
        '</div>',

    'navigator_portrait':
        '<div id="navigator_portrait" class="col-xs-12" style="background: #4C4C4C; height: 50px; margin: 0px; padding: 4px;">'+
        '</div>',
    
    'void_layer':
        '<div style="background: #616161; width: 100%; height: 100%; display: table; -webkit-user-select: none; -moz-user-select: -moz-none; -ms-user-select: none; user-select: none;">'+
            '<div style="display: table-cell; vertical-align: middle; text-align: center; -webkit-user-select: none; -moz-user-select: -moz-none; -ms-user-select: none; user-select: none;">'+
                '<span style="cursor: default; font-family: Oswald, sans-serif; font-size: 20pt; -webkit-user-select: none; -moz-user-select: -moz-none; -ms-user-select: none; user-select: none;">'+ LANGUAGE.workspace['void_layer'] +'</span>'+
            '</div>'+
        '</div>',  
    
    'layers_1':
        '<div id="layer_1" class="col-xs-12" style="position: relative; overflow: hidden; height: '+ ($(window).height () - 51) +'px; margin: 0px; padding: 0px; border: 3px solid #FCBE39;"></div>',
    'layers_2':
        '<div id="layer_1" class="col-xs-6" style="position: relative; overflow: hidden; height: '+ ($(window).height () - 51) +'px; margin: 0px; padding: 0px; border: 3px solid #6C6C6C;"></div>'+
        '<div id="layer_2" class="col-xs-6" style="position: relative; overflow: hidden; height: '+ ($(window).height () - 51) +'px; margin: 0px; padding: 0px; border: 3px solid #6C6C6C;"></div>',
    'layers_3':
        '<div class="col-xs-6" style="margin: 0px; padding: 0px;">'+
            '<div id="layer_1" class="col-xs-12" style="position: relative; overflow: hidden; height: '+ (($(window).height () - 51) / 2) +'px; margin: 0px; padding: 0px; border: 3px solid #6C6C6C;"></div>'+
            '<div id="layer_2" class="col-xs-12" style="position: relative; overflow: hidden; height: '+ (($(window).height () - 51) / 2) +'px; margin: 0px; padding: 0px; border: 3px solid #6C6C6C;"></div>'+
        '</div>'+
        '<div id="layer_3" class="col-xs-6" style="position: relative; overflow: hidden; height: '+ ($(window).height () - 51) +'px; margin: 0px; padding: 0px; border: 3px solid #6C6C6C;"></div>',
    'layers_4':
        '<div id="layer_1" class="col-xs-6" style="position: relative; overflow: hidden; height: '+ (($(window).height () - 51) / 2) +'px; margin: 0px; padding: 0px; border: 3px solid #6C6C6C;"></div>'+
        '<div id="layer_2" class="col-xs-6" style="position: relative; overflow: hidden; height: '+ (($(window).height () - 51) / 2) +'px; margin: 0px; padding: 0px; border: 3px solid #6C6C6C;"></div>'+
        '<div id="layer_3" class="col-xs-6" style="position: relative; overflow: hidden; height: '+ (($(window).height () - 51) / 2) +'px; margin: 0px; padding: 0px; border: 3px solid #6C6C6C;"></div>'+
        '<div id="layer_4" class="col-xs-6" style="position: relative; overflow: hidden; height: '+ (($(window).height () - 51) / 2) +'px; margin: 0px; padding: 0px; border: 3px solid #6C6C6C;"></div>'
};
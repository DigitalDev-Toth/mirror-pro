import { CONST } from "./const";

/**
 * [Utils description]
 * @type {Object}
 */
export let Utils = {

	/**
	 * [isWebGLSupported description]
	 * @return {Boolean} [description]
	 */
	isWebGLSupported() {
		let contextOptions = { stencil: true };

		try {
			if ( !window.WebGLRenderingContext ) {
				return "canvas2d";
			}

			let canvas = document.createElement( "canvas" ),
				gl = canvas.getContext( "webgl", contextOptions ) || 
					canvas.getContext( "experimental-webgl", contextOptions );

			if ( !!( gl && gl.getContextAttributes().stencil ) ) {
				return "webgl";
			} else {
				return "canvas2d";
			}
		} catch (e) {
			return "canvas2d";
		}
	},

	/**
	 * [browserDetection description]
	 * @return {String|Boolean} [description]
	 */
	browserDetection() {
		if ( navigator.userAgent.indexOf ( "Firefox" ) !== -1 ) {
        	return "firefox";        
    	} 
    	if ( navigator.userAgent.indexOf ( "MSIE" ) !== -1 || navigator.userAgent.indexOf( "rv:11" ) !== -1 ) {
        	return "msie";
    	} 
    	if ( navigator.userAgent.indexOf ( "Chrome" ) !== -1 ) {
        	return "chrome";
    	}
    	return false;
	},

	/**
	 * [workSpaceDetection description]
	 * @param  {String} workSpaceId [description]
	 * @return {Boolean}             [description]
	 */
	workSpaceDetection(workSpaceId) {
		let workspaceDOM = document.getElementById( workSpaceId );

		return ( workspaceDOM !== undefined || workspaceDOM !== null ) ? true : false; 
	}
};
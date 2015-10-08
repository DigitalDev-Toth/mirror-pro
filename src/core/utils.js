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
				return false;
			}

			let canvas = document.createElement( "canvas" ),
				gl = canvas.getContext( "webgl", contextOptions ) || 
					canvas.getContext( "experimental-webgl", contextOptions );

			return !!( gl && gl.getContextAttributes().stencil );
		} catch (e) {
			return false;
		}
	},

	/**
	 * [browserDetection description]
	 * @return {String} [description]
	 */
	browserDetection() {
		
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
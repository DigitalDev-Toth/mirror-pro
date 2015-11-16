/**
 * 
 */
export class Common {
	
	/**
	 * [constructor description]
	 */
	constructor() {

	}

	/**
	 * [onResize description]
	 * @param  {Function} callback [description]
	 */
	onResize(callback) {
		window.addEventListener( "resize", callback );
	}

	/**
	 * [offResize description]
	 * @param  {Function} callback [description]
	 */
	offResize(callback) {
		window.removeEventListener( "resize", callback );
	}

	/**
	 * [onMouseDown description]
	 * @param  {Object}   objectDOM [description]
	 * @param  {Function} callback  [description]
	 */
	onMouseDown(objectDOM, callback) {
		objectDOM.addEventListener( "mousedown", callback );
	}

	/**
	 * [offMouseDown description]
	 * @param  {Object}   objectDOM [description]
	 * @param  {Function} callback  [description]
	 */
	offMouseDown(objectDOM, callback) {
		objectDOM.removeEventListener( "mousedown", callback );
	}
}
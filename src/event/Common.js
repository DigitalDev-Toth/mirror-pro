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
		addEventListener( "resize", callback );
	}

	/**
	 * [offResize description]
	 * @param  {Function} callback [description]
	 */
	offResize(callback) {
		removeEventListener( "resize", callback );
	}

	/**
	 * [onMouseDown description]
	 * @param  {Function} callback [description]
	 */
	onMouseDown(callback) {
		addEventListener( "mousedown", callback );
	}

	/**
	 * [offMouseDown description]
	 * @param  {Function} callback [description]
	 */
	offMouseDown(callback) {
		removeEventListener( "mousedown", callback );
	}
}
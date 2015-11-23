/**
 * 
 */
export class Custom {

	/**
	 * [constructor description]
	 */
	constructor() {
		/**
		 * [numberOfBlocksChange description]
		 * @type {CustomEvent}
		 */
		this.desktopsInScreenChange = new CustomEvent( "desktopsinscreenchange" );
	}

	/**
	 * [onNumberOfBlocksChange description]
	 * @param  {Object}   objectDOM [description]
	 * @param  {Function} callback  [description]
	 */
	onDesktopsInScreenChange(objectDOM, callback) {
		objectDOM.addEventListener( "desktopsinscreenchange", callback );
	}

	/**
	 * [offNumberOfBlocksChange description]
	 * @param  {Object}   objectDOM [description]
	 * @param  {Function} callback  [description]
	 */
	offDesktopsInScreenChange(objectDOM, callback) {
		objectDOM.removeEventListener( "desktopsinscreenchange", callback );
	}

	/**
	 * [dispatchNumberOfBlocksChange description]
	 * @param  {Object} objectDOM [description]
	 */
	dispatchDesktopsInScreenChange(objectDOM) {
		objectDOM.dispatchEvent( this.desktopsInScreenChange );
	}
}
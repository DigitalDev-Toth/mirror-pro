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
		this.desktopsBoundingFinish = new CustomEvent( "desktopsboundingfinish" );
	}

	/**
	 * [onDesktopsInScreenChange description]
	 * @param  {Object}   objectDOM [description]
	 * @param  {Function} callback  [description]
	 */
	onDesktopsInScreenChange(objectDOM, callback) {
		objectDOM.addEventListener( "desktopsinscreenchange", callback );
	}

	/**
	 * [offDesktopsInScreenChange description]
	 * @param  {Object}   objectDOM [description]
	 * @param  {Function} callback  [description]
	 */
	offDesktopsInScreenChange(objectDOM, callback) {
		objectDOM.removeEventListener( "desktopsinscreenchange", callback );
	}

	/**
	 * [dispatchDesktopsInScreenChange description]
	 * @param  {Object} objectDOM [description]
	 */
	dispatchDesktopsInScreenChange(objectDOM) {
		objectDOM.dispatchEvent( this.desktopsInScreenChange );
	}

	/**
	 * [onDesktopsBoundingFinish description]
	 * @param  {Object}   objectDOM [description]
	 * @param  {Function} callback  [description]
	 */
	onDesktopsBoundingFinish(objectDOM, callback) {
		objectDOM.addEventListener( "desktopsboundingfinish", callback );
	}

	/**
	 * [offDesktopsBoundingFinish description]
	 * @param  {Object}   objectDOM [description]
	 * @param  {Function} callback  [description]
	 */
	offDesktopsBoundingFinish(objectDOM, callback) {
		objectDOM.removeEventListener( "desktopsboundingfinish", callback );
	}

	/**
	 * [dispatchDesktopsBoundingFinish description]
	 * @param  {Object} objectDOM [description]
	 */
	dispatchDesktopsBoundingFinish(objectDOM) {
		objectDOM.dispatchEvent( this.desktopsBoundingFinish );
	}
}
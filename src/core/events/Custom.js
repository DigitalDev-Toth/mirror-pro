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
		this.desktopsSelectedChange = new CustomEvent( "desktopsselectedchange" );
		this.desktopsSelectedMerge = new CustomEvent( "desktopsselectedmerge" );
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

	/**
	 * [onDesktopsSelectedChange description]
	 * @param  {Object}   objectDOM [description]
	 * @param  {Function} callback  [description]
	 */
	onDesktopsSelectedChange(objectDOM, callback) {
		objectDOM.addEventListener( "desktopsselectedchange", callback );
	}

	/**
	 * [offDesktopsSelectedChange description]
	 * @param  {Object}   objectDOM [description]
	 * @param  {Function} callback  [description]
	 */
	offDesktopsSelectedChange(objectDOM, callback) {
		objectDOM.removeEventListener( "desktopsselectedchange", callback );
	}

	/**
	 * [dispatchDesktopsSelectedChange description]
	 * @param  {Object} objectDOM [description]
	 */
	dispatchDesktopsSelectedChange(objectDOM) {
		objectDOM.dispatchEvent( this.desktopsSelectedChange );
	}

	/**
	 * [onDesktopsSelectedMerge description]
	 * @param  {Object}   objectDOM [description]
	 * @param  {Function} callback  [description]
	 */
	onDesktopsSelectedMerge(objectDOM, callback) {
		objectDOM.addEventListener( "desktopsselectedmerge", callback );
	}

	/**
	 * [offDesktopsSelectedMerge description]
	 * @param  {Object}   objectDOM [description]
	 * @param  {Function} callback  [description]
	 */
	offDesktopsSelectedMerge(objectDOM, callback) {
		objectDOM.removeEventListener( "desktopsselectedmerge", callback );
	}

	/**
	 * [dispatchDesktopsSelectedMerge description]
	 * @param  {Object} objectDOM [description]
	 */
	dispatchDesktopsSelectedMerge(objectDOM) {
		objectDOM.dispatchEvent( this.desktopsSelectedMerge );
	}
}
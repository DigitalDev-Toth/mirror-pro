/**
 * 
 */
export class Custom {

	/**
	 * [constructor description]
	 */
	constructor() {
		/**
		 * [desktopsInScreenChange description]
		 * @type {CustomEvent}
		 */
		this.desktopsInScreenChange = new CustomEvent( "desktopsinscreenchange" );
		this.desktopsBoundariesFinish = new CustomEvent( "desktopsboundariesfinish" );
		this.desktopsSelectedChange = new CustomEvent( "desktopsselectedchange" );
		this.desktopsSelection = new CustomEvent( "desktopsselection" );
		this.desktopsResize = new CustomEvent( "desktopsresize" );
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
	 * [onDesktopsBoundariesFinish description]
	 * @param  {Object}   objectDOM [description]
	 * @param  {Function} callback  [description]
	 */
	onDesktopsBoundariesFinish(objectDOM, callback) {
		objectDOM.addEventListener( "desktopsboundariesfinish", callback );
	}

	/**
	 * [offDesktopsBoundariesFinish description]
	 * @param  {Object}   objectDOM [description]
	 * @param  {Function} callback  [description]
	 */
	offDesktopsBoundariesFinish(objectDOM, callback) {
		objectDOM.removeEventListener( "desktopsboundariesfinish", callback );
	}

	/**
	 * [dispatchDesktopsBoundariesFinish description]
	 * @param  {Object} objectDOM [description]
	 */
	dispatchDesktopsBoundariesFinish(objectDOM) {
		objectDOM.dispatchEvent( this.desktopsBoundariesFinish );
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

	/**
	 * [onDesktopsSelection description]
	 * @param  {Object}   objectDOM [description]
	 * @param  {Function} callback  [description]
	 */
	onDesktopsSelection(objectDOM, callback) {
		objectDOM.addEventListener( "desktopsselection", callback );
	}

	/**
	 * [offDesktopsSelection description]
	 * @param  {Object}   objectDOM [description]
	 * @param  {Function} callback  [description]
	 */
	offDesktopsSelection(objectDOM, callback) {
		objectDOM.removeEventListener( "desktopsselection", callback );
	}

	/**
	 * [dispatchDesktopsSelection description]
	 * @param  {Object} objectDOM [description]
	 */
	dispatchDesktopsSelection(objectDOM) {
		objectDOM.dispatchEvent( this.desktopsSelection );
	}

	/**
	 * [onDesktopsResize description]
	 * @param  {Object}   objectDOM [description]
	 * @param  {Function} callback  [description]
	 */
	onDesktopsResize(objectDOM, callback) {
		objectDOM.addEventListener( "desktopsresize", callback );
	}

	/**
	 * [offDesktopsResize description]
	 * @param  {Object}   objectDOM [description]
	 * @param  {Function} callback  [description]
	 */
	offDesktopsResize(objectDOM, callback) {
		objectDOM.removeEventListener( "desktopsresize", callback );
	}

	/**
	 * [dispatchDesktopsResize description]
	 * @param  {Object} objectDOM [description]
	 */
	dispatchDesktopsResize(objectDOM) {
		objectDOM.dispatchEvent( this.desktopsResize );
	}
}
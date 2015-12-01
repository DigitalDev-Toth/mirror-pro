/**
 * 
 */
export class Custom {

	/**
	 * [constructor description]
	 */
	constructor() {

		this.layoutChange = new CustomEvent( "layoutchange" );
		this.layoutBoundariesFinish = new CustomEvent( "layoutboundariesfinish" );
		this.layoutGenericEvent = new CustomEvent( "layoutgenericevent" );
	}

	/**
	 * [onLayoutChange description]
	 * @param  {Object}   objectDOM [description]
	 * @param  {Function} callback  [description]
	 */
	onLayoutChange(objectDOM, callback) {
		objectDOM.addEventListener( "layoutchange", callback );
	}

	/**
	 * [offLayoutChange description]
	 * @param  {Object}   objectDOM [description]
	 * @param  {Function} callback  [description]
	 */
	offLayoutChange(objectDOM, callback) {
		objectDOM.removeEventListener( "layoutchange", callback );
	}

	/**
	 * [dispatchLayoutChange description]
	 * @param  {Object} objectDOM [description]
	 */
	dispatchLayoutChange(objectDOM) {
		objectDOM.dispatchEvent( this.layoutChange );
	}

	/**
	 * [onLayoutBoundariesFinish description]
	 * @param  {Object}   objectDOM [description]
	 * @param  {Function} callback  [description]
	 */
	onLayoutBoundariesFinish(objectDOM, callback) {
		objectDOM.addEventListener( "layoutboundariesfinish", callback );
	}

	/**
	 * [offLayoutBoundariesFinish description]
	 * @param  {Object}   objectDOM [description]
	 * @param  {Function} callback  [description]
	 */
	offLayoutBoundariesFinish(objectDOM, callback) {
		objectDOM.removeEventListener( "layoutboundariesfinish", callback );
	}

	/**
	 * [dispatchLayoutBoundariesFinish description]
	 * @param  {Object} objectDOM [description]
	 */
	dispatchLayoutBoundariesFinish(objectDOM) {
		objectDOM.dispatchEvent( this.layoutBoundariesFinish );
	}

	/**
	 * [onLayoutGenericEvent description]
	 * @param  {Object}   objectDOM [description]
	 * @param  {Function} callback  [description]
	 */
	onLayoutGenericEvent(objectDOM, callback) {
		objectDOM.addEventListener( "layoutgenericevent", callback );
	}

	/**
	 * [offLayoutGenericEvent description]
	 * @param  {Object}   objectDOM [description]
	 * @param  {Function} callback  [description]
	 */
	offLayoutGenericEvent(objectDOM, callback) {
		objectDOM.removeEventListener( "layoutgenericevent", callback );
	}

	/**
	 * [dispatchLayoutGenericEvent description]
	 * @param  {Object} objectDOM [description]
	 * @param  {Object} options [description]
	 */
	dispatchLayoutGenericEvent(objectDOM, option) {
		this.layoutGenericEvent.option = option;

		objectDOM.dispatchEvent( this.layoutGenericEvent );
	}
}
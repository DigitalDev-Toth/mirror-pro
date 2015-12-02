/**
 * 
 */
export class Custom {

	/**
	 * [constructor description]
	 */
	constructor() {

		this.containerGenericEvent = new CustomEvent( "containergenericevent" );
		this.layoutChange = new CustomEvent( "layoutchange" );
		this.layoutBoundariesFinish = new CustomEvent( "layoutboundariesfinish" );
		this.layoutGenericEvent = new CustomEvent( "layoutgenericevent" );
	}

	/**
	 * [onContainerGenericEvent description]
	 * @param  {Object}   objectDOM [description]
	 * @param  {Function} callback  [description]
	 */
	onContainerGenericEvent(objectDOM, callback) {
		objectDOM.addEventListener( "containergenericevent", callback );
	}

	/**
	 * [offContainerGenericEvent description]
	 * @param  {Object}   objectDOM [description]
	 * @param  {Function} callback  [description]
	 */
	offContainerGenericEvent(objectDOM, callback) {
		objectDOM.removeEventListener( "containergenericevent", callback );
	}

	/**
	 * [dispatchContainerGenericEvent description]
	 * @param  {Object} objectDOM [description]
	 * @param  {Object} options   [description]
	 */
	dispatchContainerGenericEvent(objectDOM, options) {
		this.containerGenericEvent.options = options

		objectDOM.dispatchEvent( this.containerGenericEvent );
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
	 * @param  {Object} options   [description]
	 */
	dispatchLayoutChange(objectDOM, options) {
		this.layoutChange.options = options

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
	 * @param  {Object} options   [description]
	 */
	dispatchLayoutGenericEvent(objectDOM, options) {
		this.layoutGenericEvent.options = options;

		objectDOM.dispatchEvent( this.layoutGenericEvent );
	}
}
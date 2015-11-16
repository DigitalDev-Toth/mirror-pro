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
		this.numberOfBlocksChange = new CustomEvent( "numberofblockschange" );
	}

	/**
	 * [onNumberOfBlocksChange description]
	 * @param  {Object}   objectDOM [description]
	 * @param  {Function} callback  [description]
	 */
	onNumberOfBlocksChange(objectDOM, callback) {
		objectDOM.addEventListener( "numberofblockschange", callback );
	}

	/**
	 * [offNumberOfBlocksChange description]
	 * @param  {Object}   objectDOM [description]
	 * @param  {Function} callback  [description]
	 */
	offNumberOfBlocksChange(objectDOM, callback) {
		objectDOM.removeEventListener( "numberofblockschange", callback );
	}

	/**
	 * [dispatchNumberOfBlocksChange description]
	 * @param  {Object} objectDOM [description]
	 */
	dispatchNumberOfBlocksChange(objectDOM) {
		objectDOM.dispatchEvent( this.numberOfBlocksChange );
	}
}
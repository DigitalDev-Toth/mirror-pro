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
		/**
		 * [addBlockChange description]
		 * @type {CustomEvent}
		 */
		this.addBlockChange = new CustomEvent( "addblockchange" );
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

	/**
	 * [onAddBlockChange description]
	 * @param  {Object}   objectDOM [description]
	 * @param  {Function} callback  [description]
	 */
	onAddBlockChange(objectDOM, callback) {
		objectDOM.addEventListener( "addblockchange" );
	}

	/**
	 * [offAddBlockChange description]
	 * @param  {Object}   objectDOM [description]
	 * @param  {Function} callback  [description]
	 */
	offAddBlockChange(objectDOM, callback) {
		objectDOM.removeEventListener( "addblockchange", callback );
	}

	/**
	 * [dispatchAddBlockChange description]
	 * @param  {Object} objectDOM [description]
	 */
	dispatchAddBlockChange(objectDOM) {
		objectDOM.dispatchEvent( this.addBlockChange );
	}
}
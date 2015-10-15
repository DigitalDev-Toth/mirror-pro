/**
 * 
 */
export class Custom {

	/**
	 * [constructor description]
	 */
	constructor() {
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
}
/**
 * 
 */
export class Block {

	/**
	 * [constructor description]
	 * @param  {String} blockName [description]
	 */
	constructor(blockName = "block", menuObject = null) {
		/**
		 * [blockName description]
		 * @type {String}
		 */
		this.blockName = blockName;
		/**
		 * [menuObject description]
		 * @type {Object}
		 */
		this.menuObject = menuObject;
	}

	run() {

	}

	appendToMenu() {
		this.menuObject.numberOfBlocks++;


	}

	appendContent() {
		let content = "Block content";
	}
}
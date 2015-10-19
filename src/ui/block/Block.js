import { LookAndFeel } from "./LookAndFeel";
import { Core } from "../../core";

/**
 * 
 */
export class Block {

	/**
	 * [constructor description]
	 * @param  {String} blockName  [description]
	 * @param  {Object} menuObject [description]
	 */
	constructor(menuObject = null) {
		/**
		 * [blockID description]
		 * @type {String}
		 */
		this.blockID = null;
		/**
		 * [menuObject description]
		 * @type {Object}
		 */
		this.menuObject = menuObject;
		/**
		 * [title description]
		 * @type {String}
		 */
		this.title = "block";
		/**
		 * [content description]
		 * @type {Object}
		 */
		this.content = null;
	}

	/**
	 * [run description]
	 */
	run() {
		if ( this.menuObject.getMenuContainerContentID() ) {
			this.setNumberOfBlocks();
			this.setBlockID();

			let menuContainerContentID = this.menuObject.getMenuContainerContentID(),
				menuContainerContentDOM = this.menuObject.getMenuContainerContent( 
					menuContainerContentID 
				);

			menuContainerContentDOM = this.paintLookAndFeel( menuContainerContentDOM );

			this.setDOMBlockIDs( menuContainerContentDOM );

			this.setBlockContent();

			this.appendContentToDOM();

			this.updateMenuContainerContentSize( menuContainerContentDOM );
		} else {
			console.log( "ERROR: menuContainerContentID not found!" );
		}
	}

	/**
	 * [setNumberOfBlocks description]
	 */
	setNumberOfBlocks() {
		this.menuObject.numberOfBlocks++;

		/*Core.Instances.customEvents.dispatchNumberOfBlocksChange( window );*/
	}

	/**
	 * [setBlockID description]
	 */
	setBlockID() {
		if ( this.menuObject.menuContainerPanel === "body" ) {
			this.blockID = `body-menu-block-${ this.menuObject.numberOfBlocks }`;
		}
		
		if ( this.menuObject.menuContainerPanel === "main" ) {
			this.blockID = `main-menu-block-${ this.menuObject.numberOfBlocks }`;
		}
	}

	/**
	 * [paintLookAndFeel description]
	 * @param  {Object} menuContainerContentDOM [description]
	 * @return {Object}                         [description]
	 */
	paintLookAndFeel(menuContainerContentDOM) {
		menuContainerContentDOM.innerHTML += LookAndFeel[ 
			this.menuObject.menuContainerPanel 
		].DOM;

		return menuContainerContentDOM;
	}

	/**
	 * [setBlockIDs description]
	 * @param {Object} menuContainerContentDOM [description]
	 */
	setDOMBlockIDs(menuContainerContentDOM) {
		let blockContainer = menuContainerContentDOM.children[ 
			this.menuObject.numberOfBlocks - 1 
		];

		blockContainer.setAttribute( "id", this.blockID );

		if ( this.menuObject.menuContainerPanel === "body" ) {
			let blockTitle = blockContainer.children[0];

			blockTitle.setAttribute( "id", `${ this.blockID }-title` );

			let blockContent = blockContainer.children[1];

			blockContent.setAttribute( "id", `${ this.blockID }-content` );
		} 

		if ( this.menuObject.menuContainerPanel === "main" ) {
			let blockContent = blockContainer.children[0];

			blockContent.setAttribute( "id", `${ this.blockID }-content` );
		}
		
	}

	/**
	 * [getBlockContainer description]
	 * @return {Object} [description]
	 */
	getBlockContainer() {
		return document.getElementById( this.blockID );
	}

	/**
	 * [setBlockContent description]
	 * @param {String} title   [description]
	 * @param {Object} content [description]
	 */
	setBlockContent(title, content) {
		this.title = `Block title ${ this.menuObject.numberOfBlocks }`; 
		this.content = `Block content ${ this.menuObject.numberOfBlocks } Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum iusto architecto veniam odio at tempora aut itaque voluptatibus soluta aperiam recusandae, incidunt ducimus totam vero temporibus maiores pariatur. Maiores, ab.`; 
	}
	
	/**
	 * [appendContentToDOM description]
	 */
	appendContentToDOM() {
		let blockTitle = document.getElementById( `${ this.blockID }-title` ),
			blockContent = document.getElementById( `${ this.blockID }-content` );

		if ( blockTitle ) {
			blockTitle.innerHTML = this.title;
		}

		blockContent.innerHTML = this.content;
	}

	/**
	 * [setMenuContainerContentSize description]
	 * @param {Object} menuContainerContentDOM [description]
	 */
	updateMenuContainerContentSize(menuContainerContentDOM) {
		let blockContainer = this.getBlockContainer();

		if ( menuContainerContentDOM.style.width === "" ) {
			menuContainerContentDOM.style.width = "90px";
		}

		if ( menuContainerContentDOM.style.height === "" ) {
			menuContainerContentDOM.style.height = "0px";
		}

		if ( this.menuObject.menuContainerPanel === "body" ) {
			menuContainerContentDOM.style.height = `${ parseInt( menuContainerContentDOM.style.height ) + blockContainer.offsetHeight }px`; 
		}
		
		if ( this.menuObject.menuContainerPanel === "main" ) {
			menuContainerContentDOM.style.width = `${ parseInt( menuContainerContentDOM.style.width ) + blockContainer.offsetWidth }px`;
		}
	}
}
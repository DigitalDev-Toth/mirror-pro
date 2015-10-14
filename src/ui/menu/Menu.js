import { LookAndFeel } from "./LookAndFeel";
import { Event } from "../../event";

/**
 * 
 */
export class Menu {

	/**
	 * [constructor description]
	 * @param  {String} menuContainerPanel [description]
	 */
	constructor(menuContainerPanel = "body") {
		/**
		 * [menuContainer description]
		 * @type {String}
		 */
		this.menuContainerPanel = menuContainerPanel;
		/**
		 * [maxBlocks description]
		 * @type {Number}
		 */
		this.numberOfBlocks = 0;
	}

	/**
	 * [run description]
	 */
	run() {
		if ( this.getMenuContainerPanelID() ) {
			let menuContainerPanelDOM = this.getMenuContainerPanel( this.getMenuContainerPanelID() );

			menuContainerPanelDOM = this.paintLookAndFeel( menuContainerPanelDOM );

			this.setLookAndFeelSizes( menuContainerPanelDOM );

			this.setResponsiveSizes( menuContainerPanelDOM );
		} else {
			console.log( "ERROR: menuContainerPanelID not found!" );
		}	
	}

	/**
	 * [getMenuContainerPanelID description]
	 * @return {String|Boolean} [description]
	 */
	getMenuContainerPanelID() {
		if ( this.menuContainerPanel === "body" ) {
			return "panel-body-menu";
		}

		if ( this.menuContainerPanel === "main" ) {
			return "panel-body-main-menu";
		}

		return false;
	}

	/**
	 * [getMenuContainerPanel description]
	 * @param  {String} menuContainerPanelID [description]
	 * @return {Object}                      [description]
	 */
	getMenuContainerPanel(menuContainerPanelID) {
		return document.getElementById( menuContainerPanelID );
	}

	/**
	 * [paintLookAndFeel description]
	 * @param  {Object} menuContainerDOM [description]
	 * @return {Object}                  [description]
	 */
	paintLookAndFeel(menuContainerPanelDOM) {		
		menuContainerPanelDOM.innerHTML = LookAndFeel[ this.menuContainerPanel ].DOM;

		return menuContainerPanelDOM;
	}

	/**
	 * [getMenuContainerID description]
	 * @return {String|Boolean} [description]
	 */
	getMenuContainerID() {
		if ( this.menuContainerPanel === "body" ) {
			return "body-menu-container";
		}

		if ( this.menuContainerPanel === "main" ) {
			return "main-menu-container";
		}

		return false;
	}

	/**
	 * [getMenuContainer description]
	 * @param  {String} menuContainerID [description]
	 * @return {Object}                 [description]
	 */
	getMenuContainer(menuContainerID) {
		return document.getElementById( menuContainerID );
	}

	/**
	 * [getMenuContainerContentID description]
	 * @return {String|Boolean} [description]
	 */
	getMenuContainerContentID() {
		if ( this.menuContainerPanel === "body" ) {
			return "body-menu-content";
		}

		if ( this.menuContainerPanel === "main" ) {
			return "main-menu-content";
		}

		return false;
	}

	/**
	 * [getMenuContainerContent description]
	 * @param  {String} menuContainerContentID [description]
	 * @return {Object}                        [description]
	 */
	getMenuContainerContent(menuContainerContentID) {
		return document.getElementById( menuContainerContentID );
	}

	/**
	 * [setLookAndFeelSizes description]
	 * @param {Object} menuContainerPanelDOM [description]
	 */
	setLookAndFeelSizes(menuContainerPanelDOM) {
		if ( this.getMenuContainerID() ) {
			let menuContainerDOM = this.getMenuContainer( this.getMenuContainerID() );

			menuContainerDOM.style.width = `${ parseInt( menuContainerPanelDOM.style.width ) }px`;
			menuContainerDOM.style.height = `${ parseInt( menuContainerPanelDOM.style.height ) }px`;

			if ( this.menuContainerPanel === "body" ) {
				this.setLookAndFeelSizesForBodyMenu( menuContainerDOM );
			}

			if ( this.menuContainerPanel === "main" ) {
				this.setLookAndFeelSizesForMainMenu( menuContainerDOM );
			}
		} else {
			console.log( "ERROR: menuContainerID not found!" );
		}
	}

	setLookAndFeelSizesForBodyMenu(menuContainerDOM) {
		let menuContainerBodyContentDOM = document.getElementById( "body-menu-content" );

		menuContainerBodyContentDOM.style.width = menuContainerDOM.style.width;
		menuContainerBodyContentDOM.style.height = menuContainerDOM.style.height;
	}

	setLookAndFeelSizesForMainMenu(menuContainerDOM) {
		let menuContainerMainContentDOM = document.getElementById( "main-menu-content" );

		menuContainerMainContentDOM.style.width = menuContainerDOM.style.width;
		menuContainerMainContentDOM.style.height = menuContainerDOM.style.height;
	}

	setResponsiveSizes(menuContainerPanelDOM) {
		let eventCommon = new Event.Common();

		eventCommon.onResize(() => {
			this.setLookAndFeelSizes( menuContainerPanelDOM );
		});
	}
}
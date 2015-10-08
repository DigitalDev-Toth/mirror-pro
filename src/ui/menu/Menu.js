import { LookAndFeel } from "./LookAndFeel";

/**
 * 
 */
export class Menu {

	/**
	 * [constructor description]
	 * @param  {String} menuId             [description]
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
		this.maxBlocks = 4;
	}

	/**
	 * [run description]
	 */
	run() {
		if ( this.getMenuContainerPanelId() ) {
			let menuContainerPanelDOM = this.getMenuContainerPanel( this.getMenuContainerPanelId() );

			menuContainerPanelDOM = this.paintLookAndFeel( menuContainerPanelDOM );

			this.setLookAndFeelSizes( menuContainerPanelDOM );
		} else {
			console.log( "ERROR: menuContainerPanelId not found!" );
		}	
	}

	/**
	 * [getMenuContainerPanelId description]
	 * @return {String|Boolean} [description]
	 */
	getMenuContainerPanelId() {
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
	 * @param  {String} menuContainerPanelId [description]
	 * @return {Object}                      [description]
	 */
	getMenuContainerPanel(menuContainerPanelId) {
		return document.getElementById( menuContainerPanelId );
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
	 * [getMenuContainerId description]
	 * @return {String|Boolean} [description]
	 */
	getMenuContainerId() {
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
	 * @param  {String} menuContainerId [description]
	 * @return {Object}                 [description]
	 */
	getMenuContainer(menuContainerId) {
		return document.getElementById( menuContainerId );
	}

	setLookAndFeelSizes(menuContainerPanelDOM) {
		if ( this.getMenuContainerId() ) {
			let menuContainerDOM = this.getMenuContainer( this.getMenuContainerId() );

			menuContainerDOM.style.width = `${ parseInt( menuContainerPanelDOM.style.width ) }px`;
			menuContainerDOM.style.height = `${ parseInt( menuContainerPanelDOM.style.height ) }px`;
		} else {
			console.log( "ERROR: menuContainerId not found!" );
		}		
	}
}
import { Utils } from "../../core/utils";
import { LookAndFeel } from "./LookAndFeel";
import { Event } from "../../event";

/**
 * 
 */
export class WorkSpace {
	
	/**
	 * [constructor description]
	 * @param  {String} workSpaceID [description]
	 */
	constructor(workSpaceID = "workspace") {
		/**
		 * [workSpaceID description]
		 * @type {String}
		 */
		this.workSpaceID = workSpaceID;
	}

	/**
	 * [run description]
	 */
	run() {
		let workspaceDOM = null;
		
		if ( !Utils.workSpaceDetection( this.workSpaceID ) ) {
			workspaceDOM = this.createWorkSpace();

			this.appendWorkSpaceToBody( workspace );
		} else {
			workspaceDOM = this.getWorkSpace();
		}
		
		workspaceDOM = this.setWorkSpaceSize( workspaceDOM );

		workspaceDOM = this.paintLookAndFeel( workspaceDOM );

		this.setLookAndFeelSizes( workspaceDOM );

		this.setResponsiveSizes( workspaceDOM );
	}

	/**
	 * [createWorkSpace description]
	 * @return {Object} [description]
	 */
	createWorkSpace() {
		let workspaceDOM = document.createElement( "div" );
		workspaceDOM.setAttribute( "id", this.workSpaceID );

		return workspaceDOM;
	}

	/**
	 * [appendWorkSpaceToBody description]
	 * @param  {Object} workspace [description]
	 */
	appendWorkSpaceToBody(workspaceDOM) {
		document.body.appendChild( workspaceDOM );
	}

	/**
	 * [getWorkSpace description]
	 * @return {Object} [description]
	 */
	getWorkSpace() {
		return document.getElementById( this.workSpaceID );
	}

	/**
	 * [setWorkSpaceSize description]
	 * @param  {Object} workspace [description]
	 * @return {Object} [description]
	 */
	setWorkSpaceSize(workspaceDOM) {
		workspaceDOM.style.width = `${ window.innerWidth }px`;
		workspaceDOM.style.height = `${ window.innerHeight }px`;
		
		return workspaceDOM;
	}

	/**
	 * [paintLookAndFeel description]
	 * @param {Object} workspace [description]
	 * @return {Object} [description]
	 */
	paintLookAndFeel(workspaceDOM) {
		workspaceDOM.innerHTML = LookAndFeel.DOM;

		return workspaceDOM;
	}

	/**
	 * [setLookAndFeelSizes description]
	 * @param {Object} workspaceDOM [description]
	 */
	setLookAndFeelSizes(workspaceDOM) {
		let panelHeaderDOM = document.getElementById( "panel-header" );

		panelHeaderDOM.style.height = "20px";

		let panelBodyDOM = document.getElementById( "panel-body" );

		panelBodyDOM.style.height = `${ window.innerHeight - 20 }px`; // 20px panelHeader height

		let panelBodyMenuDOM = document.getElementById( "panel-body-menu" );

		panelBodyMenuDOM.style.width = "140px";
		panelBodyMenuDOM.style.height = `${ parseInt( panelBodyDOM.style.height ) - 3 }px`; // 3px border

		let panelBodyNavigatorbarDOM = document.getElementById( "panel-body-navigatorbar" );

		panelBodyNavigatorbarDOM.style.width = "20px";
		panelBodyNavigatorbarDOM.style.height = `${ parseInt( panelBodyDOM.style.height ) - 3 }px`; // 3px border

		let panelBodyMainDOM = document.getElementById( "panel-body-main" ),
			panelBodyMainDOMSubstract = 0;

		for ( let sum of [ parseInt( panelBodyMenuDOM.style.width ), parseInt( panelBodyNavigatorbarDOM.style.width ), 6 ] ) {
			panelBodyMainDOMSubstract += sum;
		}

		panelBodyMainDOM.style.width = `${ parseInt( workspaceDOM.style.width ) - panelBodyMainDOMSubstract }px`;
		panelBodyMainDOM.style.height = `${ parseInt( panelBodyDOM.style.height ) - 3 }px`; // 3px border

		let panelBodyMainMenuDOM = document.getElementById( "panel-body-main-menu" );

		panelBodyMainMenuDOM.style.width = `${ parseInt( panelBodyMainDOM.style.width ) }px`;
		panelBodyMainMenuDOM.style.height = "25px";

		let panelBodyMainContextsDOM = document.getElementById( "panel-body-main-contexts" );

		panelBodyMainContextsDOM.style.width = `${ parseInt( panelBodyMainDOM.style.width ) }px`;
		panelBodyMainContextsDOM.style.height = `${ parseInt( panelBodyMainDOM.style.height ) - parseInt( panelBodyMainMenuDOM.style.height ) }px`;
	}

	setResponsiveSizes(workspaceDOM) {
		let eventCommon = new Event.Common();

		eventCommon.onResize(() => {
			workspaceDOM = this.setWorkSpaceSize( workspaceDOM );
			this.setLookAndFeelSizes( workspaceDOM );
		});
	}
}
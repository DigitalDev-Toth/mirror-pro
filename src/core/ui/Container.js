import React from "react";
import ReactDOM from "react-dom";

import { ContainerStructure } from "./components/ContainerComponents.jsx";

/**
 * 
 */
export class Container {
	
	/**
	 * [constructor description]
	 */
	constructor() {
		this.createContainer();
		this.createContainerStructure();
	}

	/**
	 * [createContainer description]
	 */
	createContainer() {		
		let mirrorPro = document.createElement( "div" );
		mirrorPro.setAttribute( "id", "mirrorPro" );

		document.body.appendChild( mirrorPro );
	}

	/**
	 * [createContainerStructure description]
	 */
	createContainerStructure() {
		console.log(ReactDOM);
		ReactDOM.render( 
			<ContainerStructure />, 
			document.getElementById( "mirrorPro" ) 
		);
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

		let panelBodyMenuDOM = document.getElementById( "panel-primary-menu" );

		panelBodyMenuDOM.style.width = "140px";
		panelBodyMenuDOM.style.height = `${ parseInt( panelBodyDOM.style.height ) - 3 }px`; // 3px border

		let panelBodyNavigatorbarDOM = document.getElementById( "panel-navigatorbar" );

		panelBodyNavigatorbarDOM.style.width = "20px";
		panelBodyNavigatorbarDOM.style.height = `${ parseInt( panelBodyDOM.style.height ) - 3 }px`; // 3px border

		let panelBodyMainDOM = document.getElementById( "panel-body-main" ),
			panelBodyMainDOMSubstract = 0;

		for ( let sum of [ parseInt( panelBodyMenuDOM.style.width ), 
						   parseInt( panelBodyNavigatorbarDOM.style.width ), 
						   6 ] ) {
			panelBodyMainDOMSubstract += sum;
		}

		panelBodyMainDOM.style.width = `${ parseInt( workspaceDOM.style.width ) - panelBodyMainDOMSubstract }px`;
		panelBodyMainDOM.style.height = `${ parseInt( panelBodyDOM.style.height ) - 3 }px`; // 3px border

		let panelBodyMainMenuDOM = document.getElementById( "panel-secondary-menu" );

		panelBodyMainMenuDOM.style.width = `${ parseInt( panelBodyMainDOM.style.width ) }px`;
		panelBodyMainMenuDOM.style.height = "35px";

		let panelBodyMainContextsDOM = document.getElementById( "panel-contexts" );

		panelBodyMainContextsDOM.style.width = `${ parseInt( panelBodyMainDOM.style.width ) }px`;
		panelBodyMainContextsDOM.style.height = `${ parseInt( panelBodyMainDOM.style.height ) - parseInt( panelBodyMainMenuDOM.style.height ) }px`;
	}

	setResponsiveSizes(workspaceDOM) {
		Core.Instances.commonEvents.onResize(() => {
			workspaceDOM = this.setWorkSpaceSize( workspaceDOM );

			this.setLookAndFeelSizes( workspaceDOM );
		});
	}
}
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
		ReactDOM.render( 
			<ContainerStructure />, 
			document.getElementById( "mirrorPro" ) 
		);
	}
}
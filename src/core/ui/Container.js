import React from "react";
import ReactDOM from "react-dom";

import { ContainerStructure } from "./components/basics/ContainerComponent.jsx";

/**
 * 
 */
export class Container {
	
	/**
	 * [constructor description]
	 */
	constructor( primaryBlocks, secondaryBlocks ) {
		this.createContainer();
		this.createContainerStructure( primaryBlocks, secondaryBlocks );
	}

	/**
	 * [createContainer description]
	 */
	createContainer() {		
		let mirrorPro = document.createElement( "div" );
		
		mirrorPro.setAttribute( "id", "mirror-pro" );

		document.body.appendChild( mirrorPro );
	}

	/**
	 * [createContainerStructure description]
	 */
	createContainerStructure( primaryBlocks, secondaryBlocks ) {
		ReactDOM.render( 
			<ContainerStructure 
				primaryBlocks={ primaryBlocks } 
				secondaryBlocks={ secondaryBlocks } />, 
			document.getElementById( "mirror-pro" ) 
		);
	}


}
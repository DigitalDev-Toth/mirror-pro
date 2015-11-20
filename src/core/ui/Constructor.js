import React from "react";
import ReactDOM from "react-dom";

import { ContainerStructure } from "./components/basics/ContainerComponent.jsx";
import { DesktopTool } from "./components/tools/DesktopComponent.jsx";

export class Constructor {
	
	/**
	 * [constructor description]
	 */
	constructor() {
		this.blockToolContainerCount = 0;

		this.createContainer();
		this.createStructure();

		this.createTool( "primary" );
		this.createTool( "primary" );
		this.createTool( "primary" );
		this.createTool( "primary" );
		this.createTool( "primary" );
		this.createTool( "primary" );
		this.createTool( "primary" );
		this.createTool( "primary" );
		this.createTool( "primary" );
		this.createTool( "primary" );
		this.createTool( "primary" );
		this.createTool( "primary" );
		this.createTool( "primary" );
		this.createTool( "secondary" );
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
	createStructure() {
		ReactDOM.render( 
			<ContainerStructure />, 
			document.getElementById( "mirror-pro" ) 
		);
	}

	createTool(where = "primary") {
		if ( where === "primary" ) {
			let blockContainer = document.getElementById( "primary-menu-content" ),
				blockToolContainer = document.createElement( "div" );

			blockToolContainer.setAttribute( "id", `block-tool-container-${ this.blockToolContainerCount }` );

			blockContainer.appendChild( blockToolContainer );

			ReactDOM.render( 
				<DesktopTool click={ `block-tool-container-${ this.blockToolContainerCount }` } />, 
				document.getElementById( `block-tool-container-${ this.blockToolContainerCount }` )
			);
		} else if ( where === "secondary" ) {
			let blockContainer = document.getElementById( "secondary-menu-content" ),
				blockToolContainer = document.createElement( "div" );

			blockToolContainer.setAttribute( "id", `block-tool-container-${ this.blockToolContainerCount }` );

			blockContainer.appendChild( blockToolContainer );

			ReactDOM.render( 
				<DesktopTool click={ `block-tool-container-${ this.blockToolContainerCount }` } />, 
				document.getElementById( `block-tool-container-${ this.blockToolContainerCount }` )
			);
		}	

		this.blockToolContainerCount++;	
	}
}
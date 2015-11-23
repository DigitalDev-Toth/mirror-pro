import React from "react";
import ReactDOM from "react-dom";

import { Core } from "../../core";
import { ContainerComponent } from "./components/basics/ContainerComponent.jsx";
import { LayoutComponent } from "./components/basics/LayoutComponent.jsx";
import { DesktopTool } from "./components/tools/DesktopTool.jsx";
import { TotalDesktopTool } from "./components/tools/TotalDesktopTool.jsx";

export class Constructor {
	
	/**
	 * [constructor description]
	 */
	constructor() {
		this.blockToolContainerCount = 0;

		this.createContainer();
		this.createStructure();

		this.createLayout();

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
		this.createTool( "secondary" );
		this.createTool( "secondary" );
		this.createTool( "secondary" );
		this.createTool( "secondary" );
		this.createTool( "secondary" );
		this.createTool( "secondary" );
		this.createTool( "secondary" );
		this.createTool( "secondary" );
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
			<ContainerComponent />, 
			document.getElementById( "mirror-pro" ) 
		);
	}

	/**
	 * [createLayout description]
	 */
	createLayout() {
		ReactDOM.render( 
			<LayoutComponent />, 
			document.getElementById( "panel-layout" ) 
		);
	}

	/**
	 * [createTool description]
	 * @param  {String} where [description]
	 */
	createTool(where = "primary") {
		let blockContainer = document.getElementById( `${ where }-menu-content` ),
			blockToolContainer = document.createElement( "div" );

		blockToolContainer.setAttribute( "id", `block-tool-container-${ this.blockToolContainerCount }` );

		blockContainer.appendChild( blockToolContainer );

		if (where === "primary") {
			ReactDOM.render( 
				<DesktopTool click={ `block-tool-container-${ this.blockToolContainerCount }` } />, 
				document.getElementById( `block-tool-container-${ this.blockToolContainerCount }` )
			);
		} else {
			blockToolContainer.setAttribute( "class", "secondary-block" );

			ReactDOM.render( 
				<TotalDesktopTool />, 
				document.getElementById( `block-tool-container-${ this.blockToolContainerCount }` )
			);
		}		

		this.blockToolContainerCount++;	
	}
}
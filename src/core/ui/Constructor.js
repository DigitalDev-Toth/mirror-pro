import React from "react";
import ReactDOM from "react-dom";

import { Core } from "../../core";
import { ContainerComponent } from "./components/basics/ContainerComponent.jsx";
import { LayoutComponent } from "./components/basics/LayoutComponent.jsx";
import { LayoutTools } from "./components/tools/LayoutTools.jsx";
import { LayoutTotalsTools } from "./components/tools/LayoutTotalsTools.jsx";

/**
 * 
 */
export class Constructor {
	
	/**
	 * [constructor description]
	 */
	constructor() {
		this.blockToolContainerID = 0;

		this.createContainer();
		this.createStructure();		
		this.createLayout();
		this.createTool( "primary", LayoutTools );

		this.createTool( "secondary", LayoutTotalsTools );
		this.createTool( "secondary", LayoutTotalsTools );
		this.createTool( "secondary", LayoutTotalsTools );
		this.createTool( "secondary", LayoutTotalsTools );
		this.createTool( "secondary", LayoutTotalsTools );
		this.createTool( "secondary", LayoutTotalsTools );
		this.createTool( "secondary", LayoutTotalsTools );
		this.createTool( "secondary", LayoutTotalsTools );
		this.createTool( "secondary", LayoutTotalsTools );
		this.createTool( "secondary", LayoutTotalsTools );
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
	createTool(where = "primary", Component) {
		let blockContainer = document.getElementById( `${ where }-menu-content` ),
			blockToolContainer = document.createElement( "div" );

		blockToolContainer.setAttribute( "id", `block-tool-container-${ this.blockToolContainerID }` );

		blockContainer.appendChild( blockToolContainer );

		if (where === "primary") {
			ReactDOM.render( 
				<Component />, 
				document.getElementById( `block-tool-container-${ this.blockToolContainerID }` )
			);
		} else {
			blockToolContainer.setAttribute( "class", "secondary-block" );

			ReactDOM.render( 
				<Component />, 
				document.getElementById( `block-tool-container-${ this.blockToolContainerID }` )
			);
		}		

		this.blockToolContainerID++;	
	}
}
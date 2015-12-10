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
export class Creator {
	
	/**
	 * [constructor description]
	 */
	constructor() {
		this.blockToolContainerID = 0;

		this.container();
		this.structure();		
		this.layout();

		this.tool( "primary", LayoutTools, "layout-tools" );

		this.tool( "secondary", LayoutTotalsTools, "layout-totals-tools-1" );
		this.tool( "secondary", LayoutTotalsTools, "layout-totals-tools-2" );
		this.tool( "secondary", LayoutTotalsTools, "layout-totals-tools-3" );
		this.tool( "secondary", LayoutTotalsTools, "layout-totals-tools-4" );
		this.tool( "secondary", LayoutTotalsTools, "layout-totals-tools-5" );
		this.tool( "secondary", LayoutTotalsTools, "layout-totals-tools-6" );
		this.tool( "secondary", LayoutTotalsTools, "layout-totals-tools-7" );
		this.tool( "secondary", LayoutTotalsTools, "layout-totals-tools-8" );
		this.tool( "secondary", LayoutTotalsTools, "layout-totals-tools-9" );
		this.tool( "secondary", LayoutTotalsTools, "layout-totals-tools-10" );
	}

	/**
	 * [container description]
	 */
	container() {		
		let mirrorPro = document.createElement( "div" );
		
		mirrorPro.setAttribute( "id", "mirror-pro" );

		document.body.appendChild( mirrorPro );
	}

	/**
	 * [structure description]
	 */
	structure() {
		ReactDOM.render( 
			<ContainerComponent />, 
			document.getElementById( "mirror-pro" ) 
		);
	}

	/**
	 * [layout description]
	 */
	layout() {
		ReactDOM.render( 
			<LayoutComponent />, 
			document.getElementById( "panel-layout" ) 
		);
	}

	/**
	 * [tool description]
	 * @param  {String} where [description]
	 */
	tool(where = "primary", Component, blockID = "") {
		let blockContainer = document.getElementById( `${ where }-menu-content` ),
			blockToolContainer = document.createElement( "div" );

		blockToolContainer.setAttribute( "id", `block-tool-container-${ this.blockToolContainerID }` );

		blockContainer.appendChild( blockToolContainer );

		if (where === "primary") {
			ReactDOM.render( 
				<Component id={ blockID } />, 
				document.getElementById( `block-tool-container-${ this.blockToolContainerID }` )
			);
		} else {
			blockToolContainer.setAttribute( "class", "secondary-block" );

			ReactDOM.render( 
				<Component id={ blockID } />, 
				document.getElementById( `block-tool-container-${ this.blockToolContainerID }` )
			);
		}		

		this.blockToolContainerID++;	
	}
}
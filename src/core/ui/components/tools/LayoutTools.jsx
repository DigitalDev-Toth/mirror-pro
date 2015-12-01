import React from "react";

import { Core } from "../../../../core";
import { PrimaryBlockComponent } from "../basics/BlockComponent.jsx";
import { ButtonComponent } from "../basics/ButtonComponent.jsx";

/**
 * 
 */
export class LayoutTools extends React.Component {

	/**
	 * [constructor description]
	 */
	constructor() {
        super();

        Core.UI.layoutTools = {
        	layoutSelectable: false,
        	layoutResizable: false
        };
    }

    /**
     * [handleClick description]
     * @param  {Object} tool   [description]
     * @param  {Object} option [description]
     * @param  {Object} event  [description]
     */
  	handleClick(tool, option, event) {
  		switch( tool ) {
  			case 1:
	  			Core.UI.desksInScreen += option; 	

		      	if ( Core.UI.desksInScreen > 0 ) {
		      		Core.Events.CustomEvents.dispatchLayoutChange( window );
		      	} else {
		      		Core.UI.desksInScreen = 1;
		      	}

		        Core.UI.desksSelected = {};
		        break;

	        case 2:
	        	this.toolsReset();

  				Core.UI.layoutTools["layoutSelectable"] = !Core.UI.layoutTools["layoutSelectable"];

  				Core.Events.CustomEvents.dispatchLayoutGenericEvent( window, "selectable" );
  				break;

			case 3:
				this.toolsReset();

  				Core.UI.layoutTools["layoutResizable"] = !Core.UI.layoutTools["layoutResizable"];

  				Core.Events.CustomEvents.dispatchLayoutGenericEvent( window, "resizable" );
  				break;

			case 4:
				if ( Object.keys( Core.UI.desksSelected ).length === 2 ) {
        			Core.Events.CustomEvents.dispatchLayoutGenericEvent( window, "merge" );	
    			} 
    			break;
  		}		
  	}

  	/**
  	 * [toolsReset description]
  	 */
  	toolsReset() {
  		for ( let tool in Core.UI.layoutTools ) {
  			Core.UI.layoutTools[tool] = false;
  		}
  	}

	/**
	 * [render description]
	 */
	render() {
		return ( 
			<PrimaryBlockComponent title="Escritorios">
				<div className="text-center">
					<ButtonComponent>a</ButtonComponent>
					<ButtonComponent>b</ButtonComponent>
					<ButtonComponent>c</ButtonComponent>
					<ButtonComponent handleClick={ this.handleClick.bind( this, 4 ) }>1</ButtonComponent>
					<ButtonComponent handleClick={ this.handleClick.bind( this, 2 ) }>2</ButtonComponent>
					<ButtonComponent handleClick={ this.handleClick.bind( this, 3 ) }>3</ButtonComponent>
					<ButtonComponent>4</ButtonComponent>
					<ButtonComponent handleClick={ this.handleClick.bind( this, 1, -1 ) }>-</ButtonComponent>
					<ButtonComponent handleClick={ this.handleClick.bind( this, 1, 1 ) }>+</ButtonComponent>
				</div>
			</PrimaryBlockComponent>
		);
	}
}
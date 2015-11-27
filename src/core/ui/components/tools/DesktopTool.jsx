import React from "react";

import { Core } from "../../../../core";
import { PrimaryBlockComponent } from "../basics/BlockComponent.jsx";
import { ButtonComponent } from "../basics/ButtonComponent.jsx";

export class DesktopTool extends React.Component {

	/**
	 * [constructor description]
	 */
	constructor() {
        super();

        Core.UI.desktopsSelection = false;
        Core.UI.desktopsResize = false;
    }

    /**
     * [handleClick description]
     * @param  {String} operation [description]
     * @param  {Object} event     [description]
     */
  	handleClick(option, operation, event) {
  		if ( option === 1 ) {
  			if ( operation === "-" ) {
	  			Core.UI.desktopsInScreen--;
	  		} else if ( operation === "+" ) {
	  			Core.UI.desktopsInScreen++;  			
	  		}  	

	      	if ( Core.UI.desktopsInScreen > 0 ) {
	      		Core.Events.CustomEvents.dispatchDesktopsInScreenChange( window );
	      	} else {
	      		Core.UI.desktopsInScreen = 1;
	      	}

	        Core.UI.desktopsSelected = {};
  		} else if ( option === 2 ) {
  			if ( Object.keys( Core.UI.desktopsSelected ).length === 2 ) {
        		Core.Events.CustomEvents.dispatchDesktopsSelectedMerge( window );
    		} 
  		} else if ( option === 3 ) {
  			if ( !Core.UI.desktopsResize ) {
  				if ( Core.UI.desktopsSelection ) {  				
	  				Core.UI.desktopsSelection = false;
	  			} else {
	  				Core.UI.desktopsSelection = true;
	  			}

	  			Core.Events.CustomEvents.dispatchDesktopsSelection( window );
  			}  			
  		} else if ( option === 4 ) {
  			if ( !Core.UI.desktopsSelection ) {
  				if ( Core.UI.desktopsResize ) {  				
	  				Core.UI.desktopsResize = false;
	  			} else {
	  				Core.UI.desktopsResize = true;
	  			}

	  			Core.Events.CustomEvents.dispatchDesktopsResize( window );
  			}  			
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
					<ButtonComponent handleClick={ this.handleClick.bind( this, 2 ) }>1</ButtonComponent>
					<ButtonComponent handleClick={ this.handleClick.bind( this, 3 ) }>2</ButtonComponent>
					<ButtonComponent handleClick={ this.handleClick.bind( this, 4 ) }>3</ButtonComponent>
					<ButtonComponent>4</ButtonComponent>
					<ButtonComponent handleClick={ this.handleClick.bind( this, 1, "-" ) }>-</ButtonComponent>
					<ButtonComponent handleClick={ this.handleClick.bind( this, 1, "+" ) }>+</ButtonComponent>
				</div>
			</PrimaryBlockComponent>
		);
	}
}
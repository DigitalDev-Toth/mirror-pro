import React from "react";

import { Core } from "../../../../core";
import { PrimaryBlockComponent } from "../basics/BlockComponent.jsx";
import { ButtonComponent } from "../basics/ButtonComponent.jsx";

export class DesktopTool extends React.Component {

    /**
     * [handleResize description]
     * @param  {Object} event [description]
     */
  	handleMouseDown(event) {
  		console.log(this.props.click);
  	}

  	/**
  	 * [handleClick description]
  	 * @param  {Object} event [description]
  	 */
  	handleClick(operation, event) {
  		if ( operation === "-" ) {
  			Core.VARS.desktopsInScreen--;
  		} else if ( operation === "+" ) {
  			Core.VARS.desktopsInScreen++;  			
  		}  	

      	if ( Core.VARS.desktopsInScreen > 0 ) {
      		Core.Events.CustomEvents.dispatchDesktopsInScreenChange( window );
      	} else {
      		Core.VARS.desktopsInScreen = 1;
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
					<ButtonComponent handleMouseDown={ this.handleMouseDown.bind( this ) }>1</ButtonComponent>
					<ButtonComponent>2</ButtonComponent>
					<ButtonComponent>3</ButtonComponent>
					<ButtonComponent>4</ButtonComponent>
					<ButtonComponent handleClick={ this.handleClick.bind( this, "-" ) }>-</ButtonComponent>
					<ButtonComponent handleClick={ this.handleClick.bind( this, "+" ) }>+</ButtonComponent>
				</div>
			</PrimaryBlockComponent>
		);
	}
}
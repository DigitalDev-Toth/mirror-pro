import React from "react";

import { Core } from "../../../../core";

export class DesktopComponent extends React.Component {

	/**
	 * [constructor description]
	 */
	constructor() {
        super();

        this.state = {
    		selection: "desktop-unselected"
    	};
    }

	/**
	 * [handleClick description]
	 * @param  {Object} event [description]
	 */
  	handleClick(event) {
  		if ( this.state.selection === "desktop-unselected" ) {
  			Core.VARS.desktopsSelected[ this.props.desktop ] = this.props.style;

  			this.setState({
	    		selection: "desktop-selected"
	    	});
  		} else {
  			delete Core.VARS.desktopsSelected[ this.props.desktop ];

  			this.setState({
	    		selection: "desktop-unselected"
	    	});
  		} 	

  		Core.Events.CustomEvents.dispatchDesktopsSelectedChange( window );
  	}

	/**
	 * [render description]
	 */
	render() {
		return ( 
			<div  
				className={ this.state.selection }
				style={ this.props.style }
				onClick={ this.handleClick.bind( this ) }></div>
		);
	}
}
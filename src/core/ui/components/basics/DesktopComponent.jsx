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
     * [componentWillUpdate description]
     */
    componentWillUpdate() {
    	this.state.selection = "desktop-unselected";
    }

	/**
	 * [handleClick description]
	 * @param  {Object} event [description]
	 */
  	handleClick(event) {
  		if ( this.state.selection === "desktop-unselected" ) {
  			Core.UI.desktopsSelected[ this.props.index ] = this.props.style;

  			this.setState({
	    		selection: "desktop-selected"
	    	});
  		} else {
  			delete Core.UI.desktopsSelected[ this.props.index ];

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
				onClick={ this.props.desktopSelection ? this.handleClick.bind( this ) : null }></div>
		);
	}
}
import React from "react";

import { Core } from "../../../../core";

/**
 * 
 */
export class DeskComponent extends React.Component {

	/**
	 * [constructor description]
	 */
	constructor() {
        super();

        this.state = {
    		selection: "desk-unselected"
    	};
    }

    /**
     * [componentWillUpdate description]
     */
    componentWillUpdate() {
    	this.state.selection = "desk-unselected";
    }

	/**
	 * [handleClick description]
	 * @param  {Object} event [description]
	 */
  	handleClick(event) {
  		if ( this.state.selection === "desk-unselected" ) {
  			Core.UI.desksSelected[ this.props.index ] = this.props.style;

  			this.setState({
	    		selection: "desk-selected"
	    	});
  		} else {
  			delete Core.UI.desksSelected[ this.props.index ];

  			this.setState({
	    		selection: "desk-unselected"
	    	});
  		} 	
  	}

	/**
	 * [render description]
	 */
	render() {
		return ( 
			<div  
				className={ this.state.selection }
				style={ this.props.style }
				onClick={ this.props.toolLayoutSelection ? this.handleClick.bind( this ) : null }></div>
		);
	}
}
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
  		this.setState({
    		selection: "desktop-selected"
    	});

    	this.props.handleClick();
  	}

	/**
	 * [render description]
	 */
	render() {
		return ( 
			<div  
				className={ this.state.selection }
				key={ this.props.key }
				style={ this.props.style }
				onClick={ this.handleClick.bind( this ) }></div>
		);
	}
}
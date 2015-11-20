import React from "react";

export class Button extends React.Component {

	/**
	 * [render description]
	 */
	render() {
		return ( 
			<button 
				className="btn btn-mirror-pro" 
				type="button" 
				onMouseDown={ this.props.handleMouseDown }>{ this.props.children }</button>
		);
	}
}
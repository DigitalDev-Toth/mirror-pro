import React from "react";

/**
 * 
 */
export class ButtonComponent extends React.Component {

	/**
	 * [render description]
	 */
	render() {
		return ( 
			<button 
				className="btn btn-mirror-pro" 
				type="button" 
				onMouseDown={ this.props.handleMouseDown }
				onClick={ this.props.handleClick }
				style={ this.props.display ? { display: "block" } : { display: "none" } }>{ this.props.children }</button>
		);
	}
}
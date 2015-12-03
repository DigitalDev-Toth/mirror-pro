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
				style={ this.props.display ? { display: "block" } : { display: "none" } }
				data-toggle={ this.props.dataToggle }
				data-target={ this.props.dataTarget }>{ this.props.children }</button>
		);
	}
}
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
				className={ `btn ${ this.props.class }` } 
				type="button" 
				onMouseDown={ this.props.handleMouseDown }
				onClick={ this.props.handleClick }
				disabled={ this.props.disabled ? "disabled" : "" }
				data-toggle={ this.props.dataToggle }
				data-target={ this.props.dataTarget }>{ this.props.children }</button>
		);
	}
}
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
				id={ this.props.id }
				className={ `btn ${ this.props.class }` } 
				type="button" 
				onMouseDown={ this.props.handleMouseDown }
				onClick={ this.props.handleClick }
				disabled={ this.props.disabled ? "disabled" : "" }
				data-toggle={ this.props.dataToggle }
				data-target={ this.props.dataTarget }
				data-dismiss={ this.props.dataDismiss }>{ this.props.children }</button>
		);
	}
}
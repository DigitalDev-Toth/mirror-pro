import React from "react";

/**
 * 
 */
export class InputComponent extends React.Component {

	/**
	 * [render description]
	 */
	render() {
		return ( 
			<div className="form-group custom-form-group">
    			<label htmlFor={ this.props.id }>{ this.props.label }</label>
    			<input type={ this.props.type } 
    				   className="form-control custom-form-control" 
    				   id={ this.props.id } 
    				   placeholder={ this.props.placeholder } />
			</div>
		);
	}
}
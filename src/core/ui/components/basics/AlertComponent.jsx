import React from "react";

import { ButtonComponent } from "./ButtonComponent.jsx";

/**
 * 
 */
export class AlertComponent extends React.Component {

	/**
	 * [handleClick description]
	 * @param  {Object} event [description]
	 */
	handleClick(event) {
		this.props.resetAlert();
	}

	/**
	 * [render description]
	 */
	render() {
		return ( 
			<div className="modal fade in" id="alert" 
				style={ this.props.display ? { display: "block" } : { display: "none" } }>
  				<div className="modal-dialog">
    				<div className="modal-content">
      					<div className="modal-header">
        					<h4 className="modal-title">{ this.props.title }</h4>
      					</div>
      					<div className="modal-body">
        					{ this.props.children }
      					</div>
      					<div className="modal-footer">
      						<ButtonComponent class={ "btn-default" }
      							handleClick={ this.handleClick.bind( this ) }>Aceptar</ButtonComponent>					
      					</div>
    				</div>
  				</div>
			</div>
		);
	}
}
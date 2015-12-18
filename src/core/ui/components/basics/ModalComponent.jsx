import React from "react";

import { Core } from "../../../../core";
import { ButtonComponent } from "./ButtonComponent.jsx";

/**
 * 
 */
export class ModalComponent extends React.Component {

	/**
	 * [handleClick description]
	 * @param  {Object} event [description]
	 */
	handleClick(event) {		
		if ( this.props.functionality === "save-profile-layout" ) {
			Core.Events.CustomEvents.dispatchGeneralGenericEvent( window, { tool: "save-profile-layout" } );
		}

		let fakeEvent = new MouseEvent( "click", { view: window, bubbles: true, cancelable: true } ),
			cancelButton = document.getElementById( this.props.cancelButtonID );

		cancelButton.dispatchEvent( fakeEvent );
	}

	/**
	 * [render description]
	 */
	render() {
		return ( 
			<div className="modal fade" id={ this.props.id } tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
  				<div className={ `modal-dialog ${ this.props.modalSize }` } role="document">
    				<div className="modal-content custom-modal-content">
      					<div className="modal-header custom-modal-header">
        					<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        					<h4 className="modal-title" id="myModalLabel">{ this.props.title }</h4>
      					</div>
      					<div className="modal-body custom-modal-body">
        					{ this.props.form }
      					</div>
      					<div className="modal-footer custom-modal-footer">
      						<ButtonComponent id={ this.props.cancelButtonID } class="btn-simple"      							
      							dataDismiss="modal">Cancelar</ButtonComponent>
      						<ButtonComponent id={ this.props.okButtonID } class="btn-main" 
      							handleClick={ this.handleClick.bind( this ) }>Guardar</ButtonComponent>
      					</div>
    				</div>
  				</div>
			</div>
		);
	}
}
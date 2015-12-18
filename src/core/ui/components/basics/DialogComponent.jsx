import React from "react";

import { Core } from "../../../../core";
import { ButtonComponent } from "./ButtonComponent.jsx";

/**
 * 
 */
export class DialogComponent extends React.Component {

	/**
	 * [handleClick description]
	 * @param  {Object} event [description]
	 */
	handleClick(event) {
		if ( this.props.type !== "alert" && event.target.id === "dialog-ok" ) {
			Core.Events.CustomEvents.dispatchGeneralGenericEvent( window, { tool: "delete-profile-layout" } );
		}

		this.props.resetDialog();
	}

	/**
	 * [render description]
	 */
	render() {
		let buttons = [];

		if ( this.props.type === "alert" ) {
			buttons.push( <ButtonComponent id="dialog-ok" key="dialog-alert-1" class={ `btn-${ this.props.type }` }
      							handleClick={ this.handleClick.bind( this ) }>Aceptar</ButtonComponent> )
		} else if ( this.props.type === "caution" ) {
			buttons.push( <ButtonComponent id="dialog-cancel" key="dialog-caution-1" class={ `btn-simple` }
      							handleClick={ this.handleClick.bind( this ) }>Cancelar</ButtonComponent> )
			buttons.push( <ButtonComponent id="dialog-ok" key="dialog-caution-2" class={ `btn-${ this.props.type }` }
      							handleClick={ this.handleClick.bind( this ) }>Aceptar</ButtonComponent> )
		}

		return ( 
			<div className="modal" id="dialog" 
				style={ this.props.display ? { display: "block" } : { display: "none" } }>
  				<div className={ `modal-dialog dialog-${ this.props.type }-dialog` }>
    				<div className={ `modal-content dialog-${ this.props.type }-content` }>
      					<div className={ `modal-header dialog-${ this.props.type }-header` }>
        					{ this.props.title }
      					</div>
      					<div className={ `modal-body dialog-${ this.props.type }-body` }>
        					{ this.props.children }
      					</div>
      					<div className={ `modal-footer dialog-${ this.props.type }-footer` }>
      						{ buttons }				
      					</div>
    				</div>
  				</div>
			</div>
		);
	}
}
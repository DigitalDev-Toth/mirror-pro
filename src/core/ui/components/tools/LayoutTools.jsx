import React from "react";

import { Core } from "../../../../core";
import ProfileLayouts from "json!../../../layout/utils/ProfileLayouts.json";
import { PrimaryBlockComponent } from "../basics/BlockComponent.jsx";
import { ButtonComponent } from "../basics/ButtonComponent.jsx";
import { SelectComponent } from "../basics/SelectComponent.jsx";
import { ModalComponent } from "../basics/ModalComponent.jsx";
import { InputComponent } from "../basics/InputComponent.jsx";

/**
 * 
 */
export class LayoutTools extends React.Component {

	/**
	 * [constructor description]
	 */
	constructor() {
        super();

        this.customIndex = null;

        this.predeterminedLayouts = Core.Utils.cloneObject(ProfileLayouts);

        Core.UI.layoutTools = {
        	layoutSelectable: false,
        	layoutResizable: false
        };

        this._state = {
        	selectable: false,
        	resizable: false,
        	merge: true,
        	undone: true,
        	redone: true,
        	less: false, 
        	more: false,
        	save: true,
        	delete: true,
        	reset: true,
        	cancel: true,
        	selected: 0
        };

        this.state = this._state;
    }

    /**
     * [componentDidMount description]
     */
    componentDidMount() {
        Core.Events.CustomEvents.onLayoutChange( window, this.handleLayoutChange.bind( this ) );
        Core.Events.CustomEvents.onLayoutGenericEvent( window, this.handleLayoutGenericEvent.bind( this ) );
        Core.Events.CustomEvents.onGeneralGenericEvent( window, this.handleGeneralGenericEvent.bind( this ) );
    }

    /**
     * [componentWillUnmount description]
     */
    componentWillUnmount() {
        Core.Events.CustomEvents.offLayoutChange( window, this.handleLayoutChange.bind( this ) );
        Core.Events.CustomEvents.offLayoutGenericEvent( window, this.handleLayoutGenericEvent.bind( this ) );
        Core.Events.CustomEvents.offGeneralGenericEvent( window, this.handleGeneralGenericEvent.bind( this ) );
    }

    /**
     * [handleDesksInScreenChange description]
     * @param  {Object} event [description]
     */
    handleLayoutChange(event) { 
    	if ( Core.UI.customLayout && !Core.UI.profileLayout ) {
    		let pileState = null;

    		if ( Core.UI.desksBoundariesPile.length > 0 ) {
    			pileState = false;
    		}

    		this.toolsAccessible( 
    			false, false, null, pileState, pileState, true, true, false, true, true, false 
			);
  			    
    	} else if ( Core.UI.customLayout && Core.UI.profileLayout ) {
    		let pileState = null;

    		if ( Core.UI.desksBoundariesPile.length > 0 ) {
    			pileState = false;
    		}

    		this.toolsAccessible( 
    			false, false, null, pileState, pileState, true, true, false, true, false, true 
			);
    	} else if ( !Core.UI.customLayout && Core.UI.profileLayout ) {
    		Core.UI.layoutTools.layoutSelectable = false;
    		Core.UI.layoutTools.layoutResizable = false;

    		this.toolsAccessible( false, false, true, true, true, true, true, true, true, true, true );
    	} else if ( !Core.UI.customLayout && !Core.UI.profileLayout ) {
    		Core.UI.layoutTools.layoutSelectable = false;
    		Core.UI.layoutTools.layoutResizable = false;

    		this.toolsAccessible( false, false, true, true, true, false, false, true, true, true, true ); 
    	}

    	this.setState( this._state ); 	 
    }

    /**
     * [handleLayoutGenericEvent description]
     * @param  {Object} event [description]
     */
    handleLayoutGenericEvent(event) {
        switch( event.options.tool ) {
            case "selectable":
            	if ( Core.UI.layoutTools.layoutSelectable ) {
            		this.toolsAccessible( null, null, false, null, null, null, null, null, null, null, null ); 
	        	} else {
	        		this.toolsAccessible( null, null, true, null, null, null, null, null, null, null, null ); 
	        	}                             
                break;

            case "resizable":
                if ( Core.UI.layoutTools.layoutSelectable ) {
            		this.toolsAccessible( null, null, false, null, null, null, null, null, null, null, null ); 
	        	} else {
	        		this.toolsAccessible( null, null, true, null, null, null, null, null, null, null, null ); 
	        	}
                break;
        } 

        this.setState( this._state );           
    }

    /**
     * [handleGeneralGenericEvent description]
     * @param  {Object} event [description]
     */
    handleGeneralGenericEvent(event) {
        switch( event.options.tool ) {
            case "save-profile-layout":
            	console.log("save profile layout");
            	break;

            case "delete-profile-layout":
            	console.log("delete profile layout");
            	break;
        } 

        this.setState( this._state );           
    }

    /**
     * [handleClick description]
     * @param  {Object} tool      [description]
     * @param  {Number} operation [description]
     * @param  {Object} event     [description]
     */
  	handleClick(tool, operation, event) {
  		switch( tool ) {
  			case 1:
	  			Core.UI.desksInScreen += operation; 	

		      	if ( Core.UI.desksInScreen > 0 ) {
		      		Core.Events.CustomEvents.dispatchLayoutChange( window, { operation } );
		      	} else {
		      		Core.UI.desksInScreen = 1;
		      	}

		        Core.UI.desksSelected = {};
		        break;

	        case 2:
	        	this.toolsReset( "layoutSelectable" );

        		Core.UI.layoutTools.layoutSelectable = !Core.UI.layoutTools.layoutSelectable;
	        	
  				Core.Events.CustomEvents.dispatchLayoutGenericEvent( window, { tool: "selectable" } );
  				break;

			case 3:
				this.toolsReset( "layoutResizable" );

  				Core.UI.layoutTools.layoutResizable = !Core.UI.layoutTools.layoutResizable;

  				Core.Events.CustomEvents.dispatchLayoutGenericEvent( window, { tool: "resizable" } );
  				break;

			case 4:
				if ( Object.keys( Core.UI.desksSelected ).length === 2 ) {
        			Core.Events.CustomEvents.dispatchLayoutGenericEvent( window, { tool: "merge" } );	
    			} 
    			break;

			case 5:
				if ( Core.UI.customLayout ) {
					Core.Events.CustomEvents.dispatchLayoutGenericEvent( window, { tool: "undone" } );
				}
				break;

			case 6:
				if ( Core.UI.customLayout ) {
					Core.Events.CustomEvents.dispatchLayoutGenericEvent( window, { tool: "redone" } );
				}				
				break;

			case 7:
				if ( Core.UI.customLayout ) {
					Core.Events.CustomEvents.dispatchLayoutGenericEvent( window, { tool: "cancel" } );
				}	
				break;

			case 8:
				if ( Core.UI.customLayout ) {
					var layout = Core.Utils.cloneObject(ProfileLayouts[this.customIndex]);

					Core.Events.CustomEvents.dispatchLayoutGenericEvent( 
						window, 
						{ tool: "reset", profileLayout: { panelLayoutSize: layout.panelLayoutSize, desksBoundaries: layout.desksBoundaries } }  
					);
				}	
				break;
  		}		
  	}

  	/**
  	 * [handleChange description]
  	 * @param  {Object} event [description]
  	 */
  	handleChange(event) {
  		Core.UI.customLayout = false;
  		Core.UI.desksBoundariesPile = [];
		Core.UI.layoutTools.layoutSelectable = false;
		Core.UI.layoutTools.layoutResizable = false;

  		if ( event.target.options.selectedIndex === 0 ) {  			
  			Core.UI.profileLayout = false;			

  			this.toolsAccessible( false, false, true, true, true, false, false, true, true, true, true );
  		} else {
  			Core.UI.profileLayout = true;
  			
  			this.toolsAccessible( false, false, true, true, true, true, true, true, true, true, true );

  			let item = Core.Utils.findItemInObject( 
  				ProfileLayouts, 
  				"name", 
  				event.target.options[event.target.options.selectedIndex].text
			);

  			if ( item !== false ) {
  				let layout = Core.Utils.cloneObject(item[0]);
				this.customIndex = item[1];

				Core.Events.CustomEvents.dispatchLayoutGenericEvent( 
	  				window, 
	  				{ tool: "custom", profileLayout: { panelLayoutSize: layout.panelLayoutSize, desksBoundaries: layout.desksBoundaries } }
				);
  			} else {
  				Core.Events.CustomEvents.dispatchContainerGenericEvent( 
        		window, 
        		{ 
        			subject: "dialog", 
        			type: "alert",
        			title: "Error",
        			message: "No se encontró el layout" 
        		} 
    		);
  			}			
  		} 

  		this.setState( this._state );
  	}

  	/**
  	 * [toolsReset description]
  	 */
  	toolsReset(layoutTool) {
  		for ( let tool in Core.UI.layoutTools ) {
  			if ( tool !== layoutTool ) {
  				Core.UI.layoutTools[tool] = false;
  			}  			
  		}
  	}

  	/**
  	 * [toolsAccessible description]
  	 * @param  {Array} options [description]
  	 */
  	toolsAccessible(...options) {
  		this._state.selectable = options[0] === null ? this._state.selectable : options[0];
		this._state.resizable = options[1] === null ? this._state.resizable : options[1];
		this._state.merge = options[2] === null ? this._state.merge : options[2];
		this._state.undone = options[3] === null ? this._state.undone : options[3];
		this._state.redone = options[4] === null ? this._state.redone : options[4];
		this._state.less = options[5] === null ? this._state.less : options[5];
		this._state.more = options[6] === null ? this._state.more : options[6];
		this._state.save = options[7] === null ? this._state.save : options[7];
		this._state.delete = options[8] === null ? this._state.delete : options[8];
		this._state.reset = options[9] === null ? this._state.reset : options[9];
		this._state.cancel = options[10] === null ? this._state.cancel : options[10];
  	}

	/**
	 * [render description]
	 */
	render() {
		let optionsSelectComponent = [],
			optionsPredeterminedLayouts = [];

		for ( let i in this.predeterminedLayouts ) {
			optionsPredeterminedLayouts.push({
				value: `predefined_${ i }`,
				text: this.predeterminedLayouts[i].name 
			});		
		}

		optionsSelectComponent.push( "Por Defecto" );
		optionsSelectComponent.push({
			label: "Predeterminados",
			options: optionsPredeterminedLayouts
		});
		optionsSelectComponent.push({
			label: "Personalizados",
			options: [
				{ value: "Perfil 1", text: "Perfil 1" },
				{ value: "Perfil 2", text: "Perfil 2" },
				{ value: "Perfil 3", text: "Perfil 3" }
			]
		});

		let Modal = "";

		if ( !this.state.save ) {
			let form = [];

			form.push( <InputComponent key="input-save-profile-layout-1" 
									   id="profile-layout-name" 
									   type="text" 
									   placeholder="Ingresa un nombre"
									   label="Nombre del perfil" /> );

			Modal = <ModalComponent id="save-profile-layout" 
									modalSize=""
									title="Guardar perfil"
									form={ form }
									functionality="save-profile-layout"
									cancelButtonID="save-profile-layout-cancel-button"
									okButtonID="save-profile-layout-save-button" />
		}

		return ( 
			<PrimaryBlockComponent title="Escritorios" id={ this.props.id }>
				<div>
					<SelectComponent id="layout-tools-layouts-selection"
									 options={ optionsSelectComponent } 
					                 handleChange={ this.handleChange.bind( this ) }
					                 class="select-primary-block" />
					<ButtonComponent id="layout-tools-save"
									 disabled={ this.state.save } 
									 dataToggle="modal" 
									 dataTarget="#save-profile-layout"
									 class="btn-primary-block">Guardar</ButtonComponent>
				 	<ButtonComponent id="layout-tools-reset"
				 					 handleClick={ this.handleClick.bind( this, 8 ) } 
									 disabled={ this.state.reset }
									 class="btn-primary-block">Reiniciar</ButtonComponent>
				 	<ButtonComponent id="layout-tools-delete"
				 					 disabled={ this.state.delete } 
									 dataToggle="modal" 
									 dataTarget="#myModal"
									 class="btn-primary-block">Eliminar</ButtonComponent>
					<ButtonComponent id="layout-tools-undone"
									 handleClick={ this.handleClick.bind( this, 5 ) } 
									 disabled={ this.state.undone }
									 class="btn-primary-block">Deshacer</ButtonComponent>
					<ButtonComponent id="layout-tools-redone"
									 handleClick={ this.handleClick.bind( this, 6 ) } 
					                 disabled={ this.state.redone }
					                 class="btn-primary-block">Rehacer</ButtonComponent>					
					<ButtonComponent id="layout-tools-selectable"
									 handleClick={ this.handleClick.bind( this, 2 ) } 
					                 disabled={ this.state.selectable }
					                 class="btn-primary-block">Seleccionable</ButtonComponent>
					<ButtonComponent id="layout-tools-merge"
									 handleClick={ this.handleClick.bind( this, 4 ) } 
					                 disabled={ this.state.merge }
					                 class="btn-primary-block">Unir</ButtonComponent>
					<ButtonComponent id="layout-tools-resizable"
									 handleClick={ this.handleClick.bind( this, 3 ) } 
									 disabled={ this.state.resizable }
									 class="btn-primary-block">Redimensionable</ButtonComponent>	
					<ButtonComponent id="layout-tools-cancel"
					  				 handleClick={ this.handleClick.bind( this, 7 ) } 
									 disabled={ this.state.cancel }
									 class="btn-primary-block">Cancelar</ButtonComponent>				
					<ButtonComponent id="layout-tools-less"
									 handleClick={ this.handleClick.bind( this, 1, -1 ) } 
									 disabled={ this.state.less }
									 class="btn-primary-block">-</ButtonComponent>
					<ButtonComponent id="layout-tools-more"
									 handleClick={ this.handleClick.bind( this, 1, 1 ) } 
									 disabled={ this.state.more }
									 class="btn-primary-block">+</ButtonComponent>
				</div>
				{ Modal }
			</PrimaryBlockComponent>			
		);
	}
}
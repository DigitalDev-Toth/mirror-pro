import React from "react";

import { Core } from "../../../../core";
import { PrimaryBlockComponent } from "../basics/BlockComponent.jsx";
import { ButtonComponent } from "../basics/ButtonComponent.jsx";
import { SelectComponent } from "../basics/SelectComponent.jsx";
import { ModalComponent } from "../basics/ModalComponent.jsx";

/**
 * 
 */
export class LayoutTools extends React.Component {

	/**
	 * [constructor description]
	 */
	constructor() {
        super();

        Core.UI.layoutTools = {
        	layoutSelectable: false,
        	layoutResizable: false
        };

        this._state = {
        	selectable: false,
        	resizable: false,
        	merge: false,
        	undone: false,
        	redone: false,
        	less: false, 
        	more: false,
        	save: true,
        	delete: true,
        	reset: true,
        	selected: 0
        };

        this.state = this._state;
    }

    /**
     * [componentDidMount description]
     */
    componentDidMount() {
        Core.Events.CustomEvents.onLayoutChange( window, this.handleLayoutChange.bind( this ) );        
    }

    /**
     * [componentWillUnmount description]
     */
    componentWillUnmount() {
        Core.Events.CustomEvents.offLayoutChange( window, this.handleLayoutChange.bind( this ) );
    }

    /**
     * [handleDesksInScreenChange description]
     * @param  {Object} event [description]
     */
    handleLayoutChange(event) { 
    	if ( Core.UI.layoutCustom ) {
    		this.toolsAccessible( false, false, false, false, false, true, true, false, false, false );    		

  			this.setState(this._state);    
    	}    	 
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
  				Core.UI.layoutCustom = false;
	  			Core.UI.desksInScreen += operation; 	

		      	if ( Core.UI.desksInScreen > 0 ) {
		      		Core.Events.CustomEvents.dispatchLayoutChange( window, { operation } );
		      	} else {
		      		Core.UI.desksInScreen = 1;
		      	}

		        Core.UI.desksSelected = {};
		        break;

	        case 2:
	        	this.toolsReset();

	        	Core.UI.layoutCustom = true;
  				Core.UI.layoutTools["layoutSelectable"] = !Core.UI.layoutTools["layoutSelectable"];

  				Core.Events.CustomEvents.dispatchLayoutGenericEvent( window, { tool: "selectable" } );
  				break;

			case 3:
				this.toolsReset();

				Core.UI.layoutCustom = true;
  				Core.UI.layoutTools["layoutResizable"] = !Core.UI.layoutTools["layoutResizable"];

  				Core.Events.CustomEvents.dispatchLayoutGenericEvent( window, { tool: "resizable" } );
  				break;

			case 4:
				if ( Object.keys( Core.UI.desksSelected ).length === 2 ) {
        			Core.Events.CustomEvents.dispatchLayoutGenericEvent( window, { tool: "merge" } );	
    			} 
    			break;

			case 5:
				if ( Core.UI.layoutCustom ) {
					Core.Events.CustomEvents.dispatchLayoutGenericEvent( window, { tool: "undone" } );
				}
				break;

			case 6:
				if ( Core.UI.layoutCustom ) {
					Core.Events.CustomEvents.dispatchLayoutGenericEvent( window, { tool: "redone" } );
				}				
				break;
  		}		
  	}

  	/**
  	 * [handleChange description]
  	 * @param  {Object} event [description]
  	 */
  	handleChange(event) {
  		if ( event.target.options.selectedIndex === 0 ) {
  			Core.UI.layoutCustom = false;

  			this.toolsAccessible( false, false, false, false, false, false, false, true, true, true ); 
  		} else if ( event.target.options.selectedIndex === 1 ) {
  			Core.UI.layoutCustom = false;
  			
  			this.toolsAccessible( false, false, false, false, false, false, false, true, true, true ); 
  			
  			Core.Events.CustomEvents.dispatchLayoutGenericEvent( window, { tool: "predetermined", layout: 1 } );
  		} else if ( event.target.options.selectedIndex === 2 ) {
  			Core.UI.layoutCustom = false;
  			
  			this.toolsAccessible( false, false, false, false, false, false, false, true, true, true ); 
  			
  			Core.Events.CustomEvents.dispatchLayoutGenericEvent( window, { tool: "predetermined", layout: 2 } );
		} else if ( event.target.options.selectedIndex === 3 ) {
			Core.UI.layoutCustom = false;
  			
  			this.toolsAccessible( false, false, false, false, false, false, false, true, true, true ); 
  			
  			Core.Events.CustomEvents.dispatchLayoutGenericEvent( window, { tool: "predetermined", layout: 3 } );
		} else {
			Core.UI.layoutCustom = true;
  			
  			this.toolsAccessible( false, false, false, false, false, true, true, false, false, false ); 
		}

  		this.setState(this._state);
  	}

  	/**
  	 * [toolsReset description]
  	 */
  	toolsReset() {
  		for ( let tool in Core.UI.layoutTools ) {
  			Core.UI.layoutTools[tool] = false;
  		}
  	}

  	/**
  	 * [toolsAccessible description]
  	 * @param  {Array} options [description]
  	 */
  	toolsAccessible(...options) {
  		this._state.selectable = options[0];
		this._state.resizable = options[1];
		this._state.merge = options[2];
		this._state.undone = options[3];
		this._state.redone = options[4];
		this._state.less = options[5];
		this._state.more = options[6];
		this._state.save = options[7];
		this._state.delete = options[8];
		this._state.reset = options[9];
  	}

	/**
	 * [render description]
	 */
	render() {
		let optionsSelectComponent = [];

		optionsSelectComponent.push( "Por Defecto" );
		optionsSelectComponent.push({
			label: "Predeterminados",
			options: [
				"Layout 1",
				"Layout 2",
				"Layout 3"
			]
		});
		optionsSelectComponent.push({
			label: "Personalizados",
			options: [
				"Perfil 1",
				"Perfil 2",
				"Perfil 3"
			]
		});

		let Modal = "";

		if ( this.state.save ) {
			Modal = <ModalComponent />
		}

		return ( 
			<PrimaryBlockComponent title="Escritorios">
				<div>
					<SelectComponent options={ optionsSelectComponent } handleChange={ this.handleChange.bind( this ) } />
					<ButtonComponent disabled={ this.state.save } 
									 dataToggle="modal" 
									 dataTarget="#myModal"
									 class="btn-default btn-primary-block">Guardar</ButtonComponent>
					<ButtonComponent handleClick={ this.handleClick.bind( this, 5 ) } 
									 disabled={ this.state.undone }
									 class="btn-default btn-primary-block">Deshacer</ButtonComponent>
					<ButtonComponent handleClick={ this.handleClick.bind( this, 6 ) } 
					                 disabled={ this.state.redone }
					                 class="btn-default btn-primary-block">Rehacer</ButtonComponent>					
					<ButtonComponent handleClick={ this.handleClick.bind( this, 2 ) } 
					                 disabled={ this.state.selectable }
					                 class="btn-default btn-primary-block">Seleccionable</ButtonComponent>
					<ButtonComponent handleClick={ this.handleClick.bind( this, 4 ) } 
					                 disabled={ this.state.merge }
					                 class="btn-default btn-primary-block">Unir</ButtonComponent>
					<ButtonComponent handleClick={ this.handleClick.bind( this, 3 ) } 
									 disabled={ this.state.resizable }
									 class="btn-default btn-primary-block">Redimensionable</ButtonComponent>					
					<ButtonComponent handleClick={ this.handleClick.bind( this, 1, -1 ) } 
									 disabled={ this.state.less }
									 class="btn-default btn-primary-block">-</ButtonComponent>
					<ButtonComponent handleClick={ this.handleClick.bind( this, 1, 1 ) } 
									 disabled={ this.state.more }
									 class="btn-default btn-primary-block">+</ButtonComponent>
				</div>
				{ Modal }
			</PrimaryBlockComponent>			
		);
	}
}
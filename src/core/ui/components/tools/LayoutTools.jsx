import React from "react";

import { Core } from "../../../../core";
import { PrimaryBlockComponent } from "../basics/BlockComponent.jsx";
import { ButtonComponent } from "../basics/ButtonComponent.jsx";
import { SelectComponent } from "../basics/SelectComponent.jsx";

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
        	selectable: true,
        	resizable: true,
        	merge: true,
        	undone: true,
        	redone: true,
        	less: true, 
        	more: true,
        	save: false,
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
    		this.toolsAccessible(true, true, true, true, true, false, false, true);    		

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
  			this.toolsAccessible(true, true, true, true, true, true, true, false); 
  		} else {
  			Core.UI.layoutCustom = true;
  			this.toolsAccessible(true, true, true, true, true, false, false, true); 
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

  	toolsAccessible(...options) {
  		this._state.selectable = options[0];
		this._state.resizable = options[1];
		this._state.merge = options[2];
		this._state.undone = options[3];
		this._state.redone = options[4];
		this._state.less = options[5];
		this._state.more = options[6];
		this._state.save = options[7];
  	}

	/**
	 * [render description]
	 */
	render() {
		let optionsSelectComponent = [];

		optionsSelectComponent.push( "Por Defecto" );
		optionsSelectComponent.push({
			label: "Personalizados",
			options: [
				"perfil 1",
				"perfil 2",
				"perfil 3"
			]
		});

		return ( 
			<PrimaryBlockComponent title="Escritorios">
				<div>
					<SelectComponent options={ optionsSelectComponent } handleChange={ this.handleChange.bind( this ) } />
					<ButtonComponent display={ this.state.save }>Guardar</ButtonComponent>
					<ButtonComponent handleClick={ this.handleClick.bind( this, 5 ) } 
									 display={ this.state.undone }>Deshacer</ButtonComponent>
					<ButtonComponent handleClick={ this.handleClick.bind( this, 6 ) } 
					                 display={ this.state.redone }>Rehacer</ButtonComponent>					
					<ButtonComponent handleClick={ this.handleClick.bind( this, 2 ) } 
					                 display={ this.state.selectable }>Seleccionable</ButtonComponent>
					<ButtonComponent handleClick={ this.handleClick.bind( this, 4 ) } 
					                 display={ this.state.merge }>Unir</ButtonComponent>
					<ButtonComponent handleClick={ this.handleClick.bind( this, 3 ) } 
									 display={ this.state.resizable }>Redimensionable</ButtonComponent>
					
					<ButtonComponent handleClick={ this.handleClick.bind( this, 1, -1 ) } 
									 display={ this.state.less }>-</ButtonComponent>
					<ButtonComponent handleClick={ this.handleClick.bind( this, 1, 1 ) } 
									 display={ this.state.more }>+</ButtonComponent>
				</div>
			</PrimaryBlockComponent>
		);
	}
}
import React from "react";

import { Core } from "../../../../core";
import { SecondaryBlockComponent } from "../basics/BlockComponent.jsx";

export class TotalDesktopTool extends React.Component {

	/**
	 * [constructor description]
	 */
	constructor() {
        super();

        this.state = {
    		desktopsSelected: Core.UI.desktopsSelected
    	};
    }

    /**
  	 * [componentWillMount description]
  	 */
  	componentWillMount() {
        this.handleDesktopsInScreenChange();
    }

    /**
     * [componentDidMount description]
     */
    componentDidMount() {
        Core.Events.CustomEvents.onDesktopsSelectedChange( window, this.handleDesktopsSelectedChange.bind( this ) );        
    }

    /**
     * [componentWillUnmount description]
     */
    componentWillUnmount() {
        Core.Events.CustomEvents.offDesktopsSelectedChange( window, this.handleDesktopsSelectedChange.bind( this ) );
    }

    /**
     * [handleDesktopsInScreenChange description]
     * @param  {Object} event [description]
     */
    handleDesktopsSelectedChange(event) {  	
    	this.setState({
    		desktopsSelected: Core.UI.desktopsSelected
    	});       
    }

	/**
	 * [render description]
	 */
	render() {
		return ( 
			<SecondaryBlockComponent>
				<span>Escritorios seleccionados: { Object.keys( this.state.desktopsSelected ).length }</span>
			</SecondaryBlockComponent>
		);
	}
}
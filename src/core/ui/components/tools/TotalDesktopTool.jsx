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
    		desktopsInScreen: Core.VARS.desktopsInScreen
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
        Core.Events.CustomEvents.onDesktopsInScreenChange( window, this.handleDesktopsInScreenChange.bind( this ) );        
    }

    /**
     * [componentWillUnmount description]
     */
    componentWillUnmount() {
        Core.Events.CustomEvents.offDesktopsInScreenChange( window, this.handleDesktopsInScreenChange.bind( this ) );
    }

    /**
     * [handleDesktopsInScreenChange description]
     * @param  {Object} event [description]
     */
    handleDesktopsInScreenChange(event) {  	
    	this.setState({
    		desktopsInScreen: Core.VARS.desktopsInScreen
    	});       
    }

	/**
	 * [render description]
	 */
	render() {
		return ( 
			<SecondaryBlockComponent>
				<span>Total de escritorios: { this.state.desktopsInScreen }</span>
			</SecondaryBlockComponent>
		);
	}
}
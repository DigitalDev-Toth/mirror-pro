import React from "react";

import { Core } from "../../../../core";
import { SecondaryBlockComponent } from "../basics/BlockComponent.jsx";

/**
 * 
 */
export class LayoutTotalsTools extends React.Component {

	/**
	 * [constructor description]
	 */
	constructor() {
        super();

        this.state = {
    		desksInScreen: Core.UI.desksInScreen
    	};
    }

    /**
  	 * [componentWillMount description]
  	 */
  	componentWillMount() {
        this.handleLayoutChange();
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
    	this.setState({
    		desksInScreen: Core.UI.desksInScreen
    	});       
    }

	/**
	 * [render description]
	 */
	render() {
		return ( 
			<SecondaryBlockComponent>
				<span>Total de escritorios: { this.state.desksInScreen }</span>
			</SecondaryBlockComponent>
		);
	}
}
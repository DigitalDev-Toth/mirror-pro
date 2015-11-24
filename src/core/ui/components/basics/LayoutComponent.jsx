import React from "react";

import { Core } from "../../../../core";

export class LayoutComponent extends React.Component {

	/**
	 * [constructor description]
	 */
	constructor() {
        super();

        this.state = {
    		desktopsInScreen: Core.VARS.desktopsInScreen,
            desktopsSizes: []
    	};

        this.largeDesktopBound = null;
    }

    /**
  	 * [componentWillMount description]
  	 */
  	componentWillMount() {
        this.handleDesktopsInScreenChange();
        this.handleDesktopsBoundingFinish();
    }

    /**
     * [componentDidMount description]
     */
    componentDidMount() {
        Core.Events.CustomEvents.onDesktopsInScreenChange( window, this.handleDesktopsInScreenChange.bind( this ) );        
        Core.Events.CustomEvents.onDesktopsBoundingFinish( window, this.handleDesktopsBoundingFinish.bind( this ) );
    }

    /**
     * [componentWillUnmount description]
     */
    componentWillUnmount() {
        Core.Events.CustomEvents.offDesktopsInScreenChange( window, this.handleDesktopsInScreenChange.bind( this ) );
        Core.Events.CustomEvents.offDesktopsBoundingFinish( window, this.handleDesktopsBoundingFinish.bind( this ) );
    }

    /**
     * [handleDesktopsInScreenChange description]
     * @param  {Object} event [description]
     */
    handleDesktopsInScreenChange(event) {  	
    	this.setState({
    		desktopsInScreen: Core.VARS.desktopsInScreen,
            desktopsSizes: []
    	});

        this.largeDesktopBound = null;
        this.setDesktopsBounds();
    }

    /**
     * [handleDesktopsBoundingFinish description]
     * @param  {Object} event [description]
     */
    handleDesktopsBoundingFinish(event) {  
        if ( this.largeDesktopBound !== null ) {
            Core.VARS.desktopsSizes.push( this.largeDesktopBound );
        } 

        this.setState({
            desktopsInScreen: Core.VARS.desktopsInScreen,
            desktopsSizes: Core.VARS.desktopsSizes
        });
    }

    /**
     * [getPanelLayoutSize description]
     * @return {Object} [description]
     */
    getPanelLayoutSize() {
    	let panelLayoutDOM = document.getElementById( "panel-layout" );

    	return {
    		width: parseInt( panelLayoutDOM.style.width ) - 6,
    		height: parseInt( panelLayoutDOM.style.height ) - 6
    	};
    }

    /**
     * [getDesktopsBounds description]
     * @return {Array} [description]
     */
    setDesktopsBounds() {
    	let panelLayoutSize = this.getPanelLayoutSize();

		let containerWidth = 0,
			containerHeight = 0,
			desktopWidth = 0,
			desktopHeight = 0,
			largeDesktopWidth = 0,
			largeDesktopHeight = 0,
            desktopsInContainer = this.state.desktopsInScreen;

		if ( this.state.desktopsInScreen === 1 ) {
			containerWidth = panelLayoutSize.width;
			containerHeight = panelLayoutSize.height;
			desktopWidth = panelLayoutSize.width;
			desktopHeight = panelLayoutSize.height;
		}

		if ( this.state.desktopsInScreen === 2 ) {
			containerWidth = panelLayoutSize.width;
			containerHeight = panelLayoutSize.height;
			desktopWidth = panelLayoutSize.width / 2;
			desktopHeight = panelLayoutSize.height;
		}

		if ( this.state.desktopsInScreen === 3 ) {
			largeDesktopWidth = panelLayoutSize.width * 0.4;
			largeDesktopHeight = panelLayoutSize.height;
			containerWidth = panelLayoutSize.width - largeDesktopWidth;
			containerHeight = panelLayoutSize.height;
			desktopWidth = containerWidth;
			desktopHeight = containerHeight / 2;
            desktopsInContainer = this.state.desktopsInScreen - 1;
		}

		if ( this.state.desktopsInScreen > 3 ) {			
			if ( Core.Utils.isPrimeNumber( this.state.desktopsInScreen ) ) {
				let dimensions = Core.Utils.getTheCoupleOfFactorsWidthLowerDiff( this.state.desktopsInScreen - 1 );
				largeDesktopWidth = parseInt( ( panelLayoutSize.width * 0.4 ).toFixed(5) );
				largeDesktopHeight = panelLayoutSize.height;
				containerWidth = parseInt( ( panelLayoutSize.width - largeDesktopWidth ).toFixed(5) );
				containerHeight = panelLayoutSize.height;
				desktopWidth = containerWidth / dimensions[0];
				desktopHeight = containerHeight / dimensions[1];
                desktopsInContainer = this.state.desktopsInScreen - 1;
			} else {
                let dimensions = Core.Utils.getTheCoupleOfFactorsWidthLowerDiff( this.state.desktopsInScreen );
                containerWidth = panelLayoutSize.width;
                containerHeight = panelLayoutSize.height;
                desktopWidth = containerWidth / dimensions[0];
                desktopHeight = containerHeight / dimensions[1];                
			}
		}		

    	new Core.DesktopsSizes.Bounding(
            parseInt( ( containerWidth ).toFixed(5) ), 
            parseInt( ( containerHeight ).toFixed(5) ), 
            parseInt( ( desktopWidth ).toFixed(5) ), 
            parseInt( ( desktopHeight ).toFixed(5) ), 
            desktopsInContainer).initBounds();

    	if (largeDesktopWidth > 0 && largeDesktopHeight > 0) {
    		this.largeDesktopBound = {
    			width: `${ parseInt( ( largeDesktopWidth ).toFixed(5) ) }px`,
    			height: `${ parseInt( ( largeDesktopHeight ).toFixed(5) ) }px`,
    			left: `${ parseInt( ( containerWidth ).toFixed(5) ) }px`,
    			top: "0px"
    		};
    	}
    }

    /**
     * [render description]
     */
	render() {
		let desktops = [];

		for ( let i = 0; i < this.state.desktopsSizes.length; i++ ) {
			desktops.push(<div key={ `desktop_${ i }` } style={ this.state.desktopsSizes[i] }></div>);	        
		}

	    return (
			<div>	
				{ desktops }
			</div>
	    );
  	}
}
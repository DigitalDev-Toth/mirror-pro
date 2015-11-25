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

        this.setLargeDesktopBound = false;
    }

    /**
  	 * [componentWillMount description]
  	 */
  	componentWillMount() {
        this.handleDesktopsInScreenChange();
        this.handleDesktopsBoundingFinish();
        this.handleResize();
    }

    /**
     * [componentDidMount description]
     */
    componentDidMount() {
        Core.Events.CustomEvents.onDesktopsInScreenChange( window, this.handleDesktopsInScreenChange.bind( this ) );        
        Core.Events.CustomEvents.onDesktopsBoundingFinish( window, this.handleDesktopsBoundingFinish.bind( this ) );
        window.addEventListener( "resize", this.handleResize.bind( this ) );
    }

    /**
     * [componentWillUnmount description]
     */
    componentWillUnmount() {
        Core.Events.CustomEvents.offDesktopsInScreenChange( window, this.handleDesktopsInScreenChange.bind( this ) );
        Core.Events.CustomEvents.offDesktopsBoundingFinish( window, this.handleDesktopsBoundingFinish.bind( this ) );
        window.removeEventListener( "resize", this.handleResize.bind( this ) );
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

        this.setLargeDesktopBound = false;
        this.setDesktopsBounds(Core.VARS.desktopsInScreen);        
    }

    /**
     * [handleDesktopsBoundingFinish description]
     * @param  {Object} event [description]
     */
    handleDesktopsBoundingFinish(event) {  
        if ( this.setLargeDesktopBound ) {
            Core.VARS.desktopsSizes.push( 
            	this.getLargeDesktopBound( Core.VARS.desktopsInScreen, Core.VARS.desktopsSizes ) 
        	);
        } 

        this.setState({
            desktopsInScreen: Core.VARS.desktopsInScreen,
            desktopsSizes: Core.VARS.desktopsSizes
        });
    }

    /**
     * [handleResize description]
     * @param  {Object} event [description]
     */
  	handleResize(event) {
    	this.setDesktopsBounds(Core.VARS.desktopsInScreen);
  	}

    /**
     * [getPanelLayoutSize description]
     * @return {Object} [description]
     */
    getPanelLayoutSize() {
    	let panelLayoutDOM = document.getElementById( "panel-layout" );

    	return {
    		width: parseFloat( panelLayoutDOM.style.width ) - 6,
    		height: parseFloat( panelLayoutDOM.style.height ) - 6
    	};
    }

    /**
     * [setDesktopsBounds description]
     * @param {Integer} desktopsInScreen [description]
     */
    setDesktopsBounds(desktopsInScreen) {
    	let panelLayoutSize = this.getPanelLayoutSize(),
    		containerSize = {},
			desktopSize = {},
			largeDesktopSize = {},
            desktopsInContainer = desktopsInScreen;

		if ( desktopsInScreen === 1 ) {
			containerSize = panelLayoutSize;
			desktopSize = panelLayoutSize;
		}

		if ( desktopsInScreen === 2 ) {
			containerSize = panelLayoutSize;
			desktopSize.width = Core.Utils.getNumberWithTwoDecimalsTruncated( containerSize.width / 2 );
			desktopSize.height = Core.Utils.getNumberWithTwoDecimalsTruncated( containerSize.height );
		}

		if ( desktopsInScreen === 3 ) {
			largeDesktopSize.width = Core.Utils.getNumberWithTwoDecimalsTruncated( panelLayoutSize.width * 0.4 );
			largeDesktopSize.height = Core.Utils.getNumberWithTwoDecimalsTruncated( panelLayoutSize.height );
			containerSize.width = Core.Utils.getNumberWithTwoDecimalsTruncated( panelLayoutSize.width - largeDesktopSize.width );
			containerSize.height = Core.Utils.getNumberWithTwoDecimalsTruncated( panelLayoutSize.height );
			desktopSize.width = Core.Utils.getNumberWithTwoDecimalsTruncated( containerSize.width );
			desktopSize.height = Core.Utils.getNumberWithTwoDecimalsTruncated( containerSize.height / 2 );

            desktopsInContainer = desktopsInScreen - 1;
            this.setLargeDesktopBound = true;            
		}

		if ( desktopsInScreen > 3 ) {			
			if ( Core.Utils.isPrimeNumber( desktopsInScreen ) ) {
				let dimensions = Core.Utils.getTheCoupleOfFactorsWidthLowerDiff( desktopsInScreen - 1 );

				largeDesktopSize.width = Core.Utils.getNumberWithTwoDecimalsTruncated( panelLayoutSize.width * 0.4 );
				largeDesktopSize.height = Core.Utils.getNumberWithTwoDecimalsTruncated( panelLayoutSize.height );
				containerSize.width = Core.Utils.getNumberWithTwoDecimalsTruncated( panelLayoutSize.width - largeDesktopSize.width );
				containerSize.height = Core.Utils.getNumberWithTwoDecimalsTruncated( panelLayoutSize.height );
				desktopSize.width = Core.Utils.getNumberWithTwoDecimalsTruncated( containerSize.width / dimensions[0] );
				desktopSize.height = Core.Utils.getNumberWithTwoDecimalsTruncated( containerSize.height / dimensions[1] );

                desktopsInContainer = desktopsInScreen - 1;
                this.setLargeDesktopBound = true;  
			} else {
                let dimensions = Core.Utils.getTheCoupleOfFactorsWidthLowerDiff( desktopsInScreen );

                containerSize.width = Core.Utils.getNumberWithTwoDecimalsTruncated( panelLayoutSize.width );
                containerSize.height = Core.Utils.getNumberWithTwoDecimalsTruncated( panelLayoutSize.height );
                desktopSize.width = Core.Utils.getNumberWithTwoDecimalsTruncated( containerSize.width / dimensions[0] );
                desktopSize.height = Core.Utils.getNumberWithTwoDecimalsTruncated( containerSize.height / dimensions[1] );            
			}
		}		
  
    	new Core.DesktopsSizes.Bounding(containerSize, desktopSize, desktopsInContainer).initBounds();
    }

    getLargeDesktopBound(desktopsInScreen, desktopsSizes) {
    	let panelLayoutSize = this.getPanelLayoutSize(),
    		largeDesktopBound = {};

    	if ( desktopsInScreen > 3 ) {
    		let dimensions = Core.Utils.getTheCoupleOfFactorsWidthLowerDiff( desktopsInScreen - 1 );

    		largeDesktopBound.width = `${ panelLayoutSize.width - ( parseInt( desktopsSizes[0].width ) * dimensions[0] ) }px`;
    		largeDesktopBound.height = `${ parseInt( desktopsSizes[0].height ) * dimensions[1] }px`;
    		largeDesktopBound.left = `${ parseInt( desktopsSizes[0].width ) * dimensions[0] }px`;
    		largeDesktopBound.top = "0px";
    	} else {
    		largeDesktopBound.width = `${ panelLayoutSize.width - parseInt( desktopsSizes[0].width ) }px`;
    		largeDesktopBound.height = `${ parseInt( desktopsSizes[0].height ) * 2 }px`;
    		largeDesktopBound.left = `${ parseInt( desktopsSizes[0].width ) }px`;
    		largeDesktopBound.top = "0px";
    	}

    	return largeDesktopBound;
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
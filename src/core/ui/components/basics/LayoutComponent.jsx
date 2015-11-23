import React from "react";

import { Core } from "../../../../core";

export class LayoutComponent extends React.Component {

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
    getDesktopsBounds() {
    	let panelLayoutSize = this.getPanelLayoutSize();

		let containerWidth = 0,
			containerHeight = 0,
			desktopWidth = 0,
			desktopHeight = 0,
			largeDesktopWidth = 0,
			largeDesktopHeight = 0;

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
		}

		if ( this.state.desktopsInScreen > 3 ) {			
			if ( Core.Utils.isPrimeNumber( this.state.desktopsInScreen ) ) {
				let dimensions = Core.Utils.getTheCoupleOfFactorsWidthLowerDiff( this.state.desktopsInScreen - 1 );
				largeDesktopWidth = panelLayoutSize.width * 0.4;
				largeDesktopHeight = panelLayoutSize.height;
				containerWidth = panelLayoutSize.width - largeDesktopWidth;
				containerHeight = panelLayoutSize.height;
				desktopWidth = containerWidth / 3;
				desktopHeight = containerHeight / 2;
			} else {
				let dimensions = Core.Utils.getTheCoupleOfFactorsWidthLowerDiff( this.state.desktopsInScreen );
				largeDesktopWidth = panelLayoutSize.width * 0.4;
				largeDesktopHeight = panelLayoutSize.height;
				containerWidth = panelLayoutSize.width - largeDesktopWidth;
				containerHeight = panelLayoutSize.height;
				desktopWidth = containerWidth / 3;
				desktopHeight = containerHeight / 2;
			}
		}		

    	let bounds = new Core.DesktopsSizes.Bounding(containerWidth, containerHeight, desktopWidth, desktopHeight).getBounds();

    	/*if (largeDesktopWidth > 0 && largeDesktopHeight > 0) {
    		bounds.push({
    			width: `${ largeDesktopWidth }px`,
    			height: `${ largeDesktopHeight }px`,
    			left: `${ containerWidth }px`,
    			top: "0px"
    		});
    	}*/

    	return bounds;
    }

    /**
     * [render description]
     */
	render() {
		let desktops = [],
			desktopsSizes = this.getDesktopsBounds();
		/*console.log(desktopsSizes, this.state.desktopsInScreen);*/
		/*for ( let i = 0; i < desktopsSizes.length; i++ ) {
			desktops.push(<div key={ `desktop_${ i }` } style={ desktopsSizes[i] }></div>);	        
		}*/

	    return (
			<div>	
				{ desktops }
			</div>
	    );
  	}
}
import React from "react";

import { Core } from "../../../../core";
import { DesktopComponent } from "./DesktopComponent.jsx";

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

    	this.lastPanelLayoutSize = this.getPanelLayoutSize();
        this.setLargeDesktopBound = false;
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
        Core.Events.CustomEvents.onDesktopsSelectedMerge( window, this.handleDesktopsSelectedMerge.bind( this ) );
        window.addEventListener( "resize", this.handleResize.bind( this ) );
    }

    /**
     * [componentWillUnmount description]
     */
    componentWillUnmount() {
        Core.Events.CustomEvents.offDesktopsInScreenChange( window, this.handleDesktopsInScreenChange.bind( this ) );
        Core.Events.CustomEvents.offDesktopsBoundingFinish( window, this.handleDesktopsBoundingFinish.bind( this ) );
        Core.Events.CustomEvents.offDesktopsSelectedMerge( window, this.handleDesktopsSelectedMerge.bind( this ) );
        window.removeEventListener( "resize", this.handleResize.bind( this ) );
    } 

    /**
     * [handleDesktopsInScreenChange description]
     * @param  {Object} event [description]
     */
    handleDesktopsInScreenChange(event) { 
    	this.setLargeDesktopBound = false;
        
        if ( !Core.VARS.layoutCustom ) {
        	this.setDesktopsBounds( Core.VARS.desktopsInScreen );
        } else {
        	this.setState({
    			desktopsInScreen: Core.VARS.desktopsInScreen,
	            desktopsSizes: Core.VARS.desktopsSizes
	    	});

	    	Core.VARS.layoutCustom = false;
        }               
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
     * [handleDesktopsSelectedMerge description]
     * @param  {Object} event [description]
     */
    handleDesktopsSelectedMerge(event) { 
    	console.log(Core.VARS.desktopsSelected); 		
  		let desktopSelected_1 = {},
  			desktopSelected_2 = {},
  			objectPosition = 0,
  			newDesktopSize = {},  			
  			newDesktopsSizes = [];

  		for ( let i in Core.VARS.desktopsSelected ) {
  			if ( objectPosition === 0 ) {
  				desktopSelected_1 = Core.VARS.desktopsSelected[i];
  			} else {
  				desktopSelected_2 = Core.VARS.desktopsSelected[i];
  			}  			

  			objectPosition++;
  		} 

  		if ( parseFloat( desktopSelected_1.left ) <= parseFloat( desktopSelected_2.left ) ) {
  			newDesktopSize.left = desktopSelected_1.left;
  			newDesktopSize.width = `${ parseFloat( desktopSelected_2.left ) + parseFloat( desktopSelected_2.width ) - parseFloat( newDesktopSize.left ) }px`;
  		} else {
  			newDesktopSize.left = desktopSelected_2.left;
  			newDesktopSize.width = `${ parseFloat( desktopSelected_1.left ) + parseFloat( desktopSelected_1.width ) - parseFloat( newDesktopSize.left ) }px`;
  		}

  		if ( parseFloat( desktopSelected_1.top ) <= parseFloat( desktopSelected_2.top ) ) {
  			newDesktopSize.top = desktopSelected_1.top;
  			newDesktopSize.height = `${ parseFloat( desktopSelected_2.top ) + parseFloat( desktopSelected_2.height ) - parseFloat( newDesktopSize.top ) }px`;
  		} else {
  			newDesktopSize.top = desktopSelected_2.top;
  			newDesktopSize.height = `${ parseFloat( desktopSelected_1.top ) + parseFloat( desktopSelected_1.height ) - parseFloat( newDesktopSize.top ) }px`;
  		}  		

  		for ( let i = 0; i < Core.VARS.desktopsSizes.length; i++ ) {
  			if ( Core.VARS.desktopsSizes[i].left === newDesktopSize.left && Core.VARS.desktopsSizes[i].top === newDesktopSize.top ) {
  				newDesktopsSizes.push( newDesktopSize );
  			} else if ( ( parseFloat( Core.VARS.desktopsSizes[i].left ) < parseFloat( newDesktopSize.left ) || 
  						  parseFloat( Core.VARS.desktopsSizes[i].left ) >= parseFloat( newDesktopSize.width ) ) ) {
				newDesktopsSizes.push( Core.VARS.desktopsSizes[i] );
				
  			} else if ( ( parseFloat( Core.VARS.desktopsSizes[i].top ) < parseFloat( newDesktopSize.top ) || 
  						  parseFloat( Core.VARS.desktopsSizes[i].top ) >= parseFloat( newDesktopSize.height ) ) ) {
  				newDesktopsSizes.push( Core.VARS.desktopsSizes[i] );
  			}
  		}

  		console.log(newDesktopsSizes, Core.VARS.desktopsSizes);

  		Core.VARS.desktopsSizes = newDesktopsSizes;
  		Core.VARS.desktopsInScreen = Core.VARS.desktopsSizes.length;
  		Core.VARS.desktopsSelected = {};
  		Core.VARS.layoutCustom = true;

  		Core.Events.CustomEvents.dispatchDesktopsInScreenChange( window ); 		
  	}

    /**
     * [handleResize description]
     * @param  {Object} event [description]
     */
  	handleResize(event) {
  		let panelLayoutSize = this.getPanelLayoutSize(),
  			panelLayoutSizeChangeRatio = {};

		panelLayoutSizeChangeRatio.width = panelLayoutSize.width / this.lastPanelLayoutSize.width;
		panelLayoutSizeChangeRatio.height = panelLayoutSize.height / this.lastPanelLayoutSize.height;

		for ( let i = 0; i < Core.VARS.desktopsSizes.length; i++ ) {
			Core.VARS.desktopsSizes[i] = {
				width: `${ parseFloat( Core.VARS.desktopsSizes[i].width ) * panelLayoutSizeChangeRatio.width }px`,
				height: `${ parseFloat( Core.VARS.desktopsSizes[i].height ) * panelLayoutSizeChangeRatio.height }px`,
				left: `${ parseFloat( Core.VARS.desktopsSizes[i].left ) * panelLayoutSizeChangeRatio.width }px`,
				top: `${ parseFloat( Core.VARS.desktopsSizes[i].top ) * panelLayoutSizeChangeRatio.height }px`
			};
		}

		this.lastPanelLayoutSize = panelLayoutSize;

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

    		largeDesktopBound.width = `${ panelLayoutSize.width - ( parseFloat( desktopsSizes[0].width ) * dimensions[0] ) }px`;
    		largeDesktopBound.height = `${ parseFloat( desktopsSizes[0].height ) * dimensions[1] }px`;
    		largeDesktopBound.left = `${ parseFloat( desktopsSizes[0].width ) * dimensions[0] }px`;
    		largeDesktopBound.top = "0px";
    	} else {
    		largeDesktopBound.width = `${ panelLayoutSize.width - parseFloat( desktopsSizes[0].width ) }px`;
    		largeDesktopBound.height = `${ parseFloat( desktopsSizes[0].height ) * 2 }px`;
    		largeDesktopBound.left = `${ parseFloat( desktopsSizes[0].width ) }px`;
    		largeDesktopBound.top = "0px";
    	}

    	return largeDesktopBound;
    }

    /**
     * [render description]
     */
	render() {
	    return (
			<div>	
				{ this.state.desktopsSizes.map(( desktopSize, i ) => {
          			return (
      					<DesktopComponent 
      						desktop={ i }
      						key={ `desktop_${ i }` } 
      						style={ desktopSize } />
      				);      				
        		}) }
			</div>
	    );
  	}
}
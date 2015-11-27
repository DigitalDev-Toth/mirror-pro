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
    		desktopsInScreen: Core.UI.desktopsInScreen,
            desktopsBoundaries: [],
            desktopsSelection: Core.UI.desktopsSelection,
            desktopsResize: Core.UI.desktopsResize,
            mouseMoveState: false
    	};

    	this.lastPanelLayoutSize = this.getPanelLayoutSize();
        this.setLargeDesktopBound = false;

        this.pointResize = null;
        this.lastPos = null;
        this.lastCoords = null;
        this.desktopsResizables = [];
    }

    /**
  	 * [componentWillMount description]
  	 */
  	componentWillMount() {
        this.handleDesktopsInScreenChange();
        this.handleDesktopsBoundariesFinish();
    }

    /**
     * [componentDidMount description]
     */
    componentDidMount() {
        Core.Events.CustomEvents.onDesktopsInScreenChange( window, this.handleDesktopsInScreenChange.bind( this ) );        
        Core.Events.CustomEvents.onDesktopsBoundariesFinish( window, this.handleDesktopsBoundariesFinish.bind( this ) );
        Core.Events.CustomEvents.onDesktopsSelection( window, this.handleDesktopsSelection.bind( this ) );
        Core.Events.CustomEvents.onDesktopsResize( window, this.handleDesktopsResize.bind( this ) );
        Core.Events.CustomEvents.onDesktopsSelectedMerge( window, this.handleDesktopsSelectedMerge.bind( this ) );
        window.addEventListener( "resize", this.handleWindowResize.bind( this ) );
    }

    /**
     * [componentWillUnmount description]
     */
    componentWillUnmount() {
        Core.Events.CustomEvents.offDesktopsInScreenChange( window, this.handleDesktopsInScreenChange.bind( this ) );
        Core.Events.CustomEvents.offDesktopsBoundariesFinish( window, this.handleDesktopsBoundariesFinish.bind( this ) );
        Core.Events.CustomEvents.offDesktopsSelection( window, this.handleDesktopsSelection.bind( this ) );
        Core.Events.CustomEvents.offDesktopsSelectedMerge( window, this.handleDesktopsSelectedMerge.bind( this ) );
        window.removeEventListener( "resize", this.handleWindowResize.bind( this ) );
    } 

    /**
     * [handleDesktopsInScreenChange description]
     * @param  {Object} event [description]
     */
    handleDesktopsInScreenChange(event) { 
    	this.setLargeDesktopBound = false;
        
        if ( !Core.UI.layoutCustom ) {
        	this.setDesktopsBounds( Core.UI.desktopsInScreen );
        } else {
        	this.setState({
    			desktopsInScreen: Core.UI.desktopsInScreen,
	            desktopsBoundaries: Core.UI.desktopsBoundaries,
                desktopsSelection: Core.UI.desktopsSelection,
                desktopsResize: Core.UI.desktopsResize,
                mouseMoveState: false
	    	});

	    	Core.UI.layoutCustom = false;
        }               
    }

    /**
     * [handleDesktopsBoundingFinish description]
     * @param  {Object} event [description]
     */
    handleDesktopsBoundariesFinish(event) {  
        if ( this.setLargeDesktopBound ) {
            Core.UI.desktopsBoundaries.push( 
            	this.getLargeDesktopBound( Core.UI.desktopsInScreen, Core.UI.desktopsBoundaries ) 
        	);
        } 

        this.setState({
            desktopsInScreen: Core.UI.desktopsInScreen,
            desktopsBoundaries: Core.UI.desktopsBoundaries,
            desktopsSelection: Core.UI.desktopsSelection,
            desktopsResize: Core.UI.desktopsResize,
            mouseMoveState: false
        });
    }

    handleDesktopsSelection(event) {
        this.setState({
            desktopsInScreen: Core.UI.desktopsInScreen,
            desktopsBoundaries: Core.UI.desktopsBoundaries,
            desktopsSelection: Core.UI.desktopsSelection,
            desktopsResize: Core.UI.desktopsResize,
            mouseMoveState: false
        });
    }

    handleDesktopsResize(event) {
        this.setState({
            desktopsInScreen: Core.UI.desktopsInScreen,
            desktopsBoundaries: Core.UI.desktopsBoundaries,
            desktopsSelection: Core.UI.desktopsSelection,
            desktopsResize: Core.UI.desktopsResize,
            mouseMoveState: false
        });
    }

    /**
     * [handleDesktopsSelectedMerge description]
     * @param  {Object} event [description]
     */
    handleDesktopsSelectedMerge(event) { 		
  		let desktopSelected_1 = Core.UI.desktopsSelected[ Object.keys( Core.UI.desktopsSelected )[0] ],
  			desktopSelected_2 = Core.UI.desktopsSelected[ Object.keys( Core.UI.desktopsSelected )[1] ],
  			newDesktopBound = {},  			
  			newDesktopsBoundaries = [];

  		if ( parseFloat( desktopSelected_1.left ) <= parseFloat( desktopSelected_2.left ) ) {
  			newDesktopBound.left = desktopSelected_1.left;
  			newDesktopBound.width = `${ parseFloat( desktopSelected_2.left ) + parseFloat( desktopSelected_2.width ) - parseFloat( newDesktopBound.left ) }px`;
  		} else {
  			newDesktopBound.left = desktopSelected_2.left;
  			newDesktopBound.width = `${ parseFloat( desktopSelected_1.left ) + parseFloat( desktopSelected_1.width ) - parseFloat( newDesktopBound.left ) }px`;
  		}

  		if ( parseFloat( desktopSelected_1.top ) <= parseFloat( desktopSelected_2.top ) ) {
  			newDesktopBound.top = desktopSelected_1.top;
  			newDesktopBound.height = `${ parseFloat( desktopSelected_2.top ) + parseFloat( desktopSelected_2.height ) - parseFloat( newDesktopBound.top ) }px`;
  		} else {
  			newDesktopBound.top = desktopSelected_2.top;
  			newDesktopBound.height = `${ parseFloat( desktopSelected_1.top ) + parseFloat( desktopSelected_1.height ) - parseFloat( newDesktopBound.top ) }px`;
  		}  		

  		for ( let i = 0; i < Core.UI.desktopsBoundaries.length; i++ ) {
  			if ( Core.UI.desktopsBoundaries[i].left === newDesktopBound.left && Core.UI.desktopsBoundaries[i].top === newDesktopBound.top ) {
  				newDesktopsBoundaries.push( newDesktopBound );
  			} else if ( !Core.Utils.isInsideOfBox( newDesktopBound, Core.UI.desktopsBoundaries[i]) ) {
                newDesktopsBoundaries.push( Core.UI.desktopsBoundaries[i] );
            }
  		}

  		Core.UI.desktopsBoundaries = newDesktopsBoundaries;
  		Core.UI.desktopsInScreen = Core.UI.desktopsBoundaries.length;
  		Core.UI.desktopsSelected = [];
  		Core.UI.layoutCustom = true;

  		Core.Events.CustomEvents.dispatchDesktopsInScreenChange( window ); 		
  	}

    /**
     * [handleResize description]
     * @param  {Object} event [description]
     */
  	handleWindowResize(event) {
  		let panelLayoutSize = this.getPanelLayoutSize(),
  			panelLayoutSizeChangeRatio = {};

		panelLayoutSizeChangeRatio.width = panelLayoutSize.width / this.lastPanelLayoutSize.width;
		panelLayoutSizeChangeRatio.height = panelLayoutSize.height / this.lastPanelLayoutSize.height;

		for ( let i = 0; i < Core.UI.desktopsBoundaries.length; i++ ) {
            let desktopBound = Core.Utils.boundToFloat( Core.UI.desktopsBoundaries[i] ); 

			Core.UI.desktopsBoundaries[i] = {
				width: `${ desktopBound.width * panelLayoutSizeChangeRatio.width }px`,
				height: `${ desktopBound.height * panelLayoutSizeChangeRatio.height }px`,
				left: `${ desktopBound.left * panelLayoutSizeChangeRatio.width }px`,
				top: `${ desktopBound.top * panelLayoutSizeChangeRatio.height }px`
			};
		}

		this.lastPanelLayoutSize = panelLayoutSize;

		this.setState({
            desktopsInScreen: Core.UI.desktopsInScreen,
            desktopsBoundaries: Core.UI.desktopsBoundaries,
            desktopsSelection: Core.UI.desktopsSelection,
            desktopsResize: Core.UI.desktopsResize,
            mouseMoveState: false
        });
  	}

    /**
     * [handleMouseDown description]
     * @param  {Object} event [description]
     */
    handleMouseDown(event) {
        this.desktopsResizables = [];
        let coords = {
            x: event.clientX - event.target.parentNode.getBoundingClientRect().left,
            y: event.clientY - event.target.parentNode.getBoundingClientRect().top
        };

        for ( let i = 0; i < Core.UI.desktopsBoundaries.length; i++ ) {
            let desktopBound = Core.Utils.boundToFloat( Core.UI.desktopsBoundaries[i] );

            if ( coords.x >= (desktopBound.left - 10) && coords.x <= (desktopBound.left + 10) ) {
                this.pointResize = {
                    x: coords.x,
                    y: coords.y
                }
                this.desktopsResizables.push( Core.UI.desktopsBoundaries[i] ); 
                this.lastPos = {
                    left: parseFloat(Core.UI.desktopsBoundaries[i].left) + parseFloat(Core.UI.desktopsBoundaries[i].width),
                    top: parseFloat(Core.UI.desktopsBoundaries[i].top) + parseFloat(Core.UI.desktopsBoundaries[i].height)
                };
                this.lastCoords = coords;     
            }
        }

        let a = Core.UI.desktopsBoundaries;

        this.setState({
            desktopsInScreen: Core.UI.desktopsInScreen,
            desktopsBoundaries: Core.UI.desktopsBoundaries,
            desktopsSelection: Core.UI.desktopsSelection,
            desktopsResize: Core.UI.desktopsResize,
            mouseMoveState: true
        });
    }

    handleMouseMove(event) {
        if ( this.pointResize !== null ) {
            let coords = {
                x: event.clientX - event.target.parentNode.getBoundingClientRect().left,
                y: event.clientY - event.target.parentNode.getBoundingClientRect().top
            };
            let change = null;

            for ( let i = 0; i < this.desktopsResizables.length; i++ ) {
                for ( let j = 0; j < Core.UI.desktopsBoundaries.length; j++ ) {
                    if ( this.desktopsResizables[i].left === Core.UI.desktopsBoundaries[j].left ) {                        
                        Core.UI.desktopsBoundaries[j] = {
                            width: `${ this.lastPos.left - coords.x }px`,
                            height: Core.UI.desktopsBoundaries[j].height,
                            left: `${ coords.x }px`,
                            top: Core.UI.desktopsBoundaries[j].top
                        }
                        change = Core.UI.desktopsBoundaries[j];
                    }
                    let pos = parseFloat(Core.UI.desktopsBoundaries[j].left) + parseFloat(Core.UI.desktopsBoundaries[j].width)
                        
                    if ( parseFloat(this.desktopsResizables[i].left) === pos )  {
                        Core.UI.desktopsBoundaries[j] = {
                            width: `${ coords.x - parseFloat(Core.UI.desktopsBoundaries[j].left) }px`,
                            height: Core.UI.desktopsBoundaries[j].height,
                            left: Core.UI.desktopsBoundaries[j].left,
                            top: Core.UI.desktopsBoundaries[j].top
                        }
                    }
                }
                this.desktopsResizables[i] = change;
            }
            this.lastCoords = coords;
        }

        this.setState({
            desktopsInScreen: Core.UI.desktopsInScreen,
            desktopsBoundaries: Core.UI.desktopsBoundaries,
            desktopsSelection: Core.UI.desktopsSelection,
            desktopsResize: Core.UI.desktopsResize,
            mouseMoveState: true
        });
    }

    handleMouseUp(event) {
        this.desktopsResizables = [];

        this.setState({
            desktopsInScreen: Core.UI.desktopsInScreen,
            desktopsBoundaries: Core.UI.desktopsBoundaries,
            desktopsSelection: Core.UI.desktopsSelection,
            desktopsResize: Core.UI.desktopsResize,
            mouseMoveState: false
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
  
    	new Core.DesktopsBoundaries.Bounding(containerSize, desktopSize, desktopsInContainer).initBounds();
    }

    getLargeDesktopBound(desktopsInScreen, desktopsBoundaries) {
    	let panelLayoutSize = this.getPanelLayoutSize(),
    		largeDesktopBound = {};

    	if ( desktopsInScreen > 3 ) {
    		let dimensions = Core.Utils.getTheCoupleOfFactorsWidthLowerDiff( desktopsInScreen - 1 );

    		largeDesktopBound.width = `${ panelLayoutSize.width - ( parseFloat( desktopsBoundaries[0].width ) * dimensions[0] ) }px`;
    		largeDesktopBound.height = `${ parseFloat( desktopsBoundaries[0].height ) * dimensions[1] }px`;
    		largeDesktopBound.left = `${ parseFloat( desktopsBoundaries[0].width ) * dimensions[0] }px`;
    		largeDesktopBound.top = "0px";
    	} else {
    		largeDesktopBound.width = `${ panelLayoutSize.width - parseFloat( desktopsBoundaries[0].width ) }px`;
    		largeDesktopBound.height = `${ parseFloat( desktopsBoundaries[0].height ) * 2 }px`;
    		largeDesktopBound.left = `${ parseFloat( desktopsBoundaries[0].width ) }px`;
    		largeDesktopBound.top = "0px";
    	}

    	return largeDesktopBound;
    }

    /**
     * [render description]
     */
	render() {
	    return (
			<div 
                onMouseDown={ this.state.desktopsResize ? this.handleMouseDown.bind( this ) : null }
                onMouseMove={ this.state.mouseMoveState ? this.handleMouseMove.bind( this ) : null }
                onMouseUp={ this.state.desktopsResize ? this.handleMouseUp.bind( this ) : null }>	
				{ this.state.desktopsBoundaries.map(( desktopBound, i ) => {
          			return (
      					<DesktopComponent 
                            desktopSelection={ this.state.desktopsSelection }
      						index={ i }
      						key={ `desktop_${ i }` } 
      						style={ desktopBound } />
      				);      				
        		}) }
			</div>
	    );
  	}
}
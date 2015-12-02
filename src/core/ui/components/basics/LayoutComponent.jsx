import React from "react";

import { Core } from "../../../../core";
import { DeskComponent } from "./DeskComponent.jsx";

/**
 * 
 */
export class LayoutComponent extends React.Component {

	/**
	 * [constructor description]
	 */
	constructor() {
        super();

        this._state = {
        	desksInScreen: Core.UI.desksInScreen,
            desksBoundaries: Core.UI.desksBoundaries,
            layoutTools: Core.UI.layoutTools,
            mouseMoveState: false
        };        

        this.containerMinSize = false;
        this.deskToSmall = false;

    	this.lastPanelLayoutSize = this.getPanelLayoutSize();
        this.setLargeDeskBound = false;

        this.desksBoundariesPile = [];
        this.index = 0;

        this.desksToResize = false;

        this.state = this._state;
    }

    /**
  	 * [componentWillMount description]
  	 */
  	componentWillMount() {
        this.handleLayoutChange();
        this.handleLayoutBoundariesFinish();
    }

    /**
     * [componentDidMount description]
     */
    componentDidMount() {
        Core.Events.CustomEvents.onLayoutChange( window, this.handleLayoutChange.bind( this ) );        
        Core.Events.CustomEvents.onLayoutBoundariesFinish( window, this.handleLayoutBoundariesFinish.bind( this ) );
        Core.Events.CustomEvents.onLayoutGenericEvent( window, this.handleLayoutGenericEvent.bind( this ) );
        window.addEventListener( "resize", this.handleWindowResize.bind( this ) );
    }

    /**
     * [componentWillUnmount description]
     */
    componentWillUnmount() {
        Core.Events.CustomEvents.offLayoutChange( window, this.handleLayoutChange.bind( this ) );
        Core.Events.CustomEvents.offLayoutBoundariesFinish( window, this.handleLayoutBoundariesFinish.bind( this ) );
        Core.Events.CustomEvents.offLayoutGenericEvent( window, this.handleLayoutGenericEvent.bind( this ) );
        window.removeEventListener( "resize", this.handleWindowResize.bind( this ) );
    } 

    /**
     * [handleResize description]
     * @param  {Object} event [description]
     */
    handleWindowResize(event) {
    	Core.UI.desksBoundaries = Core.Layout.LayoutUtils.resizeDesksBoundaries( 
            Core.UI.desksBoundaries,
            this.getPanelLayoutSize(),
            this.lastPanelLayoutSize
        );

        this.lastPanelLayoutSize = this.getPanelLayoutSize();

        this.deskToSmall = Core.Utils.isBoundariesMinSize( Core.UI.desksBoundaries, Core.MIN_DESK_SIZE );

        if ( this.deskToSmall ) {
        	if ( !this.containerMinSize ) {
        		this.containerMinSize = this.getContainerSize();
        	}    		

        	Core.Events.CustomEvents.dispatchContainerGenericEvent( window, { width: this.containerMinSize.width, height: this.containerMinSize.height } );
        } else {
        	this.containerMinSize = false;

	        this._state.desksBoundaries = Core.UI.desksBoundaries;
	        this.setState(this._state);
        }       
    }

    /**
     * [handleLayoutChange description]
     * @param  {Object} event [description]
     */
    handleLayoutChange(event) { 
    	this.setLargeDeskBound = false;
        
        if ( !Core.UI.layoutCustomizing ) {
            this.setLargeDeskBound = Core.Layout.LayoutUtils.setDesksBoundaries( 
                Core.UI.desksInScreen, this.getPanelLayoutSize(),
                event 
            );
        } else {
        	this._state.desksInScreen = Core.UI.desksInScreen;
        	this._state.desksBoundaries = Core.UI.desksBoundaries;
        	this.setState(this._state);

	    	Core.UI.layoutCustomizing = false;
        }               
    }

    /**
     * [handleLayoutBoundingFinish description]
     * @param  {Object} event [description]
     */
    handleLayoutBoundariesFinish(event) {  
        if ( this.setLargeDeskBound ) {
            Core.UI.desksBoundaries = Core.Layout.LayoutUtils.addLargeDeskToDesksBoundaries( 
                Core.UI.desksInScreen, 
                Core.UI.desksBoundaries, 
                this.getPanelLayoutSize() 
            );
        } 

        Core.UI.desksInScreen = Core.UI.desksBoundaries.length;
        this._state.desksBoundaries = Core.UI.desksBoundaries;
        this.setState(this._state);
    }

    /**
     * [handleLayoutGenericEvent description]
     * @param  {Object} event [description]
     */
    handleLayoutGenericEvent(event) {
        switch( event.options.tool ) {
            case "selectable":
                this.handleLayoutSelectable();
                break;

            case "merge":
                this.handleDesksSelectedMerge();
                break;

            case "undone":
            	this.handleDesksHistorial(-1);
            	break;

        	case "redone":
        		this.handleDesksHistorial(1);
    			break;

            case "resizable":
                this.handleLayoutResizable();
                break;
        }        
    }

    /**
     * [handleLayoutSelectable description]
     */
    handleLayoutSelectable() {
    	this.desksBoundariesPile = []; 
    	this.desksBoundariesPile.push( Core.UI.desksBoundaries );
  		this.index = this.desksBoundariesPile.length - 1;   

        this._state.layoutTools = Core.UI.layoutTools;
        this.setState(this._state);
    }

    /**
     * [handleDesktopsSelectedMerge description]
     */
    handleDesksSelectedMerge() { 
        let isNewDesksBoundaries = Core.Layout.LayoutUtils.mergeDesksBoundaries(
            Core.UI.desksBoundaries,
            Core.UI.desksSelected
        );		

  		if ( isNewDesksBoundaries ) {
  			Core.UI.desksBoundaries = isNewDesksBoundaries;
	  		Core.UI.desksInScreen = Core.UI.desksBoundaries.length;
	  		Core.UI.desksSelected = [];
	  		Core.UI.layoutCustomizing = true;

	  		if ( this.desksBoundariesPile.length > 0 ) {
	  			this.desksBoundariesPile = Core.Utils.deleteLastPartOfArray( this.desksBoundariesPile, this.index );
	  		}

	  		this.desksBoundariesPile.push( Core.UI.desksBoundaries );
	  		this.index = this.desksBoundariesPile.length - 1;

	  		Core.Events.CustomEvents.dispatchLayoutChange( window ); 		
  		}  		
  	}

  	/**
  	 * [handleDesksHistorial description]
  	 * @param  {Number} operation [description]
  	 */
  	handleDesksHistorial(operation) {
  		if ( this.desksBoundariesPile.length > 0 ) {
  			this.index += operation;

	  		if (this.index < 0) {
	  			this.index = 0;
	  		}

	  		if (this.index >= this.desksBoundariesPile.length ) {
	  			this.index = this.desksBoundariesPile.length - 1;
	  		}

	  		Core.UI.desksBoundaries = this.desksBoundariesPile[this.index];
	  		Core.UI.layoutCustomizing = true;
	  		
	  		Core.Events.CustomEvents.dispatchLayoutChange( window );
  		}
  	}

  	/**
     * [handleLayoutResizable description]
     */
    handleLayoutResizable() {
    	this.desksBoundariesPile = [];
    	this._state.layoutTools = Core.UI.layoutTools;
        this.setState(this._state);
    }

    /**
     * [handleMouseDown description]
     * @param  {Object} event [description]
     */
    handleMouseDown(event) {
        let mouseCoords = {
            left: event.clientX - event.target.parentNode.getBoundingClientRect().left,
            top: event.clientY - event.target.parentNode.getBoundingClientRect().top
        };

        this.desksToResize = Core.Layout.LayoutUtils.desksResizablesDetection(
            mouseCoords, 
            Core.UI.desksBoundaries, 
            this.getPanelLayoutSize()
        );        

        this._state.mouseMoveState = true;
		this.setState(this._state);
    }

    /**
     * [handleMouseMove description]
     * @param  {Object} event [description]
     */
    handleMouseMove(event) {        
        if ( this.desksToResize ) {
            let mouseCoords = {
                left: event.clientX - event.target.parentNode.getBoundingClientRect().left,
                top: event.clientY - event.target.parentNode.getBoundingClientRect().top
            };

            Core.UI.desksBoundaries = Core.Layout.LayoutUtils.getDesksBoundariesResized(
                mouseCoords,
                Core.UI.desksBoundaries,
                this.desksToResize
            );

            this._state.desksBoundaries = Core.UI.desksBoundaries;
            this.setState(this._state);    
        }           
    }

    /**
     * [handleMouseUp description]
     * @param  {Object} event [description]
     */
    handleMouseUp(event) {
        this.desksToResize = false;

        this._state.mouseMoveState = false;
		this.setState(this._state);
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
     * [getContainerSize description]
     * @return {Object} [description]
     */
    getContainerSize() {
    	let containerDOM = document.getElementById( "container" );

    	return {
    		width: parseFloat( containerDOM.style.width ),
    		height: parseFloat( containerDOM.style.height )
    	};
    }

    /**
     * [render description]
     */
	render() {
        let resizable = null, selectable = null;

        if ( this.state.layoutTools ) {
            resizable = this.state.layoutTools["layoutResizable"];
            selectable = this.state.layoutTools["layoutSelectable"];
        }

	    return (
			<div 
                onMouseDown={ resizable ? this.handleMouseDown.bind( this ) : null }
                onMouseMove={ this.state.mouseMoveState ? this.handleMouseMove.bind( this ) : null }
                onMouseUp={ resizable ? this.handleMouseUp.bind( this ) : null }>	
				{ this.state.desksBoundaries.map(( deskBound, i ) => {
          			return (
      					<DeskComponent 
                            toolLayoutSelection={ selectable }
      						index={ i }
      						key={ `desk_${ i }` } 
      						style={ deskBound } />
      				);      				
        		}) }
			</div>
	    );
  	}
}
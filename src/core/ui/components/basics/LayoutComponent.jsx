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

        	Core.Events.CustomEvents.dispatchContainerGenericEvent( 
        		window, { subject: "containerMinSize", size: this.containerMinSize } 
    		);
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
        
        if ( !Core.UI.customizingLayout ) {
            Core.UI.desksBoundariesPile = [];
        	Core.UI.customLayout = false;

            this.setLargeDeskBound = Core.Layout.LayoutUtils.setDesksBoundaries( 
                Core.UI.desksInScreen, 
                this.getPanelLayoutSize(),
                event 
            );            
        } else {
        	Core.UI.desksInScreen = Core.UI.desksBoundaries.length;
        	
        	this._state.desksInScreen = Core.UI.desksInScreen;
        	this._state.desksBoundaries = Core.UI.desksBoundaries;
        	this.setState( this._state );

	    	Core.UI.customizingLayout = false;
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
        this.setState( this._state );
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

            case "custom":            	
            	this.handleCustomLayout( event.options.profileLayout );
            	break;

        	case "cancel":
        		this.handleLayoutCancel();
        		break;

    		case "reset":
        		this.handleLayoutReset( event.options.profileLayout );
        		break;
        }        
    }

    /**
     * [handleLayoutSelectable description]
     */
    handleLayoutSelectable() {
    	if ( Core.UI.desksBoundariesPile.length === 0 ) {
    		Core.UI.desksBoundariesPile.push( Core.UI.desksBoundaries );
  			this.index = Core.UI.desksBoundariesPile.length - 1;
    	}    	   

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
	  		Core.UI.customizingLayout = true;	  		

	  		if ( Core.UI.desksBoundariesPile.length > 0 ) {
	  			Core.UI.desksBoundariesPile = Core.Utils.deleteLastPartOfArray( 
	  				Core.UI.desksBoundariesPile, 
	  				this.index 
  				);
	  		}

  			Core.UI.customLayout = true;
  			Core.UI.desksBoundariesPile.push( Core.UI.desksBoundaries );
  			this.index = Core.UI.desksBoundariesPile.length - 1;	  		

	  		Core.Events.CustomEvents.dispatchLayoutChange( window ); 		
  		} else {
  			Core.Events.CustomEvents.dispatchContainerGenericEvent( 
        		window, 
        		{ 
        			subject: "alert", 
        			title: "Error",
        			message: "Imposible unir esos escritorios" 
        		} 
    		);
  		} 		
  	}

  	/**
  	 * [handleDesksHistorial description]
  	 * @param  {Number} operation [description]
  	 */
  	handleDesksHistorial(operation) {
  		if ( Core.UI.desksBoundariesPile.length > 0 ) {
  			this.index += operation;

	  		if (this.index < 0) {
	  			this.index = 0;
	  		}

	  		if (this.index >= Core.UI.desksBoundariesPile.length ) {
	  			this.index = Core.UI.desksBoundariesPile.length - 1;
	  		}

	  		Core.UI.desksBoundaries = Core.UI.desksBoundariesPile[this.index];
	  		Core.UI.customizingLayout = true;
	  		
	  		Core.Events.CustomEvents.dispatchLayoutChange( window );
  		}
  	}

  	/**
     * [handleLayoutResizable description]
     */
    handleLayoutResizable() {    	
    	this._state.layoutTools = Core.UI.layoutTools;

        this.setState(this._state);
    }

    /**
     * [handleCustomLayout description]
     * @param  {Object} customLayout [description]
     */
    handleCustomLayout(profileLayout) {
    	let desksBoundaries = profileLayout.desksBoundaries,
    		lastPanelLayoutSize = profileLayout.panelLayoutSize;

    	desksBoundaries = Core.Layout.LayoutUtils.resizeDesksBoundaries( 
            desksBoundaries,
            this.getPanelLayoutSize(),
            lastPanelLayoutSize
        );

        let deskToSmall = Core.Utils.isBoundariesMinSize( desksBoundaries, Core.MIN_DESK_SIZE );

        if ( !deskToSmall ) {
        	Core.UI.customizingLayout = true;
        	Core.UI.desksBoundaries = desksBoundaries;

        	Core.Events.CustomEvents.dispatchLayoutChange( window );
        } else {
        	Core.Events.CustomEvents.dispatchContainerGenericEvent( 
        		window, 
        		{ 
        			subject: "alert", 
        			title: "Error",
        			message: "El tamaño de la ventana es muy pequeño para dibujar el layout" 
        		} 
    		);
        }   
    }

    /**
     * [handleLayoutCancel description]
     */
    handleLayoutCancel() {
    	Core.UI.customizingLayout = true;
    	Core.UI.customLayout = false;
    	Core.UI.desksBoundariesPile = [];

    	Core.Events.CustomEvents.dispatchLayoutChange( window );
    }

    /**
     * [handleLayoutReset description]
     * @param  {Object} customLayout [description]
     */
    handleLayoutReset(profileLayout) {
    	Core.UI.customizingLayout = true;
    	Core.UI.customLayout = false;
    	Core.UI.desksBoundariesPile = [];

    	this.handleCustomLayout(profileLayout);
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

            Core.UI.customLayout = true;

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

        if ( Core.UI.customLayout ) {
        	Core.UI.customizingLayout = true;
        	Core.Events.CustomEvents.dispatchLayoutChange( window );
        }        
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
            resizable = this.state.layoutTools.layoutResizable;
            selectable = this.state.layoutTools.layoutSelectable;
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
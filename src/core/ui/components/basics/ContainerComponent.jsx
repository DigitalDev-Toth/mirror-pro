import React from "react";

import { Core } from "../../../../core";
import { DialogComponent } from "./DialogComponent.jsx";
import { PrimaryMenuComponent, SecondaryMenuComponent } from "./MenuComponent.jsx";

/**
 * 
 */
export class ContainerComponent extends React.Component {

	/**
	 * [constructor description]
	 */
	constructor() {
        super();

        this.primaryMenuWidth = 160;

        this._state = {
        	dialog: {
        		type: "",
        		display: false,
        		title: "",
        		message: ""
        	},
        	styles: this.getSizes()
    	};

        this.state = this._state;
    }

  	/**
  	 * [componentWillMount description]
  	 */
  	componentWillMount() {
        this.handleWindowResize();
    }

    /**
     * [componentDidMount description]
     */
    componentDidMount() {
    	Core.Events.CustomEvents.onContainerGenericEvent( window, this.handleContainerGenericEvent.bind( this ) );  
        window.addEventListener( "resize", this.handleWindowResize.bind( this ) );
    }

    /**
     * [componentWillUnmount description]
     */
    componentWillUnmount() {
    	Core.Events.CustomEvents.offContainerGenericEvent( window, this.handleContainerGenericEvent.bind( this ) ); 
        window.removeEventListener( "resize", this.handleWindowResize.bind( this ) );
    }

    /**
     * [handleWindowResize description]
     * @param  {Object} event [description]
     */
  	handleWindowResize(event) {
  		this._state.styles = this.getSizes();

    	this.setState( this._state );
  	}

  	/**
  	 * [handleContainerGenericEvent description]
  	 * @param  {Object} event [description]
  	 */
  	handleContainerGenericEvent(event) {
  		if ( event.options.subject === "containerMinSize" ) {
  			this._state.styles = this.getSizes( event.options.size.width, event.options.size.height );
  		} else if ( event.options.subject === "dialog" ) {
  			this._state.dialog.display = true;
  			this._state.dialog.type = event.options.type;
  			this._state.dialog.title = event.options.title;
  			this._state.dialog.message = event.options.message;
  		}

    	this.setState( this._state );
  	}

  	/**
  	 * [resetDialog description]
  	 */
  	resetDialog() {
  		this._state.dialog.display = false;
  		this._state.dialog.type = "";
  		this._state.dialog.title = "";
  		this._state.dialog.message = "";

  		this.setState( this._state );
  	}

    /**
     * [getSizes description]
     * @return {Object} [description]
     */
    getSizes(globalWidth = window.innerWidth, globalHeight = window.innerHeight ) {
    	return {
        	containerSize: {
        		width: `${ globalWidth }px`,
        		height: `${ globalHeight }px`
        	},
            panelHeaderSize: { height: "20px" },
            panelBodySize: { height: `${ globalHeight - 20 }px` },
            panelPrimaryMenuSize: { 
            	width: `${ this.primaryMenuWidth }px`,
            	height: `${ globalHeight - 23 }px`
            },
            panelNavigatorbarSize: {
            	width: "20px",
            	height: `${ globalHeight - 23 }px`
            },
            panelWorSpaceSize: {
            	width: `${ globalWidth - this.primaryMenuWidth - 26 }px`,
            	height: `${ globalHeight - 23 }px`
            },
            panelSecondaryMenuSize: {
            	width: `${ globalWidth - this.primaryMenuWidth - 26 }px`,
            	height: "35px"
            },
            panelLayoutSize: {
            	width: `${ globalWidth - this.primaryMenuWidth - 26 }px`,
            	height: `${ globalHeight - 58 }px`
            }
        };
    }

    /**
     * [render description]
     */
	render() {
		let Backdrop = "";

		if ( this.state.dialog.display ) {
			Backdrop = <div className="modal-backdrop fade in"></div>
		}

		return ( 
			<div id="container" style={ this.state.styles.containerSize }>
				<div className="container-fluid">
					<div id="panel-header" className="row" 
						style={ this.state.styles.panelHeaderSize }>
						<div className="col-xs-2"></div>
						<div className="col-xs-9 text-right">
							Toth Limitada 2015 &copy; Mirror Profesional [versión 0.0.0-dev]
						</div>
						<div className="col-xs-1"></div>
					</div>
					<div id="panel-body" className="row" 
						style={ this.state.styles.panelBodySize }>
						<div id="panel-primary-menu" className="col-xs-2" 
							style={ this.state.styles.panelPrimaryMenuSize }>
							<PrimaryMenuComponent />
						</div>
						<div id="panel-workspace" className="col-xs-9" 
							style={ this.state.styles.panelWorSpaceSize }>
							<div id="panel-layout" className="row" 
								style={ this.state.styles.panelLayoutSize }></div>
							<div id="panel-secondary-menu" className="row" 
								style={ this.state.styles.panelSecondaryMenuSize }>
								<SecondaryMenuComponent />
							</div>
						</div>
						<div id="panel-navigatorbar" className="col-xs-1" 
							style={ this.state.styles.panelNavigatorbarSize }></div>
					</div>
				</div>
				<DialogComponent display={ this.state.dialog.display }
					title={ this.state.dialog.title }
					resetDialog={ this.resetDialog.bind( this ) }
					type={ this.state.dialog.type }>
					{ this.state.dialog.message }
				</DialogComponent>
				{ Backdrop }
			</div>			
		);
	}
}
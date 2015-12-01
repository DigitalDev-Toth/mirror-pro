import React from "react";

import { Core } from "../../../../core";
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

        this.state = this.getSizes();
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
        window.addEventListener( "resize", this.handleWindowResize.bind( this ) );
    }

    /**
     * [componentWillUnmount description]
     */
    componentWillUnmount() {
        window.removeEventListener( "resize", this.handleWindowResize.bind( this ) );
    }

    /**
     * [handleWindowResize description]
     * @param  {Object} event [description]
     */
  	handleWindowResize(event) {
    	this.setState( this.getSizes() );
  	}

    /**
     * [getSizes description]
     * @return {Object} [description]
     */
    getSizes() {
    	return {
        	containerSize: {
        		width: `${ window.innerWidth }px`,
        		height: `${ window.innerHeight }px`
        	},
            panelHeaderSize: { height: "20px" },
            panelBodySize: { height: `${ window.innerHeight - 20 }px` },
            panelPrimaryMenuSize: { 
            	width: "140px",
            	height: `${ window.innerHeight - 23 }px`
            },
            panelNavigatorbarSize: {
            	width: "20px",
            	height: `${ window.innerHeight - 23 }px`
            },
            panelWorSpaceSize: {
            	width: `${ window.innerWidth - 166 }px`,
            	height: `${ window.innerHeight - 23 }px`
            },
            panelSecondaryMenuSize: {
            	width: `${ window.innerWidth - 166 }px`,
            	height: "35px"
            },
            panelLayoutSize: {
            	width: `${ window.innerWidth - 166 }px`,
            	height: `${ window.innerHeight - 58 }px`
            }
        };
    }

    /**
     * [render description]
     */
	render() {
		return ( 
			<div id="container" style={ this.state.containerSize }>
				<div className="container-fluid">
					<div id="panel-header" className="row" 
						style={ this.state.panelHeaderSize }>
						<div className="col-xs-2"></div>
						<div className="col-xs-9"></div>
						<div className="col-xs-1"></div>
					</div>
					<div id="panel-body" className="row" 
						style={ this.state.panelBodySize }>
						<div id="panel-primary-menu" className="col-xs-2" 
							style={ this.state.panelPrimaryMenuSize }>
							<PrimaryMenuComponent />
						</div>
						<div id="panel-workspace" className="col-xs-9" 
							style={ this.state.panelWorSpaceSize }>
							<div id="panel-layout" className="row" 
								style={ this.state.panelLayoutSize }></div>
							<div id="panel-secondary-menu" className="row" 
								style={ this.state.panelSecondaryMenuSize }>
								<SecondaryMenuComponent />
							</div>
						</div>
						<div id="panel-navigatorbar" className="col-xs-1" 
							style={ this.state.panelNavigatorbarSize }></div>
					</div>
				</div>
			</div>
		);
	}
}
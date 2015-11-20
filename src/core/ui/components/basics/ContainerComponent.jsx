import React from "react";

import { PrimaryMenuStructure, SecondaryMenuStructure } from "./MenuComponent.jsx";

export class ContainerStructure extends React.Component {

	/**
	 * [constructor description]
	 */
	constructor() {
        super();

        this.state = this.getSizes();
    }

    /**
     * [handleResize description]
     * @param  {Object} event [description]
     */
  	handleResize(event) {
    	this.setState( this.getSizes() );
  	}

  	/**
  	 * [componentWillMount description]
  	 */
  	componentWillMount() {
        this.handleResize();
    }

    /**
     * [componentDidMount description]
     */
    componentDidMount() {
        window.addEventListener( "resize", this.handleResize.bind( this ) );
    }

    /**
     * [componentWillUnmount description]
     */
    componentWillUnmount() {
        window.removeEventListener( "resize", this.handleResize.bind( this ) );
    }

    /**
     * [getSizes description]
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
            panelContextsSize: {
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
							<PrimaryMenuStructure 
                                primaryBlocks={ this.props.primaryBlocks } />
						</div>
						<div id="panel-workspace" className="col-xs-9" 
							style={ this.state.panelWorSpaceSize }>
							<div id="panel-contexts" className="row" 
								style={ this.state.panelContextsSize }></div>
							<div id="panel-secondary-menu" className="row" 
								style={ this.state.panelSecondaryMenuSize }>
								<SecondaryMenuStructure 
                                    secondaryBlocks={ this.props.secondaryBlocks } />
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
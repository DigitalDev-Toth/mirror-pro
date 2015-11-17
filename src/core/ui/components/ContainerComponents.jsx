import React from "react";

import { PrimaryMenuStructure, SecondaryMenuStructure } from "./MenuComponents.jsx";

export class ContainerStructure extends React.Component {

	constructor() {
        super();
        this.state = {
        	containerSize: {
        		width: `${ window.innerWidth }px`,
        		height: `${ window.innerHeight }px`
        	},
            panelHeaderSize: { height: "20px" },
            panelBodySize: { height: `${ window.innerHeight - 20 }px` },
            panelPrimaryMenu: { 
            	width: "140px",
            	height: `${ window.innerHeight - 23 }px`
            }
        };
    }

  	handleResize(event) {
    	this.setState({
    		containerSize: {
        		width: `${ window.innerWidth }px`,
        		height: `${ window.innerHeight }px`
        	},
        	panelBodySize: { height: `${ window.innerHeight - 20 }px` },
        	panelPrimaryMenu: { 
            	width: "140px",
            	height: `${ window.innerHeight - 23 }px`
            }
    	});
  	}

  	componentWillMount() {
        this.handleResize();
    }
    componentDidMount() {
        window.addEventListener("resize", this.handleResize);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
    }

	render() {
		return ( 
			<div id="container" style={ this.state.containerSize }>
				<div className="container-fluid">
					<div id="panel-header" className="row" style={ this.state.panelHeaderSize }>
						<div className="col-xs-2"></div>
						<div className="col-xs-9"></div>
						<div className="col-xs-1"></div>
					</div>
					<div id="panel-body" className="row" style={ this.state.panelBodySize }>
						<div id="panel-primary-menu" className="col-xs-2" style={ this.state.panelPrimaryMenu }>
							<PrimaryMenuStructure />
						</div>
						<div id="panel-body-main" className="col-xs-9">
							<div id="panel-contexts" className="row"></div>
							<div id="panel-secondary-menu" className="row">
								<SecondaryMenuStructure />
							</div>
						</div>
						<div id="panel-navigatorbar" className="col-xs-1"></div>
					</div>
				</div>
			</div>
		);
	}
}
import React from "react";
import ps from "perfect-scrollbar";

import { PrimaryBlockStructure, SecondaryBlockStructure } from "./BlockComponents.jsx";

export class PrimaryMenuStructure extends React.Component {

	/**
	 * [constructor description]
	 */
	constructor() {
        super();

        this.state = this.getSizes();
        this.perfectScrollbar = ps;
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
        this.perfectScrollbar.initialize( document.getElementById( "primary-menu-container" ) );
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
            menuContainerSize: {
            	width: "140px",
            	height: `${ window.innerHeight - 23 }px`
            },
            menuContainerContentSize: { width: "140px" }
        };
    }

	/**
	 * [render description]
	 */
	render() {
		return ( 
			<div id="primary-menu-container" 
				style={ this.state.menuContainerSize }>
				<div id="primary-menu-content" 
					style={ this.state.menuContainerContentSize }>
					<PrimaryBlockStructure />
				</div>
			</div>
		);
	}
}

export class SecondaryMenuStructure extends React.Component {
	
	/**
	 * [constructor description]
	 */
	constructor() {
        super();

        this.state = this.getSizes();
        this.perfectScrollbar = ps;
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
        this.perfectScrollbar.initialize( document.getElementById( "secondary-menu-container" ) );
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
            menuContainerSize: {
            	width: "100%",
            	height: "35px"
            },
            menuContainerContentSize: { height: "35px" }
        };
    }

	/**
	 * [render description]
	 */
	render() {
		return ( 
			<div id="secondary-menu-container" 
				style={ this.state.menuContainerSize }>
				<div id="secondary-menu-content" 
					style={ this.state.menuContainerContentSize }>
					<SecondaryBlockStructure />
				</div>
			</div>
		);
	}
}
import React from "react";
import ps from "perfect-scrollbar";

import { PrimaryBlockStructure, SecondaryBlockStructure } from "./BlockComponent.jsx";

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
     * [componentDidUpdate description]
     */
    componentDidUpdate() {
        window.removeEventListener( "resize", this.handleResize.bind( this ) );
        
        this.perfectScrollbar.update( document.getElementById( "primary-menu-container" ) );
    }

    /**
     * [getSizes description]
     */
    getSizes() {
    	return {
            menuContainerSize: {
            	width: "140px",
            	height: `${ window.innerHeight - 23 }px`
            }
        };
    }

	/**
	 * [render description]
	 */
	render() {
		return ( 
			<div id="primary-menu-container" 
				style={ this.state.menuContainerSize }>
                <div id="primary-menu-content"></div>
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

        document.getElementsByClassName( "ps-scrollbar-x-rail" )[1].style.top = "0px";
    }

    /**
     * [componentWillUnmount description]
     */
    componentWillUnmount() {
        window.removeEventListener( "resize", this.handleResize.bind( this ) );
    }

    /**
     * [componentDidUpdate description]
     */
    componentDidUpdate() {
        window.removeEventListener( "resize", this.handleResize.bind( this ) );

        this.perfectScrollbar.update( document.getElementById( "secondary-menu-container" ) );
    }

    /**
     * [getSizes description]
     */
    getSizes() {
    	return {
            menuContainerSize: {
            	width: "100%",
            	height: "35px"
            }
        };
    }

	/**
	 * [render description]
	 */
	render() {
		return ( 
			<div id="secondary-menu-container" 
				style={ this.state.menuContainerSize }>
				<div id="secondary-menu-content"></div>
			</div>
		);
	}
}
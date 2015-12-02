import React from "react";
import ps from "perfect-scrollbar";

/**
 * 
 */
export class PrimaryMenuComponent extends React.Component {

	/**
	 * [constructor description]
	 */
	constructor() {
        super();

        this.state = this.getSizes();
        this.perfectScrollbar = ps;
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
        
        this.perfectScrollbar.initialize( document.getElementById( "primary-menu-container" ) ); 
    }

    /**
     * [componentWillUnmount description]
     */
    componentWillUnmount() {
        window.removeEventListener( "resize", this.handleWindowResize.bind( this ) );
    }

    /**
     * [componentDidUpdate description]
     */
    componentDidUpdate() {
        window.removeEventListener( "resize", this.handleWindowResize.bind( this ) );
        
        this.perfectScrollbar.update( document.getElementById( "primary-menu-container" ) );
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
            menuContainerSize: {
            	width: "160px",
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

/**
 * 
 */
export class SecondaryMenuComponent extends React.Component {
	
	/**
	 * [constructor description]
	 */
	constructor() {
        super();

        this.state = this.getSizes();
        this.perfectScrollbar = ps;
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

        this.perfectScrollbar.initialize( document.getElementById( "secondary-menu-container" ) );

        document.getElementsByClassName( "ps-scrollbar-x-rail" )[1].style.top = "0px";
    }

    /**
     * [componentWillUnmount description]
     */
    componentWillUnmount() {
        window.removeEventListener( "resize", this.handleWindowResize.bind( this ) );
    }

    /**
     * [componentDidUpdate description]
     */
    componentDidUpdate() {
        window.removeEventListener( "resize", this.handleWindowResize.bind( this ) );

        this.perfectScrollbar.update( document.getElementById( "secondary-menu-container" ) );
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
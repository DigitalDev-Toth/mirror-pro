import React from "react";
import ps from "perfect-scrollbar";

/**
 * 
 */
export class PrimaryBlockComponent extends React.Component {

	/**
	 * [constructor description]
	 */
	constructor() {
        super();

        this.perfectScrollbar = ps;

        this.displayContent = "block";

        this.state = {
        	style: {
        		display: this.displayContent
    		}
        };
    }

    /**
     * [componentDidMount description]
     */
    componentDidMount() {
		this.perfectScrollbar.update( document.getElementById( "primary-menu-container" ) ); 
    }

    /**
     * [handleClick description]
     */
    handleClick() {
    	if ( this.displayContent === "block" ) {
    		this.displayContent = "none";
    	} else {
    		this.displayContent = "block";
    	}

    	this.setState({
    		style: {
    			display: this.displayContent
			}
    	});
    }

	/**
	 * [render description]
	 */
	render() {
		return ( 							
			<div id={ this.props.id }
				className="primary-block" 
				key={ "primary-block" }>
				<div className="primary-block-title"
					onClick={ this.handleClick.bind( this ) }
					key={ "primary-block-title" }>{ this.props.title }</div>
				<hr />
				<div className="primary-block-content"
					style={ this.state.style }
					key={ "primary-block-content" }>{ this.props.children }</div>
			</div>
		);
	}
}

/**
 * 
 */
export class SecondaryBlockComponent extends React.Component {

	/**
	 * [constructor description]
	 */
	constructor() {
        super();

        this.perfectScrollbar = ps;
    }

    /**
     * [componentDidMount description]
     */
    componentDidMount() {
		this.perfectScrollbar.update( document.getElementById( "secondary-menu-container" ) ); 
    }

	/**
	 * [render description]
	 */
	render() {
		return ( 
			<div id={ this.props.id } key={ "secondary-block" }>
				<div className="secondary-block-content" 
					key={ "secondary-block-content" }>{ this.props.children }</div>
			</div>
		);
	}
}
import React from "react";
import ps from "perfect-scrollbar";

export class PrimaryBlockStructure extends React.Component {

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
		this.perfectScrollbar.update( document.getElementById( "primary-menu-container" ) ); 
    }

	/**
	 * [render description]
	 */
	render() {
		return ( 							
			<div className="primary-block" 
				key={ "primary-block" }>
				<div id={ "primary-block-title" }
					className="primary-block-title" 
					key={ "primary-block-title" }>{ this.props.title }</div>
				<div id={ "primary-block-content" } 
					className="primary-block-content" 
					key={ "primary-block-content" }>{ this.props.children }</div>
			</div>
		);
	}
}

export class SecondaryBlockStructure extends React.Component {

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
			<div key={ "secondary-block" }>
				<div id={ "secondary-block-content" } 
					className="secondary-block-content" 
					key={ "secondary-block-content" }>{ this.props.children }</div>
			</div>
		);
	}
}
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
				key={ "primary-block-asd" }>
				<div id={ "primary-block-title-asd" }
					className="primary-block-title" 
					key={ "primary-block-title-asd" }>{ this.props.title }</div>
				<div id={ "primary-block-content-asd" } 
					className="primary-block-content" 
					key={ "primary-block-content-asd" }>{ this.props.children }</div>
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
			<div className="secondary-block" 
				key={ "secondary-block-" }>
				<div id={ "secondary-block-content-" } 
					className="secondary-block-content" 
					key={ "secondary-block-content-" }>{ this.props.children }</div>
			</div>
		);
	}
}
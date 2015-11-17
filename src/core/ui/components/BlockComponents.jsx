import React from "react";

export class PrimaryBlockStructure extends React.Component {

	render() {
		return ( 
			<div className="primary-block">
				<div className="primary-block-title"></div>
				<div className="primary-block-content"></div>
			</div>
		);
	}
}

export class SecondaryBlockStructure extends React.Component {

	render() {
		return ( 
			<div className="secondary-block">
				<div className="secondary-block-content"></div>
			</div>
		);
	}
}
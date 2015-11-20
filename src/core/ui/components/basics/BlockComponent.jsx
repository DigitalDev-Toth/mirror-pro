import React from "react";

export class PrimaryBlockStructure extends React.Component {

	/**
	 * [render description]
	 */
	render() {
		let primaryBlocks = this.props.primaryBlocks;
	
		return ( 
			<div id="primary-menu-content">				
				{ primaryBlocks.map((primaryBlock, i) => {
					return (
						<div className="primary-block" 
							key={ "primary-block" + i }>
							<div className="primary-block-title" 
								key={ "primary-block-title" + i }>{ primaryBlock.title }</div>
							<div className="primary-block-content" 
								key={ "primary-block-content" + i }>{ primaryBlock.content }</div>
						</div>
					);
				})}	
			</div>
		);
	}
}

export class SecondaryBlockStructure extends React.Component {

	/**
	 * [render description]
	 */
	render() {
		let secondaryBlocks = this.props.secondaryBlocks;

		return ( 
			<div id="secondary-menu-content">
				{ secondaryBlocks.map((secondaryBlock, i) => {
					return (
						<div className="secondary-block" 
							key={ "secondary-block" + i }>
							<div className="secondary-block-content" 
								key={ "secondary-block-content" + i }>{ secondaryBlock.content }</div>
						</div>
					);
				})}
			</div>
		);
	}
}
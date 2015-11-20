import React from "react";

import { PrimaryBlockStructure } from "../basics/BlockComponent.jsx";
import { Button } from "../basics/ButtonComponent.jsx";

export class DesktopTool extends React.Component {

    /**
     * [handleResize description]
     * @param  {Object} event [description]
     */
  	handleMouseDown(event) {
  		console.log(this.props.click);
  	}

	/**
	 * [render description]
	 */
	render() {
		return ( 
			<PrimaryBlockStructure title="Escritorios">
				<div className="text-center">
					<Button handleMouseDown={ this.handleMouseDown.bind( this ) }>1</Button>
					<Button>2</Button>
					<Button>3</Button>
					<Button>4</Button>
					<Button>-</Button>
					<Button>+</Button>
				</div>
			</PrimaryBlockStructure>
		);
	}
}
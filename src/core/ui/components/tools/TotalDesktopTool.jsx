import React from "react";

import { SecondaryBlockComponent } from "../basics/BlockComponent.jsx";

export class TotalDesktopTool extends React.Component {

	/**
	 * [render description]
	 */
	render() {
		return ( 
			<SecondaryBlockComponent>
				<span>Total de escritorios: 3</span>
			</SecondaryBlockComponent>
		);
	}
}
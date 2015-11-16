import React from "react";

import { PrimaryMenuStructure, SecondaryMenuStructure } from "./MenuComponents.jsx";

export class WorkSpaceContainer extends React.Component {

	render() {
		return ( 
			<div id="workspace">
				<WorkSpaceStructure />
			</div>
		);
	}	
}

export class WorkSpaceStructure extends React.Component {

	render() {
		return ( 
			<div className="container-fluid">
				<div id="panel-header" className="row">
					<div className="col-xs-2"></div>
					<div className="col-xs-9"></div>
					<div className="col-xs-1"></div>
				</div>
				<div id="panel-body" className="row">
					<div id="panel-primary-menu" className="col-xs-2">
						<PrimaryMenuStructure />
					</div>
					<div id="panel-body-main" className="col-xs-9">
						<div id="panel-contexts" className="row"></div>
						<div id="panel-secondary-menu" className="row">
							<SecondaryMenuStructure />
						</div>
					</div>
					<div id="panel-navigatorbar" className="col-xs-1"></div>
				</div>
			</div>
		);
	}
}
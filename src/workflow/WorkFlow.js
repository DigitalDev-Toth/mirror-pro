export class WorkFlow {

	constructor() {
		let workspace = new global.MIRROR.UI.WorkSpace();

		workspace.run();

		let menuBody = new global.MIRROR.UI.Menu();

		menuBody.run();

		let menuMain = new global.MIRROR.UI.Menu( "main" );

		menuMain.run();
	}
}
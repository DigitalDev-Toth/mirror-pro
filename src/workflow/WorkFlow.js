export class WorkFlow {

	constructor() {
		let workspace = new global.MIRROR.UI.WorkSpace();

		workspace.run();

		let menuBody = new global.MIRROR.UI.Menu();

		menuBody.run();

		let menuMain = new global.MIRROR.UI.Menu( "main" );

		menuMain.run();

		let blocks_body = [];

		for(let i = 0; i < 50; i++) {
			blocks_body.push( new global.MIRROR.UI.Block( menuBody ) );

			blocks_body[i].run();
		}

		let blocks_main = [];

		for(let i = 0; i < 50; i++) {
			blocks_main.push( new global.MIRROR.UI.Block( menuMain ) );

			blocks_main[i].run();
		}
	}
}
export class WorkFlow {

	constructor() {
		let workspace = new global.MIRROR.UI.WorkSpace();

		workspace.run();

		let menuBody = new global.MIRROR.UI.Menu();

		menuBody.run();

		let menuMain = new global.MIRROR.UI.Menu( "main" );

		menuMain.run();

		let block_body_1 = new global.MIRROR.UI.Block( menuBody );

		block_body_1.run();

		let block_body_2 = new global.MIRROR.UI.Block( menuBody );

		block_body_2.run();

		let block_main_1 = new global.MIRROR.UI.Block( menuMain );

		block_main_1.run();
	}
}
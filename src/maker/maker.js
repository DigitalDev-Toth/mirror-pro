export class Maker {

	constructor() {}

	UI() {
		let primaryBlocks = [];

		for (let i = 0; i < 3; i++) {
			primaryBlocks.push({
				title: "Escritorios",
				content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum iusto architecto veniam odio at tempora aut itaque voluptatibus soluta aperiam recusandae, incidunt ducimus totam vero temporibus maiores pariatur. Maiores, ab."
			});
		}

		let secundaryBlocks = [];

		for (let i = 0; i < 10; i++) {
			secundaryBlocks.push({
				content: `content_${ i } Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum iusto architecto veniam odio at tempora aut itaque voluptatibus soluta aperiam recusandae, incidunt ducimus totam vero temporibus maiores pariatur. Maiores, ab.`,
			});
		}

		new global.MIRROR.UI.Constructor();
	}
}
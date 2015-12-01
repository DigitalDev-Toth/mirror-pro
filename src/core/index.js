import { CONST } from "./const";
import { Utils } from "./utils";
import { Events } from "./events";
import { UI } from "./ui";
import { Layout } from "./layout";

export const Core = Object.assign(CONST, {
	
	Utils,
	Events: { CustomEvents: new Events.Custom() },
	UI,
	Layout
});
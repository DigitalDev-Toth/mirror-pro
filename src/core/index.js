import { CONST } from "./const";
import { VARS } from "./vars";
import { Utils } from "./utils";
import { Events } from "./events";
import { UI } from "./ui";
import { DesktopsSizes } from "./desktopsSizes";

export const Core = Object.assign(CONST, {
	
	VARS,
	Utils,
	Events: { CustomEvents: new Events.Custom() },
	UI,
	DesktopsSizes
});
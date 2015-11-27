import { CONST } from "./const";
import { Utils } from "./utils";
import { Events } from "./events";
import { UI } from "./ui";
import { DesktopsBoundaries } from "./desktopsBoundaries";

export const Core = Object.assign(CONST, {
	
	Utils,
	Events: { CustomEvents: new Events.Custom() },
	UI,
	DesktopsBoundaries
});
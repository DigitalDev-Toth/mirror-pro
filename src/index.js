import { Core } from "./core";
import making from "./maker";

import "!style!css!less!../styles/app.less";
import "!style!css!less!../styles/perfect_scrollbar.css";

global.MIRROR = Core;

making();
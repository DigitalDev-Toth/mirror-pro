import { Core } from "./core";
import { UI } from "./ui";
import { Events } from "./events";

import { WorkFlow } from "./workflow/WorkFlow";

import "../styles/app_style.css";
import "../styles/perfect_scrollbar.css";

Core.UI = UI;
Core.Events = Events;
Core.WorkFlow = WorkFlow;

global.MIRROR = Core;

new global.MIRROR.WorkFlow();
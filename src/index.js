import { Core } from "./core";
import { UI } from "./ui";
import { Event } from "./event";

import { WorkFlow } from "./workflow/WorkFlow";

import "../styles/app_style.css";

Core.UI = UI;
Core.Event = Event;
Core.WorkFlow = WorkFlow;

global.MIRROR = Core;

new global.MIRROR.WorkFlow();
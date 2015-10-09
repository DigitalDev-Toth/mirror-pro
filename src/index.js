import { Core } from "./core";
import { UI } from "./ui";

import { WorkFlow } from "./workflow/WorkFlow";

import "../styles/app_style.css";

Core.UI = UI;
Core.Interaction = Interaction;
Core.WorkFlow = WorkFlow;

global.MIRROR = Core;

new global.MIRROR.WorkFlow();
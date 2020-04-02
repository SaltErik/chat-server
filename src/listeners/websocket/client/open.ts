import WebSocket from "ws";
import { yay } from "../../../utils/yay.js";

function handleClientOpen(this: WebSocket): void {
  yay(`Client opened!`);
}

export { handleClientOpen };

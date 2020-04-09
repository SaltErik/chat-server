import WebSocket from "ws";
import { say } from "../../../utils/say.js";

function handleClientPong(this: WebSocket, data: Buffer): void {
  say(`Client pong recieved!`, data);
}

export { handleClientPong };

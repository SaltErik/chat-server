import WebSocket from "ws";
import { broadcast } from "../../../messages/broadcast.js";
import { acceptUsername, rejectUsername } from "../../../messages/username.js";
import { deserialize } from "../../../utils/deserialize.js";
import { say } from "../../../utils/say.js";
import { serialize } from "../../../utils/serialize.js";
import { isInboxChatMessage, isInboxUsername } from "../../../utils/typePredicates.js";
import { yay } from "../../../utils/yay.js";
import { takenUsernames } from "./metadata/takenUsernames.js";
import { nay } from "../../../utils/nay.js";

function handleClientMessage(this: WebSocket, data: WebSocket.Data): void {
  yay(`Client message recieved!`);
  say(`Data: ${data}`);
  const message = deserialize(data);
  
  if (isInboxUsername(message)) {
    const { username } = message;
    if (takenUsernames.has(username)) {
      nay(`Username ${username} rejected!`);
      return this.send(serialize(rejectUsername));
    }
    yay(`Username ${username} accepted!`);
    takenUsernames.add(username);
    return this.send(serialize(acceptUsername));
  }

  if (isInboxChatMessage(message)) {
    return broadcast(message);
  }
}

export { handleClientMessage };
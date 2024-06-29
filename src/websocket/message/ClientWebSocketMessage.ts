import {
    ClientWebSocketCommandMap,
    ClientWebSocketCommandType,
} from 'websocket/type/WebSocketCommandTypes';
import { WebSocketMessage } from './WebSocketMessage';

export class ClientWebSocketMessage<Command extends ClientWebSocketCommandType>
    implements WebSocketMessage
{
    private command: Command;
    private data: ClientWebSocketCommandMap[Command];

    constructor(command: Command, data: ClientWebSocketCommandMap[Command]) {
        this.command = command;
        this.data = data;
    }

    public getData() {
        return this.data;
    }
    public getCommand() {
        return this.command;
    }
}

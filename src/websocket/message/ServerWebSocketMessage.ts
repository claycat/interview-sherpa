import {
    ServerWebSocketCommand,
    ServerWebSocketCommandMap,
    ServerWebSocketCommandType,
} from 'websocket/type/WebSocketCommandTypes';
import { isServerWebSocketMessage } from 'websocket/type/webSocketTypeGuard';
import { WebSocketMessage } from './WebSocketMessage';

export class ServerWebSocketMessage<Command extends ServerWebSocketCommandType>
    implements WebSocketMessage
{
    private command: Command;
    private data: ServerWebSocketCommandMap[Command];

    constructor(command: Command, data: ServerWebSocketCommandMap[Command]) {
        this.command = command;
        this.data = data;
    }

    public getData() {
        return this.data;
    }
    public getCommand() {
        return this.command;
    }

    public static deserialize<Command extends ServerWebSocketCommandType>(message: string) {
        const parsed = JSON.parse(message);
        if (!ServerWebSocketCommand.includes(parsed.command)) {
            throw new Error('Invalid command type received');
        }

        if (!isServerWebSocketMessage(parsed, parsed.command)) {
            throw new Error('Message is not of type WebSocketMessage');
        }

        return new ServerWebSocketMessage<Command>(parsed.command, parsed.data);
    }
}

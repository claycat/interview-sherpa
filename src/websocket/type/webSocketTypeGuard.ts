import { ServerWebSocketMessage } from 'websocket/message/ServerWebSocketMessage';
import { ServerWebSocketCommandType } from './WebSocketCommandTypes';

export function isServerWebSocketMessage<CommandType extends ServerWebSocketCommandType>(
    obj: any,
    commandType: CommandType,
): obj is ServerWebSocketMessage<CommandType> {
    return (
        obj &&
        typeof obj === 'object' &&
        'command' in obj &&
        obj.command === commandType &&
        'data' in obj
    );
}

import { Client, IMessage, IPublishParams } from '@stomp/stompjs';
import { useCallback, useEffect, useRef, useState } from 'react';
import { clientConnectHandler } from 'websocket/handler/client/clientConnectHandler';
import { WebSocketMessage } from 'websocket/message/WebSocketMessage';

const useFlowWebSocket = (brokerURL: string, onMessage: (message: string) => void) => {
    const [isConnected, setIsConnected] = useState(false);
    const webSocket = useRef<WebSocket | null>(null);

    const client = useRef<Client | null>(null);

    const stableOnMessage = useCallback(onMessage, []);

    useEffect(() => {
        client.current = new Client({
            brokerURL,
            onConnect: () => {
                console.log('STOMP connected');
                setIsConnected(true);
                clientConnectHandler(sendMessage);

                client.current?.subscribe('/topic/flow', (message: IMessage) => {
                    stableOnMessage(message.body);
                });
            },
            onDisconnect: () => {
                console.log('STOMP disconnected');
                setIsConnected(false);
            },
            onStompError: frame => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            },
        });

        client.current.onUnhandledMessage = (message: IMessage) => {
            stableOnMessage(message.body);
        };

        client.current.activate();

        return () => {
            if (client.current) {
                client.current.deactivate();
            }
        };
    }, [brokerURL, stableOnMessage]);

    const sendMessage = useCallback((destination: string, message: WebSocketMessage) => {
        if (client.current && client.current.connected) {
            const payload: IPublishParams = {
                destination: destination,
                body: JSON.stringify(message),
            };
            console.log(payload);

            client.current.publish(payload);
        }
    }, []);

    return { isConnected, sendMessage };
};

export default useFlowWebSocket;

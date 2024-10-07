import { Client, IMessage, IPublishParams } from '@stomp/stompjs';
import { useCallback, useEffect, useRef, useState } from 'react';
import { WebSocketMessage } from 'websocket/message/WebSocketMessage';

interface Subscription {
    topic: string;
    callback: (message: string) => void;
}

const useFlowWebSocket = (brokerURL: string) => {
    const [isConnected, setIsConnected] = useState(false);
    const client = useRef<Client | null>(null);
    const subscriptions = useRef<Subscription[]>([]);

    useEffect(() => {
        client.current = new Client({
            brokerURL,
            reconnectDelay: 5000,
            onConnect: () => {
                console.log('STOMP connected');
                setIsConnected(true);
                subscriptions.current.forEach(sub => {
                    client.current?.subscribe(sub.topic, (message: IMessage) => {
                        sub.callback(message.body);
                    });
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

        client.current.activate();

        return () => {
            client.current?.deactivate();
        };
    }, [brokerURL]);

    const subscribe = useCallback(
        (topic: string, callback: (message: string) => void) => {
            if (isConnected && client.current) {
                const subscription = client.current.subscribe(topic, (message: IMessage) => {
                    callback(message.body);
                });
                subscriptions.current.push({ topic, callback });
                return () => {
                    subscription.unsubscribe();
                    subscriptions.current = subscriptions.current.filter(
                        sub => sub.topic !== topic,
                    );
                };
            } else {
                // If not connected yet, store the subscription to be subscribed on connect
                subscriptions.current.push({ topic, callback });
                return () => {
                    subscriptions.current = subscriptions.current.filter(
                        sub => sub.topic !== topic,
                    );
                };
            }
        },
        [isConnected],
    );

    const sendMessage = useCallback((destination: string, message: WebSocketMessage) => {
        if (client.current && client.current.connected) {
            const payload: IPublishParams = {
                destination: destination,
                body: JSON.stringify(message),
            };
            console.log('Sending payload:', payload);
            client.current.publish(payload);
        } else {
            console.warn('Cannot send message, STOMP client is not connected');
        }
    }, []);

    return { isConnected, subscribe, sendMessage };
};

export default useFlowWebSocket;

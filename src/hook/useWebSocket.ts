import { useCallback, useEffect, useRef, useState } from 'react';
import { clientConnectHandler } from 'websocket/handler/client/clientConnectHandler';
import { WebSocketMessage } from 'websocket/message/WebSocketMessage';

const useWebSocket = (url: string, onMessage: (message: string) => void) => {
    const [isConnected, setIsConnected] = useState(false);
    const webSocket = useRef<WebSocket | null>(null);

    const stableOnMessage = useCallback(onMessage, []);

    useEffect(() => {
        webSocket.current = new WebSocket(url);

        webSocket.current.onopen = () => {
            console.log('WebSocket connected');
            setIsConnected(true);
            clientConnectHandler(sendMessage);
        };

        webSocket.current.onmessage = (event: MessageEvent) => {
            const message: string = event.data;
            stableOnMessage(message);
        };

        webSocket.current.onclose = () => {
            console.log('WebSocket disconnected');
            setIsConnected(false);
        };

        return () => {
            if (webSocket.current) {
                webSocket.current.close();
            }
        };
    }, [url, stableOnMessage]);

    const sendMessage = useCallback((message: WebSocketMessage) => {
        if (webSocket.current && webSocket.current.readyState === WebSocket.OPEN) {
            webSocket.current.send(JSON.stringify(message));
        }
    }, []);

    return { isConnected, sendMessage };
};

export default useWebSocket;

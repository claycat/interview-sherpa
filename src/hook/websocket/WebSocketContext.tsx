import useFlowWebSocket from 'hook/useFlowWebSocket';
import React, { createContext, useContext } from 'react';
import { WebSocketMessage } from 'websocket/message/WebSocketMessage';

export type SendMessageType = (destination: string, message: WebSocketMessage) => void;

interface WebSocketContextProps {
    isConnected: boolean;
    subscribe: (topic: string, callback: (message: string) => void) => () => void;
    sendMessage: SendMessageType;
}

const WebSocketContext = createContext<WebSocketContextProps | undefined>(undefined);

interface WebSocketProviderProps {
    brokerURL: string;
    children: React.ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ brokerURL, children }) => {
    const { isConnected, subscribe, sendMessage } = useFlowWebSocket(brokerURL);

    return (
        <WebSocketContext.Provider value={{ isConnected, subscribe, sendMessage }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = (): WebSocketContextProps => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    }
    return context;
};

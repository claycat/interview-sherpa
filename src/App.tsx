import OAuthCallback from 'component/login/OAuthCallback';
import { WebSocketProvider } from 'hook/websocket/WebSocketContext';
import MainPage from 'pages/main/MainPage';
import GoogleRedirectPage from 'pages/redirect/oauth/GoogleRedirectPage';
import InitialTopicPage from 'pages/topic/InitialTopicPage';
import TopicPage from 'pages/topic/TopicPage';
import WelcomePage from 'pages/welcome/WelcomePage';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ReactFlowProvider } from 'reactflow';
import { useAuthStore } from 'state/authStore';
import './App.css';

function App() {
    const fetchSession = useAuthStore(state => state.fetchSession);

    useEffect(() => {
        fetchSession();
    }, [fetchSession]);

    return (
        <Routes>
            <Route path="/" element={<WelcomePage />} />;
            <Route path="/oauth/callback" element={<OAuthCallback />} />
            <Route
                path="/topic"
                element={
                    <ReactFlowProvider>
                        <InitialTopicPage />
                    </ReactFlowProvider>
                }
            ></Route>
            <Route
                path="/topic/:topic_id"
                element={
                    <WebSocketProvider brokerURL="ws://localhost:8888/api/ws">
                        <ReactFlowProvider>
                            <TopicPage />
                        </ReactFlowProvider>
                    </WebSocketProvider>
                }
            />
            ;
            <Route path="/oauth/redirected/google" element={<GoogleRedirectPage />} />;
            <Route path="/main" element={<MainPage />} />;
        </Routes>
    );
}

export default App;

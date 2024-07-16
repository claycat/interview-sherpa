import MainPage from 'pages/main/MainPage';
import GoogleRedirectPage from 'pages/redirect/oauth/GoogleRedirectPage';
import TopicPage from 'pages/topic/TopicPage';
import WelcomePage from 'pages/welcome/WelcomePage';
import { Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
    return (
        <Routes>
            <Route path="/" element={<WelcomePage />} />;
            <Route path="/topic/:topic_id" element={<TopicPage />} />;
            <Route path="/oauth/redirected/google" element={<GoogleRedirectPage />} />;
            <Route path="/main" element={<MainPage />} />;
        </Routes>
    );
}

export default App;

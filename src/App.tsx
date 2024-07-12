import WelcomePage from 'pages/welcome/WelcomePage';
import TopicPage from 'pages/topic/TopicPage';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from 'pages/main/MainPage';

function App() {
    return (
        <Routes>
            <Route path="/" element={<WelcomePage />} />;
            <Route path="/topic/:topic_id" element={<TopicPage />} />;
            <Route path="/main" element={<MainPage />} />;
        </Routes>
    );
}

export default App;

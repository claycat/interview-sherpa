import MainPage from 'pages/main/MainPage';
import TopicPage from 'pages/topic/TopicPage';
import { Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />;
            <Route path="/topic/:topic_id" element={<TopicPage />} />;
        </Routes>
    );
}

export default App;

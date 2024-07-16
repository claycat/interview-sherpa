import axios from 'axios';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const GoogleRedirectPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleOAuthGoogle = async (code: string) => {
        try {
            console.log('CODE: ' + code);
            const response = await axios.get(
                `http://localhost:8080/oauth/login/google?code=${code}`,
            );
            const data = response.data;
            alert('로그인 성공: ' + data);
            navigate('/success');
        } catch (error) {
            navigate('/fail');
        }
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get('code');
        if (code) {
            handleOAuthGoogle(code);
        }
    }, [location]);

    return (
        <>
            <div>Processing...</div>
        </>
    );
};

export default GoogleRedirectPage;

import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const GoogleRedirectPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleOAuthGoogle = async (code: string) => {
        try {
            console.log('CODE: ' + code);

            window.location.href = `http://localhost:8888/oauth/login/google?code=${code}`;

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

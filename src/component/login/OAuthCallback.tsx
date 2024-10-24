import React, { useEffect } from 'react';
import { useAuthStore } from 'state/authStore';

const OAuthCallback: React.FC = () => {
    const fetchSession = useAuthStore(state => state.fetchSession);

    useEffect(() => {
        const fetchSessionData = async () => {
            await fetchSession();
            if (window.opener) {
                window.opener.postMessage('oauth_success', window.location.origin);
            }
            window.close();
        };

        fetchSessionData();
    }, [fetchSession]);

    return (
        <div>
            <h2>Loading...</h2>
        </div>
    );
};

export default OAuthCallback;

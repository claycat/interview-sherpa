import { ReactFlowInstance } from 'reactflow';
import { authStore } from '../../state/authStore';
type HandleOAuthGoogle = (onClose: () => void, reactFlow: ReactFlowInstance) => void;

export const handleOAuthGoogle: HandleOAuthGoogle = (onClose, reactFlow) => {
    const popupWidth = 500;
    const popupHeight = 600;
    const left = window.screen.width / 2 - popupWidth / 2;
    const top = window.screen.height / 2 - popupHeight / 2;

    const apiURL = process.env.REACT_APP_API_URL;

    const oauthWindow = window.open(
        `${apiURL}/api/oauth2/authorization/google`,
        'GoogleOAuth',
        `width=${popupWidth},height=${popupHeight},top=${top},left=${left}`,
    );

    if (!oauthWindow) {
        console.error('Popup blocked or failed to open.');
        return;
    }

    const handleMessage = async (event: MessageEvent) => {
        if (event.origin !== window.location.origin) {
            return;
        }

        if (event.data === 'oauth_success') {
            await authStore.getState().fetchSession();
            oauthWindow.close();
            onClose();
            window.removeEventListener('message', handleMessage);

            window.location.href = `/topic`;
        }
    };

    window.addEventListener('message', handleMessage);
};

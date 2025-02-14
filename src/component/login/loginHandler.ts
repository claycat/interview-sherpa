import apiClient from 'common/axios/axios';
import { ReactFlowInstance } from 'reactflow';
import { titleStore } from 'state/titleStore';
import { flowToJson } from 'util/flowToJson';
import { authStore } from '../../state/authStore';
type HandleOAuthGoogle = (onClose: () => void, reactFlow: ReactFlowInstance) => void;

const getFlowIdFromPath = (): string | null => {
    const pathSegments = window.location.pathname.split('/');
    const topicIndex = pathSegments.findIndex(segment => segment === 'topic');
    if (topicIndex !== -1 && pathSegments.length > topicIndex + 1) {
        return pathSegments[topicIndex + 1];
    }
    return null;
};

export const handleOAuthGoogle: HandleOAuthGoogle = (onClose, reactFlow) => {
    const popupWidth = 500;
    const popupHeight = 600;
    const left = window.screen.width / 2 - popupWidth / 2;
    const top = window.screen.height / 2 - popupHeight / 2;

    const apiURL = process.env.REACT_APP_API_BASE_URL;

    const oauthWindow = window.open(
        `${apiURL}/oauth2/authorization/google`,
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
            const { user } = await authStore.getState().fetchSession();
            const title = titleStore.getState().title;
            const token = new URLSearchParams(window.location.search).get('token');
            const flowId = getFlowIdFromPath();
            let redirectPath = '/topic';

            try {
                if (flowId) {
                    // user logged in but session was expired, so update flow based on current status
                    // await apiClient.patch(`/flows/${flowId}`, {
                    //     memberId: user?.id,
                    //     flowContent: flowToJson(reactFlow),
                    //     title,
                    // });
                    redirectPath = `/topic/${flowId}`;
                } else {
                    const response = await apiClient.post('/flows', {
                        memberId: user?.id,
                        flowContent: flowToJson(reactFlow),
                        title,
                    });
                    const flowId = response.data.data.flowId;
                    redirectPath = `/topic/${flowId}`;
                }

                if (token !== null) {
                    redirectPath += `?token=${token}`;
                }
                window.location.href = redirectPath;
            } catch (e: any) {
                console.error(e);
            } finally {
                oauthWindow.close();
                onClose();
            }
        }
    };

    window.addEventListener('message', handleMessage, { once: true });
};

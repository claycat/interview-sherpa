import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SaveIcon from '@mui/icons-material/Save';
import ShareIcon from '@mui/icons-material/Share';
import { useEffect, useState } from 'react';
import { useAuthStore } from 'state/authStore';
import SavedIcon from '../../assets/icons/Saved.svg';
import UnsavedIcon from '../../assets/icons/Unsaved.svg';

import { StompHeaders } from '@stomp/stompjs';
import SaveModal from 'component/modal/SaveModal';
import ShareModal from 'component/modal/ShareModal';
import { roleMap } from 'constant/roles';
import { SendMessageType } from 'hook/websocket/WebSocketContext';
import moment from 'moment';
import { useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useReactFlow } from 'reactflow';
import { useTitleStore } from 'state/titleStore';
import { flowToJson } from 'util/flowToJson';
import { DashboardDropdown } from './dropdown/DashboardDropdown';
import { ProfileDropdown } from './dropdown/ProfileDropdown';
import { RoleIconComponent } from './role/RoleIconComponent';
import {
    HeaderTitleInput,
    HeaderTitleSection,
    InquiryIconWrapper,
    LeftSection,
    RightSection,
    SaveIconWrapper,
    ShareIconWrapper,
    StyledAppBar,
    StyledToolbar,
} from './TopicPageHeaderStyle';

const TopicPageHeader = ({ sendMessage }: { sendMessage?: SendMessageType }) => {
    const { isAuthenticated, user, role } = useAuthStore();
    const { topic_id } = useParams();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const { title, setTitle, saveTitleToServer } = useTitleStore();
    const rf = useReactFlow();
    const notify = () =>
        toast.error('Insufficient permission', {
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: false,
        });

    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [lastSuccessTime, setLastSuccessTime] = useState<string | null>(null);
    const editable = roleMap[role].permissions.includes('EDIT_FLOW');

    const handleOpenSaveModal = () => {
        setIsSaveModalOpen(true);
    };
    const handleCloseSaveModal = () => {
        setIsSaveModalOpen(false);
    };

    const handleOpenShareModal = () => {
        if (!roleMap[role].permissions.includes('SHARE_FLOW')) {
            notify();
            return;
        }
        setIsShareModalOpen(true);
    };
    const handleCloseShareModal = () => {
        setIsShareModalOpen(false);
    };

    useEffect(() => {
        if (sendMessage === undefined) return;
        if (!editable) return;

        const intervalId = setInterval(async () => {
            try {
                const token = new URLSearchParams(window.location.search).get('token');
                const headers: StompHeaders = {};

                if (token) {
                    headers.token = token;
                }

                sendMessage(`/app/flow/${topic_id}/patch`, {
                    payload: {
                        flow: flowToJson(rf),
                    },
                    headers,
                });
                setLastSuccessTime(moment().format('h:mm:ss A'));
            } catch (error) {
                console.error('Failed to save title:', error);
            }
        }, 5000);

        return () => clearInterval(intervalId);
    }, [topic_id, saveTitleToServer, sendMessage, role, rf]);

    return (
        <>
            <StyledAppBar position="static">
                <StyledToolbar disableGutters>
                    <LeftSection>
                        <DashboardDropdown />
                        <HeaderTitleSection>
                            {isAuthenticated ? (
                                <img
                                    src={SavedIcon}
                                    alt="Authenticated Icon"
                                    style={{ width: '20px', height: '20px' }}
                                />
                            ) : (
                                <img
                                    src={UnsavedIcon}
                                    alt="Not Authenticated Icon"
                                    style={{ width: '20px', height: '20px' }}
                                />
                            )}

                            <HeaderTitleInput
                                type="text"
                                value={title}
                                disabled={
                                    roleMap[role].permissions.includes('EDIT_FLOW') ? false : true
                                }
                                onChange={e => setTitle(e.target.value)}
                                onBlur={() => saveTitleToServer(topic_id)}
                                placeholder="Untitled"
                            />
                        </HeaderTitleSection>

                        <SaveIconWrapper
                            onClick={() => {
                                if (!isAuthenticated) {
                                    if (!token) handleOpenSaveModal();
                                    else notify();
                                }
                            }}
                        >
                            <SaveIcon style={{ fontSize: '20px' }} />
                            {!editable && <span> Save</span>}
                            {editable && <span>Last Save {lastSuccessTime}</span>}
                        </SaveIconWrapper>
                        <ShareIconWrapper
                            onClick={() => {
                                if (isAuthenticated) {
                                    handleOpenShareModal();
                                } else handleOpenShareModal();
                            }}
                        >
                            <ShareIcon style={{ fontSize: '20px' }} />
                            <span> Share</span>
                        </ShareIconWrapper>
                        <RoleIconComponent />
                    </LeftSection>
                    <RightSection>
                        <InquiryIconWrapper
                            onClick={() => {
                                alert('working on it...');
                            }}
                        >
                            <QuestionMarkIcon style={{ fontSize: '20px' }} />
                            <KeyboardArrowDownIcon style={{ width: '20px' }} />
                        </InquiryIconWrapper>
                        <ProfileDropdown />
                    </RightSection>
                </StyledToolbar>

                <SaveModal open={isSaveModalOpen} onClose={handleCloseSaveModal} />
                <ShareModal open={isShareModalOpen} onClose={handleCloseShareModal} />
            </StyledAppBar>
        </>
    );
};

export default TopicPageHeader;

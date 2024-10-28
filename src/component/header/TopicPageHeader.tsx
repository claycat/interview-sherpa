import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SaveIcon from '@mui/icons-material/Save';
import ShareIcon from '@mui/icons-material/Share';
import { useEffect, useState } from 'react';
import { useAuthStore } from 'state/authStore';
import SavedIcon from '../../assets/icons/Saved.svg';
import UnsavedIcon from '../../assets/icons/Unsaved.svg';

import SaveModal from 'component/modal/SaveModal';
import { SendMessageType } from 'hook/websocket/WebSocketContext';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { useReactFlow } from 'reactflow';
import { useTitleStore } from 'state/titleStore';
import { flowToJson } from 'util/flowToJson';
import { DashboardDropdown } from './dropdown/DashboardDropdown';
import { ProfileDropdown } from './dropdown/ProfileDropdown';
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
    const { isAuthenticated, user } = useAuthStore();
    const { topic_id } = useParams();
    const { title, setTitle, saveTitleToServer } = useTitleStore();
    const rf = useReactFlow();

    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
    const [lastSuccessTime, setLastSuccessTime] = useState<string | null>(null);

    const handleOpenSaveModal = () => {
        setIsSaveModalOpen(true);
    };
    const handleCloseSaveModal = () => {
        setIsSaveModalOpen(false);
    };

    useEffect(() => {
        if (sendMessage === undefined) return;

        const intervalId = setInterval(async () => {
            try {
                sendMessage(`/app/flow/${topic_id}/patch`, { flow: flowToJson(rf) });
                setLastSuccessTime(moment().format('h:mm:ss A'));
            } catch (error) {
                console.error('Failed to save title:', error);
            }
        }, 5000);

        return () => clearInterval(intervalId);
    }, [topic_id, saveTitleToServer]);

    return (
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
                            onChange={e => setTitle(e.target.value)}
                            onBlur={() => saveTitleToServer(topic_id)}
                            placeholder="Untitled"
                        />
                    </HeaderTitleSection>

                    <SaveIconWrapper
                        onClick={() => {
                            if (!isAuthenticated) handleOpenSaveModal();
                        }}
                    >
                        <SaveIcon style={{ fontSize: '20px' }} />
                        {!isAuthenticated && <span> Save</span>}
                        {isAuthenticated && <span>Last Save {lastSuccessTime}</span>}
                    </SaveIconWrapper>
                    <ShareIconWrapper onClick={handleOpenSaveModal}>
                        <ShareIcon style={{ fontSize: '20px' }} />
                        <span> Share</span>
                    </ShareIconWrapper>
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
        </StyledAppBar>
    );
};

export default TopicPageHeader;

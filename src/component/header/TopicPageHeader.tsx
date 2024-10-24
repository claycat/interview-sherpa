import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SaveIcon from '@mui/icons-material/Save';
import ShareIcon from '@mui/icons-material/Share';
import { useState } from 'react';
import { useAuthStore } from 'state/authStore';
import SavedIcon from '../../assets/icons/Saved.svg';
import UnsavedIcon from '../../assets/icons/Unsaved.svg';

import SaveModal from 'component/modal/SaveModal';
import { useParams } from 'react-router-dom';
import { useTitleStore } from 'state/titleStore';
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
    StatusText,
    StyledAppBar,
    StyledToolbar,
} from './TopicPageHeaderStyle';

const TopicPageHeader = () => {
    const { isAuthenticated, user } = useAuthStore();
    const { topic_id } = useParams();
    const { title, setTitle, saveTitleToServer } = useTitleStore();

    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

    const handleOpenSaveModal = () => {
        setIsSaveModalOpen(true);
    };
    const handleCloseSaveModal = () => {
        setIsSaveModalOpen(false);
    };

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
                    <SaveIconWrapper onClick={handleOpenSaveModal}>
                        <SaveIcon style={{ fontSize: '20px' }} />
                        <span> Save</span>
                    </SaveIconWrapper>
                    <ShareIconWrapper onClick={handleOpenSaveModal}>
                        <ShareIcon style={{ fontSize: '20px' }} />
                        <span> Share</span>
                    </ShareIconWrapper>
                    <StatusText isAuthenticated={isAuthenticated}>
                        {isAuthenticated ? 'Logged In' : 'Not Logged In'}
                    </StatusText>
                </LeftSection>
                <RightSection>
                    <InquiryIconWrapper>
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

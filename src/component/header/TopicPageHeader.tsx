import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LoginIcon from '@mui/icons-material/Login';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SaveIcon from '@mui/icons-material/Save';
import ShareIcon from '@mui/icons-material/Share';
import TopicHeaderModal from 'component/modal/TopicHeaderModal';
import useHeaderModal from 'hook/modal/useTopicHeaderModal';
import { useState } from 'react';
import { useAuthStore } from 'state/authStore';
import SavedIcon from '../../assets/icons/Saved.svg';
import UnsavedIcon from '../../assets/icons/Unsaved.svg';
import claycat from '../../assets/image/claycat.jpg';

import {
    DeveloperIcon,
    HeaderTitleInput,
    HeaderTitleSection,
    InquiryIconWrapper,
    LeftSection,
    ProfileImage,
    RightSection,
    SaveIconWrapper,
    ShareIconWrapper,
    SignInIconWrapper,
    StatusText,
    StyledAppBar,
    StyledToolbar,
} from './TopicPageHeaderStyle';

const defaultProfilePictureUrl = 'https://example.com/default-profile-picture.jpg';

const TopicPageHeader = () => {
    const { openModalType, isSaveModalOpen, isShareModalOpen, handleOpenModal, handleCloseModal } =
        useHeaderModal();
    const { isAuthenticated, user } = useAuthStore();
    const [title, setTitle] = useState('');

    const isModalOpen = isSaveModalOpen || isShareModalOpen;

    return (
        <StyledAppBar position="static">
            <StyledToolbar disableGutters>
                <LeftSection>
                    <DeveloperIcon src={claycat} alt="DeveloperIcon" />
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
                            placeholder="Enter header title..."
                        />
                    </HeaderTitleSection>
                    <SaveIconWrapper onClick={() => handleOpenModal('save')}>
                        <SaveIcon style={{ fontSize: '20px' }} />
                        <span> Save</span>
                    </SaveIconWrapper>
                    <ShareIconWrapper onClick={() => handleOpenModal('share')}>
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
                    {isAuthenticated ? (
                        <ProfileImage
                            src={user?.profileURL || defaultProfilePictureUrl}
                            alt={`${user?.name}'s profile`}
                        />
                    ) : (
                        <SignInIconWrapper>
                            <LoginIcon style={{ fontSize: '20px' }} />
                        </SignInIconWrapper>
                    )}
                </RightSection>
            </StyledToolbar>

            <TopicHeaderModal
                open={isModalOpen}
                onClose={handleCloseModal}
                modalType={openModalType}
            />
        </StyledAppBar>
    );
};

export default TopicPageHeader;

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Dropdown, DropdownDivider, DropdownItem, DropdownMenu } from 'semantic-ui-react';
import { useAuthStore } from 'state/authStore';

import styled from '@emotion/styled';
import LoginIcon from '@mui/icons-material/Login';
import SaveModal from 'component/modal/SaveModal';
import { useState } from 'react';
import { ProfileImage, SignInIconWrapper } from '../TopicPageHeaderStyle';

const defaultProfilePictureUrl = 'https://example.com/default-profile-picture.jpg';
const CenteredDropdownContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export const ProfileDropdown = () => {
    const { isAuthenticated, user } = useAuthStore();
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
    const { logout } = useAuthStore();

    const handleOpenModal = () => {
        setIsSaveModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsSaveModalOpen(false);
    };

    return (
        <>
            <SaveModal open={isSaveModalOpen} onClose={handleCloseModal} />
            <CenteredDropdownContainer>
                {isAuthenticated ? (
                    <Dropdown
                        trigger={
                            <>
                                <ProfileImage
                                    src={user?.profileURL || defaultProfilePictureUrl}
                                    alt={`${user?.name}'s profile`}
                                />
                                <KeyboardArrowDownIcon style={{ marginLeft: '-10px' }} />
                            </>
                        }
                        pointing="top right"
                        style={{
                            color: '#707070',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        icon={null}
                    >
                        <DropdownMenu>
                            <DropdownItem text={`${user?.email}`} />
                            <DropdownDivider />
                            <DropdownItem icon="sign out" text="Sign Out" onClick={logout} />
                        </DropdownMenu>
                    </Dropdown>
                ) : (
                    <SignInIconWrapper onClick={() => handleOpenModal()}>
                        <LoginIcon style={{ fontSize: '24px' }} />
                    </SignInIconWrapper>
                )}
            </CenteredDropdownContainer>
        </>
    );
};

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import apiClient from 'common/axios/axios';
import { Role, roleMap } from 'constant/roles';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    Grid,
    Header,
    Icon,
    Modal,
    Popup,
} from 'semantic-ui-react';

const CopyLinkText = styled.span`
    color: #4183c4;
    cursor: pointer;
    text-decoration: underline;
    margin-top: 5px;
    z-index: 1;
`;

interface ShareModalProps {
    open: boolean;
    onClose: () => void;
}

const slideDownAnimation = css`
    @keyframes slideDown {
        0% {
            transform: translateY(-100%);
            opacity: 0;
        }
        100% {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;

const AnimatedModal = styled(Modal)`
    ${slideDownAnimation};
    &.ui.modal {
        animation: slideDown 0.5s ease-out;
    }
`;
const dropdownStyle = css`
    &.ui.dropdown {
        font-size: 0.875em; /* Make the dropdown text smaller */
    }
`;

const ShareModal = ({ open, onClose }: ShareModalProps) => {
    const [accessLevel, setAccessLevel] = useState<Role>('VIEWER');
    const { topic_id } = useParams();
    const [showPopup, setShowPopup] = useState(false);

    const handleAccessChange = (newAccessLevel: Role) => {
        setAccessLevel(newAccessLevel);
    };

    const handleCopyLink = async (role: Role) => {
        const response = await apiClient.get(`/flows/${topic_id}/token?role=${role}`);
        navigator.clipboard.writeText(`${window.location.href}?token=${response.data}`);
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 500);
    };

    return (
        <AnimatedModal
            open={open}
            onClose={onClose}
            size="tiny"
            transition={{
                animation: 'slide down',
                duration: 500,
            }}
        >
            <Header as="h3">Sharing</Header>
            <Modal.Content>
                <Grid verticalAlign="middle">
                    <Grid.Row>
                        <Grid.Column width={12}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Icon name="globe" size="large" />
                                <div style={{ marginLeft: '10px' }}>Anyone with the link</div>
                            </div>
                        </Grid.Column>
                        <Grid.Column width={4} textAlign="right">
                            <Dropdown css={dropdownStyle} text={roleMap[accessLevel].description}>
                                <DropdownMenu>
                                    <Popup
                                        content={roleMap.VIEWER.caption}
                                        trigger={
                                            <DropdownItem
                                                text={roleMap.VIEWER.description}
                                                onClick={() => handleAccessChange('VIEWER')}
                                            />
                                        }
                                    />
                                    <Popup
                                        content={roleMap.COMMENTER.caption}
                                        trigger={
                                            <DropdownItem
                                                text={roleMap.COMMENTER.description}
                                                onClick={() => handleAccessChange('COMMENTER')}
                                            />
                                        }
                                    />
                                    <Popup
                                        content={roleMap.EDITOR.caption}
                                        trigger={
                                            <DropdownItem
                                                text={roleMap.EDITOR.description}
                                                onClick={() => handleAccessChange('EDITOR')}
                                            />
                                        }
                                    />
                                </DropdownMenu>
                            </Dropdown>
                        </Grid.Column>
                    </Grid.Row>
                    <Popup
                        content="Link copied!"
                        open={showPopup}
                        trigger={
                            <CopyLinkText
                                style={{ marginLeft: '38px', marginTop: '-15px' }}
                                onClick={() => handleCopyLink(accessLevel)}
                            >
                                Copy link
                            </CopyLinkText>
                        }
                    />
                </Grid>
                <div style={{ marginTop: '30px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                        <Icon name="user circle" size="large" />
                        <div style={{ marginLeft: '10px' }}>claycaat@gmail.com (owner)</div>
                    </div>
                </div>
            </Modal.Content>
        </AnimatedModal>
    );
};

export default ShareModal;

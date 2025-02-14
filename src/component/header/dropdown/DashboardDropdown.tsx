import styled from '@emotion/styled';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Dropdown, DropdownItem, DropdownMenu } from 'semantic-ui-react';

import DashboardModal from 'component/modal/dashboard/DashboardModal';
import { useState } from 'react';
import { useAuthStore } from 'state/authStore';
import claycat from '../../../assets/image/claycat.jpg';
import { DeveloperIcon } from '../TopicPageHeaderStyle';

const CenteredDropdownContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const TriggerWrapper = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    color: '#707070';
`;

export const DashboardDropdown = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { isAuthenticated } = useAuthStore();

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const trigger = (
        <TriggerWrapper>
            <DeveloperIcon src={claycat} alt="DeveloperIcon" style={{ marginRight: '8px' }} />
        </TriggerWrapper>
    );

    return (
        <CenteredDropdownContainer>
            <DashboardModal open={isModalOpen} onClose={handleCloseModal} />
            <Dropdown
                trigger={trigger}
                pointing="top left"
                style={{
                    color: '#707070',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                icon={<KeyboardArrowDownIcon />}
            >
                <DropdownMenu>
                    <DropdownItem
                        text="New"
                        onClick={() => {
                            window.location.href = `/topic`;
                        }}
                    />
                    {isAuthenticated && <DropdownItem text="Dashboard" onClick={handleOpenModal} />}
                </DropdownMenu>
            </Dropdown>
        </CenteredDropdownContainer>
    );
};

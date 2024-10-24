/** @jsxImportSource @emotion/react */
import { Global } from '@emotion/react';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaCrown, FaUserCircle } from 'react-icons/fa';
import { Icon, Input, Menu, MenuItem, Modal, Popup } from 'semantic-ui-react';
import {
    ButtonsContainer,
    CloseIcon,
    DiagramColumn,
    DiagramListContainer,
    DiagramListItem,
    DiagramListSegment,
    DiagramTableHeader,
    MainContent,
    ModalContent,
    ModalContentWrapper,
    SearchSegment,
    Sidebar,
    UpgradeButton,
    UserEmail,
    UserSection,
    UserStatus,
    dimmerStyle,
} from './DashboardModal.styles';
const DashboardModal = ({ open, onClose }: any) => {
    const handleDelete = (itemName: string) => {
        console.log(`Delete item: ${itemName}`);
        // Placeholder for delete logic (e.g., API call to delete item)
    };

    return (
        <>
            {/* Global style to override the default dimmer styles */}
            <Global styles={dimmerStyle} />

            <Modal
                open={open}
                onClose={() => {}}
                size="large"
                dimmer="dimmed"
                closeOnDimmerClick={false}
            >
                <CloseIcon name="close" size="large" onClick={onClose} />
                <ModalContent>
                    <ModalContentWrapper>
                        {/* Sidebar Section */}
                        <Sidebar>
                            <UserSection>
                                <FaUserCircle
                                    size={50}
                                    style={{ marginBottom: '10px', color: '#777' }}
                                />
                                <UserEmail>claycat@gmail.com</UserEmail>
                                <UserStatus>User</UserStatus>
                            </UserSection>

                            <Menu vertical fluid>
                                <MenuItem onClick={() => console.log('New Diagram clicked')}>
                                    <AiOutlinePlus style={{ marginRight: '8px' }} />
                                    New Diagram
                                </MenuItem>
                                <MenuItem onClick={() => console.log('My Diagrams clicked')}>
                                    My Diagrams
                                </MenuItem>
                                <MenuItem onClick={() => console.log('Shared With Me clicked')}>
                                    Shared With Me
                                </MenuItem>
                            </Menu>
                            {/* Buttons Section */}
                            <ButtonsContainer>
                                <UpgradeButton color="orange" size="small" fluid>
                                    <FaCrown style={{ marginRight: '8px' }} />
                                    Buy me a coffee
                                </UpgradeButton>
                            </ButtonsContainer>
                        </Sidebar>

                        {/* Main Content Section */}
                        <MainContent>
                            {/* Search Bar */}
                            <SearchSegment basic>
                                <Input
                                    icon="search"
                                    placeholder="Search diagrams..."
                                    fluid
                                    style={{ backgroundColor: 'transparent', color: '#333' }}
                                />
                            </SearchSegment>

                            <DiagramListSegment basic>
                                <DiagramTableHeader>
                                    <DiagramColumn>Name</DiagramColumn>
                                    <DiagramColumn>Date Modified</DiagramColumn>
                                    <DiagramColumn>Date Created</DiagramColumn>
                                </DiagramTableHeader>
                                <DiagramListContainer>
                                    {[
                                        {
                                            name: 'Interview Sherpa',
                                            modified: 'Today at 12:38 AM',
                                            created: 'September 7th 2024, 5:18 PM',
                                        },
                                        {
                                            name: 'Tikteever-v2.0',
                                            modified: 'September 8th 2024, 1:07 AM',
                                            created: 'May 15th 2024, 4:24 PM',
                                        },
                                        {
                                            name: 'Untitled Diagram',
                                            modified: 'October 7th 2024, 10:49 PM',
                                            created: 'October 7th 2024, 10:28 PM',
                                        },
                                        {
                                            name: 'Hanwha',
                                            modified: 'September 7th 2024, 5:18 PM',
                                            created: 'September 2nd 2024, 2:03 PM',
                                        },
                                        {
                                            name: 'Tikteer-v1.0',
                                            modified: 'May 15th 2024, 4:24 PM',
                                            created: 'March 6th 2024, 2:46 PM',
                                        },
                                    ].map((diagram, index) => (
                                        <DiagramListItem key={index}>
                                            <DiagramColumn>{diagram.name}</DiagramColumn>
                                            <DiagramColumn>{diagram.modified}</DiagramColumn>
                                            <DiagramColumn>{diagram.created}</DiagramColumn>
                                            <DiagramColumn>
                                                <Popup
                                                    content="Delete this item"
                                                    trigger={
                                                        <Icon
                                                            name="trash alternate outline"
                                                            color="grey"
                                                            onClick={() =>
                                                                handleDelete(diagram.name)
                                                            }
                                                        />
                                                    }
                                                    position="bottom center"
                                                />
                                            </DiagramColumn>
                                        </DiagramListItem>
                                    ))}
                                </DiagramListContainer>
                            </DiagramListSegment>
                        </MainContent>
                    </ModalContentWrapper>
                </ModalContent>
            </Modal>
        </>
    );
};

export default DashboardModal;

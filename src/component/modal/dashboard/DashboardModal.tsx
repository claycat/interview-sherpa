/** @jsxImportSource @emotion/react */
import { Global } from '@emotion/react';
import apiClient from 'common/axios/axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaCrown, FaUserCircle } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { Icon, Input, Menu, MenuItem, Modal, Popup } from 'semantic-ui-react';
import { useAuthStore } from 'state/authStore';
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
import DeleteConfirmationModal from './DeleteConfirmationModal';

export interface DashboardFlowSummary {
    id: string;
    title: string;
    updatedAt: Date;
    createdAt: Date;
}

interface DashboardModalProps {
    open: boolean;
    onClose: () => void;
}

const DashboardModal = ({ open, onClose }: DashboardModalProps) => {
    const [flowSummary, setFlowSummary] = useState<DashboardFlowSummary[]>([]);
    const { topic_id } = useParams();
    const { user } = useAuthStore();
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [diagramToDelete, setDiagramToDelete] = useState<string | null>(null);

    const handleDelete = (id: string) => {
        if (id === topic_id) {
            alert('Cannot delete the current diagram');
            return;
        }
        setDiagramToDelete(id);
        setDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (diagramToDelete) {
            try {
                console.log(`Deleting diagram with id: ${diagramToDelete}`);
                await apiClient.delete(`/flows/${diagramToDelete}`);
                // Example: await apiClient.delete(`/flows/${diagramToDelete}`);
                setFlowSummary(prev => prev.filter(diagram => diagram.id !== diagramToDelete));
            } catch (error) {
                console.error('Failed to delete diagram', error);
            } finally {
                setDeleteModalOpen(false);
                setDiagramToDelete(null);
            }
        }
    };

    const fetchDiagrams = async () => {
        try {
            const response = await apiClient.get(`/members/${user?.id}/flows`);
            console.log(response.data.data.flows);
            setFlowSummary(response.data.data.flows);
        } catch (error) {
            console.error('Failed to fetch diagrams', error);
        }
    };

    useEffect(() => {
        if (open) {
            fetchDiagrams();
        }
    }, [open]);

    return (
        <>
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
                                <MenuItem
                                    onClick={() => {
                                        window.location.href = `/topic`;
                                    }}
                                >
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
                            <ButtonsContainer>
                                <UpgradeButton color="orange" size="small" fluid>
                                    <FaCrown style={{ marginRight: '8px' }} />
                                    Buy me a coffee
                                </UpgradeButton>
                            </ButtonsContainer>
                        </Sidebar>
                        <MainContent>
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
                                    {flowSummary.map(diagram => (
                                        <DiagramListItem
                                            key={diagram.id}
                                            onClick={() => {
                                                window.location.href = `/topic/${diagram.id}`;
                                            }}
                                        >
                                            <DiagramColumn>{diagram.title}</DiagramColumn>
                                            <DiagramColumn>
                                                {moment(diagram.updatedAt).calendar().toString()}
                                            </DiagramColumn>
                                            <DiagramColumn>
                                                {moment(diagram.createdAt).calendar().toString()}
                                            </DiagramColumn>
                                            <DiagramColumn>
                                                <Popup
                                                    content="Delete this item"
                                                    trigger={
                                                        <Icon
                                                            name="trash alternate outline"
                                                            color="grey"
                                                            onClick={() => handleDelete(diagram.id)}
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

            <DeleteConfirmationModal
                open={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={confirmDelete}
            />
        </>
    );
};

export default DashboardModal;

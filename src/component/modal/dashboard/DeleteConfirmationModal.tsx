import { Button, Modal } from 'semantic-ui-react';

interface DeleteConfirmationModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteConfirmationModal = ({ open, onClose, onConfirm }: DeleteConfirmationModalProps) => {
    return (
        <Modal open={open} onClose={onClose} size="small" dimmer="dimmed">
            <Modal.Header>Delete Diagram</Modal.Header>
            <Modal.Content>
                <p>Are you sure you want to delete this diagram? This action cannot be undone.</p>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={onClose}>Cancel</Button>
                <Button color="red" onClick={onConfirm}>
                    Delete
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default DeleteConfirmationModal;

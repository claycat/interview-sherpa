import { useCallback, useState } from 'react';

const useModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalNodeId, setModalNodeId] = useState<string | null>(null);

    const handleShowModal = useCallback((nodeId: string) => {
        setModalNodeId(nodeId);
        setIsModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setModalNodeId(null);
        setIsModalOpen(false);
    }, []);

    return {
        isModalOpen,
        modalNodeId,
        handleShowModal,
        handleCloseModal,
    };
};

export default useModal;

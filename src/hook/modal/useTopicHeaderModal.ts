import { useCallback, useState } from 'react';

export type ModalType = 'save' | 'share' | null;

const useHeaderModal = () => {
    const [openModalType, setOpenModalType] = useState<ModalType>(null);

    const handleOpenModal = useCallback((type: ModalType) => {
        setOpenModalType(type);
    }, []);

    const handleCloseModal = useCallback(() => {
        setOpenModalType(null);
    }, []);

    const isSaveModalOpen = openModalType === 'save';
    const isShareModalOpen = openModalType === 'share';

    return {
        openModalType,
        isSaveModalOpen,
        isShareModalOpen,
        handleOpenModal,
        handleCloseModal,
    };
};

export default useHeaderModal;

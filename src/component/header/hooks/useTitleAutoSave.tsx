import { useCallback, useEffect, useState } from 'react';

const useAutoSave = (
    value: string,
    saveFunction: (value: string) => void,
    delay: number = 1000,
): { handleBlur: () => void } => {
    const [isTyping, setIsTyping] = useState(false);

    const handleSave = useCallback(() => {
        if (value.trim()) {
            saveFunction(value);
        }
    }, [value, saveFunction]);

    // Set typing state to true whenever value changes
    useEffect(() => {
        if (value) {
            setIsTyping(true);
        }
    }, [value]);

    // Set a timer to save data when user stops typing
    useEffect(() => {
        if (isTyping) {
            const timer = setTimeout(() => {
                handleSave();
                setIsTyping(false);
            }, delay);

            return () => clearTimeout(timer);
        }
    }, [isTyping, handleSave, delay]);

    // Function to call on blur event
    const handleBlur = () => {
        handleSave();
    };

    return { handleBlur };
};

export default useAutoSave;

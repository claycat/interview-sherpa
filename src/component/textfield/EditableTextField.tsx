import styled from '@emotion/styled';
import CheckIcon from '@mui/icons-material/Check';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import React, { ChangeEvent, useRef, useState } from 'react';

const StyledTextField = styled(TextField)`
    .MuiInputAdornment-positionEnd {
        position: absolute;
        bottom: 20px;
        right: 8px;
        display: flex;
        gap: 4px;
    }
    .MuiInputBase-input {
        padding-bottom: 30px;
    }
`;

const EditableTextField: React.FC = () => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [text, setText] = useState<string>('안녕하세요.에 대한 질문');
    const textFieldRef = useRef<HTMLInputElement | null>(null);

    const handleEditClick = () => {
        setIsEditing(true);
        setTimeout(() => {
            if (textFieldRef.current) {
                textFieldRef.current.focus();
            }
        }, 100);
    };

    const handleCopyClick = async () => {
        await navigator.clipboard.writeText(text);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
    };

    const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    return (
        <StyledTextField
            inputRef={textFieldRef}
            value={text}
            onChange={handleTextChange}
            disabled={!isEditing}
            fullWidth
            variant="outlined"
            multiline
            sx={{
                paddingRight: '64px',
                color: isEditing ? 'inherit' : 'black',
                '& .MuiInputBase-input.Mui-disabled': {
                    WebkitTextFillColor: 'black',
                },
            }}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handleEditClick}>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={handleSaveClick}>
                            <CheckIcon />
                        </IconButton>
                        <IconButton onClick={handleCopyClick}>
                            <ContentCopyIcon />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default EditableTextField;

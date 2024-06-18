import styled from '@emotion/styled';
import CheckIcon from '@mui/icons-material/Check';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { ChangeEvent, FC, useRef, useState } from 'react';

const StyledTextField = styled(TextField)`
    flex-grow: 1;
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

interface TextFieldProps {
    text: string;
    setText: (text: string) => void;
    handleDelete?: () => void;
}

const EditableTextField: FC<TextFieldProps> = ({ text, setText, handleDelete }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
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
                        <IconButton onClick={handleDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default EditableTextField;

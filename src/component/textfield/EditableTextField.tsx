import styled from '@emotion/styled';
import CheckIcon from '@mui/icons-material/Check';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { ChangeEvent, FC, useRef, useState } from 'react';
import { Node } from 'reactflow';
import { NodeContent } from 'type/NodeContent';

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
        font-size: 0.8rem;
        font-family: 'Open Sans', sans-serif; /* Desired font family */
    }
`;

interface TextFieldProps {
    text: string;
    setText: (text: string) => void;
    handleDelete?: () => void;
    data: Node<NodeContent>;
    onUpdate: (newData: NodeContent) => void;
}

const EditableTextField: FC<TextFieldProps> = ({ text, setText, handleDelete, data, onUpdate }) => {
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
        setText(text);
        onUpdate({ ...data.data, question: text });
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
                        {!isEditing ? (
                            <IconButton onClick={handleEditClick} aria-label="edit" size="small">
                                <EditIcon fontSize="small" />
                            </IconButton>
                        ) : (
                            <IconButton onClick={handleSaveClick} aria-label="save" size="small">
                                <CheckIcon fontSize="small" />
                            </IconButton>
                        )}
                        <IconButton onClick={handleCopyClick} aria-label="copy" size="small">
                            <ContentCopyIcon fontSize="small" />
                        </IconButton>
                        {handleDelete && (
                            <IconButton onClick={handleDelete} aria-label="delete" size="small">
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        )}
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default EditableTextField;

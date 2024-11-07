import { Checkbox } from '@mui/material';
import { Button } from 'semantic-ui-react';
import Gpt from '../../../assets/icons/Gpt.svg';
import { StyledAiRequestButton } from './CommentStyle';
interface SubmitCommentButtonProps {
    handleAddComment: (e: React.FormEvent) => void;
}

export const SubmitCommentButtons = ({ handleAddComment }: SubmitCommentButtonProps) => {
    return (
        <>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                }}
            >
                <StyledAiRequestButton>
                    <img
                        src={Gpt}
                        alt="Gpt Icon"
                        style={{ width: '25px', height: '25px', objectFit: 'fill' }}
                    />
                    <span>Request AI Score</span>
                    <Checkbox
                        sx={{
                            color: '#FFFFFF',
                            '&.Mui-checked': {
                                color: '#FFFFFF',
                            },
                        }}
                    />
                </StyledAiRequestButton>
                <Button
                    onClick={handleAddComment}
                    content="Add Comment"
                    labelPosition="left"
                    icon="edit"
                    primary
                    type="submit"
                />
            </div>
        </>
    );
};

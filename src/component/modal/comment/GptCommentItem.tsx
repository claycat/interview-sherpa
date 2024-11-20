// GptCommentItem.tsx
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import KeyIcon from '@mui/icons-material/Key';
import PollIcon from '@mui/icons-material/Poll';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { Box, Chip } from '@mui/material';
import React from 'react';
import ExpandableSection from '../ExpandableSection';
import { AddCommentFunction } from './CommentSection';
import { AICommentType } from './CommentType';
import CommonCommentContent from './CommonCommentContent';
import ListSection from './ListSection';

interface CommentItemProps {
    comment: AICommentType;
    question: string;
    addComment: AddCommentFunction;
}

const GptCommentItem: React.FC<CommentItemProps> = ({ comment, addComment, question }) => {
    const collapsedContent = (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Chip label="Score" variant="outlined" size="small" icon={<PollIcon />} />
            <Chip
                label={`${comment.score} / 10`}
                variant="outlined"
                size="small"
                sx={{ marginLeft: '5px' }}
            />
        </Box>
    );

    const expandedContent = (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.7rem',
                marginTop: '0.5rem',
            }}
        >
            <div>
                <Chip label="Good" variant="outlined" size="small" icon={<ThumbUpOffAltIcon />} />
                <div style={{ marginTop: '5px' }}>{comment.good}</div>
            </div>

            <div>
                <Chip label="Bad" variant="outlined" size="small" icon={<ThumbDownOffAltIcon />} />
                <div style={{ marginTop: '5px' }}>{comment.bad}</div>
            </div>
            <ListSection label="Expected Keywords" icon={<KeyIcon />} items={comment.expected} />

            <ListSection label="Follow-up" icon={<FollowTheSignsIcon />} items={comment.followup} />
        </Box>
    );

    return (
        <CommonCommentContent
            comment={comment}
            addComment={addComment}
            question={question}
            renderCommentText={() => (
                <ExpandableSection
                    collapsedContent={collapsedContent}
                    expandedContent={expandedContent}
                />
            )}
        />
    );
};

export default GptCommentItem;

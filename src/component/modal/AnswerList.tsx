/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import AddIcon from '@mui/icons-material/Add';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, IconButton } from '@mui/material';
import EditableTextField from 'component/textfield/EditableTextField';
import { FC, useState } from 'react';

interface AnswersListProps {
    answers: string[];
    setAnswers: (answers: string[]) => void;
}

const answerContainerStyle = css`
    display: flex;
    align-items: start;
    gap: 10px;
    width: 100%;
`;

const AnswersList: FC<AnswersListProps> = ({ answers, setAnswers }) => {
    const [answersVisibility, setAnswersVisibility] = useState<boolean[]>(answers.map(() => true));

    const toggleAnswerVisibility = (index: number) => {
        setAnswersVisibility(
            answersVisibility.map((visible, i) => (i === index ? !visible : visible)),
        );
    };

    const handleAddAnswer = () => {
        setAnswers([...answers, '']);
        setAnswersVisibility([...answersVisibility, true]);
    };

    const handleRemoveAnswer = (index: number) => {
        setAnswers(answers.filter((_, i) => i !== index));
        setAnswersVisibility(answersVisibility.filter((_, i) => i !== index));
    };

    const handleAnswerChange = (index: number, newAnswer: string) => {
        const newAnswers = answers.slice();
        newAnswers[index] = newAnswer;
        setAnswers(newAnswers);
    };

    return (
        <>
            {answers.map((answer, index) => (
                <div key={index} css={answerContainerStyle}>
                    <IconButton onClick={() => toggleAnswerVisibility(index)}>
                        {answersVisibility[index] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                    {answersVisibility[index] && (
                        <EditableTextField
                            text={answer}
                            setText={newAnswer => handleAnswerChange(index, newAnswer)}
                            handleDelete={() => handleRemoveAnswer(index)}
                        />
                    )}
                </div>
            ))}
            <Button onClick={handleAddAnswer} startIcon={<AddIcon />}>
                Add Answer
            </Button>
        </>
    );
};

export default AnswersList;

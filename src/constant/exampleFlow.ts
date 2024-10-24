import { ReactFlowJsonObject } from 'reactflow';
import { v4 as uuid } from 'uuid';

const newNodeId = () => `${uuid()}`;
const newEdgeId = () => `${uuid()}`;

export const newExampleFlowObject = (): ReactFlowJsonObject => {
    const firstNodeId = newNodeId();
    const secondNodeId = newNodeId();
    const commentId = newNodeId();

    return {
        nodes: [
            {
                id: firstNodeId,
                type: 'customNode',
                data: {
                    label: 'Node 1',
                    question: 'Javascript',
                    answers: [],
                },
                position: {
                    x: 630,
                    y: -125,
                },
                width: 80,
                height: 40,
                selected: false,
                dragging: false,
                positionAbsolute: {
                    x: 630,
                    y: -125,
                },
            },
            {
                id: secondNodeId,
                type: 'customNode',
                data: {
                    label: 'Node node-2',
                    question: 'What data types are in javascript?',
                    answers: [
                        'Primitive data types for javascript include boolean, null, undefined, number, bigint, string, symbol',
                    ],
                    comments: [
                        {
                            id: newNodeId(),
                            author: 'Lily',
                            avatar: 'https://semantic-ui.com/images/avatar/small/stevie.jpg',
                            content: 'I think JavaScript is versatile! 🤔',
                            datetime: '2 hours ago',
                            replies: [
                                {
                                    id: '0858c11b-9ab0-4ea3-b466-950bcfcc8bce',
                                    author: 'You',
                                    avatar: 'https://semantic-ui.com/images/avatar/small/stevie.jpg',
                                    content: 'asd',
                                    datetime: 'a few seconds ago',
                                },
                            ],
                        },
                    ],
                },
                position: {
                    x: 304,
                    y: -238,
                },
                width: 222,
                height: 42,
                selected: true,
                dragging: false,
                positionAbsolute: {
                    x: 304,
                    y: -238,
                },
                resizing: false,
                style: {
                    width: 222,
                    height: 42,
                },
            },
        ],
        edges: [
            {
                id: newNodeId(),
                source: firstNodeId,
                target: secondNodeId,
                type: 'deletableEdge',
            },
        ],
        viewport: {
            x: -171,
            y: 379,
            zoom: 1,
        },
    };
};

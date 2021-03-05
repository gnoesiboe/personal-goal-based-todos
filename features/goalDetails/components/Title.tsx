import React from 'react';
import { Goal } from '../../../model/goal';
import Heading from '../../../primitives/heading/Heading';
import GoalTitle from '../../../primitives/goalTitle/GoalTitle';

type Props = {
    goal: Goal;
    children: React.ReactNode;
};

const Title: React.FC<Props> = ({ goal, children }) => (
    <Heading tag="h3" flattened>
        <GoalTitle title={goal.title} />
        {children}
    </Heading>
);

export default Title;

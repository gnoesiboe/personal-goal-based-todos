import React from 'react';
import { Goal as GoalModel } from '../../model/goal';
import Goal from './components/Goal';
import GoalList from './components/GoalList';

type Props = {
    goals: GoalModel[];
};

const GoalsOverview: React.FC<Props> = ({ goals }) => (
    <GoalList>
        {goals.map((goal) => (
            <Goal goal={goal} key={goal.uid} />
        ))}
    </GoalList>
);

export default GoalsOverview;

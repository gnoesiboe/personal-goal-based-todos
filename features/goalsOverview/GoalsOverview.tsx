import React from 'react';
import { Goal } from '../../model/goal';

type Props = {
    goals: Goal[];
};

const GoalsOverview: React.FC<Props> = ({ goals }) => (
    <ul>
        {goals.map((goal) => (
            <li key={goal.uid}>
                <h3>{goal.title}</h3>
                {goal.description && <p>{goal.description}</p>}
            </li>
        ))}
    </ul>
);

export default GoalsOverview;

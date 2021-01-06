import React from 'react';
import { Goal as GoalModel } from '../../model/goal';
import { Role } from '../../model/role';
import RemoveGoal from '../removeGoal/RemoveGoal';
import Goal from './components/Goal';
import GoalList from './components/GoalList';

type Props = {
    goals: GoalModel[];
    role: Role;
};

const GoalsOverview: React.FC<Props> = ({ goals, role }) => (
    <GoalList>
        {goals.map((goal) => (
            <Goal goal={goal} role={role} key={goal.uid}>
                <RemoveGoal role={role} goal={goal} />
            </Goal>
        ))}
    </GoalList>
);

export default GoalsOverview;

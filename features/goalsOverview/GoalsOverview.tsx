import React from 'react';
import { Goal as GoalModel } from '../../model/goal';
import { Role } from '../../model/role';
import GoalDetails from '../goalDetails/GoalDetails';
import GoalList from './components/GoalList';

type Props = {
    goals: GoalModel[];
    role: Role;
};

const GoalsOverview: React.FC<Props> = ({ goals, role }) => (
    <>
        <p>
            Ik wil een <i>{role.title.toLowerCase()}</i> zijn die...
        </p>
        <GoalList>
            {goals.map((goal) => (
                <GoalDetails goal={goal} role={role} key={goal.uid} />
            ))}
        </GoalList>
    </>
);

export default GoalsOverview;

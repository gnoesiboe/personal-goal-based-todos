import React from 'react';
import { RoleWithGoals } from '../../model/role';
import AddGoal from '../addGoal/AddGoal';
import AddRole from '../addRole/AddRole';
import GoalsOverview from '../goalsOverview/GoalsOverview';

type Props = {
    roles: RoleWithGoals[];
};

const RolesOverview: React.FC<Props> = ({ roles }) => (
    <>
        <h1>Roles & Goals</h1>
        <ul>
            {roles.map((role) => (
                <li key={role.uid}>
                    <h2>{role.title}</h2>
                    <GoalsOverview goals={role.goals} />
                    <AddGoal role={role} />
                </li>
            ))}
        </ul>
        <AddRole />
    </>
);

export default RolesOverview;

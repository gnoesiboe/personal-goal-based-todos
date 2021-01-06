import React, { Fragment } from 'react';
import { RoleWithGoals } from '../../model/role';
import AddGoal from '../addGoal/AddGoal';
import GoalsOverview from '../goalsOverview/GoalsOverview';
import Role from './components/Role';
import RoleList from './components/RoleList';
import classNames from './rolesOverview.module.scss';

type Props = {
    roles: RoleWithGoals[];
};

const RolesOverview: React.FC<Props> = ({ roles }) => (
    <RoleList>
        {roles.map((role) => (
            <Role key={role.uid} role={role}>
                <GoalsOverview role={role} goals={role.goals} />
                <div className={classNames.roleActionButtons}>
                    <AddGoal role={role} />
                </div>
            </Role>
        ))}
    </RoleList>
);

export default RolesOverview;

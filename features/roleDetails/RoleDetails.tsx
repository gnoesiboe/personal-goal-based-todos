import { Role as RoleModel, RoleWithGoals } from '../../model/role';
import React from 'react';
import Heading from '../../primitives/heading/Heading';
import { PersonIcon } from '@primer/octicons-react';
import classNames from './roleDetails.module.scss';
import { createSlug } from '../../utility/stringUtilities';
import GoalsOverview from '../goalsOverview/GoalsOverview';
import AddGoal from '../addGoal/AddGoal';

type Props = {
    role: RoleWithGoals;
};

const RoleDetails: React.FC<Props> = ({ role }) => (
    <div className={classNames.container} id={createSlug(role.title)}>
        <div className={classNames.typeIndicator}>
            <PersonIcon />
        </div>
        <Heading tag="h2" style="secondary">
            {role.title}
        </Heading>
        <GoalsOverview role={role} goals={role.goals} />
        <div className={classNames.actionButtons}>
            <AddGoal role={role} />
        </div>
    </div>
);

export default RoleDetails;

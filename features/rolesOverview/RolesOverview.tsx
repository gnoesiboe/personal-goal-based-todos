import React, { Fragment, ReactNode } from 'react';
import { RoleWithGoals } from '../../model/role';
import Heading from '../../primitives/heading/Heading';
import Island from '../../primitives/island/Island';
import MainLayout from '../../primitives/mainLayout/MainLayout';
import AddGoal from '../addGoal/AddGoal';
import GoalsOverview from '../goalsOverview/GoalsOverview';
import RoleSubNavagation from '../roleSubNavigation/roleSubNavigation';
import Role from './components/Role';
import RoleList from './components/RoleList';
import classNames from './rolesOverview.module.scss';

type Props = {
    roles: RoleWithGoals[];
    children: ReactNode;
};

const RolesOverview: React.FC<Props> = ({ roles, children }) => (
    <MainLayout.Body>
        <MainLayout.ContentHeader>
            <Heading tag="h1" flattened>
                Roles & Goals
            </Heading>
        </MainLayout.ContentHeader>
        <MainLayout.ContentMain>
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
            {children}
        </MainLayout.ContentMain>
        <MainLayout.ContentSidebar>
            <RoleSubNavagation roles={roles} />
        </MainLayout.ContentSidebar>
    </MainLayout.Body>
);

export default RolesOverview;

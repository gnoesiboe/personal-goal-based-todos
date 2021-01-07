import React, { ReactNode } from 'react';
import { RoleWithGoals } from '../../model/role';
import Heading from '../../primitives/heading/Heading';
import MainLayout from '../../primitives/mainLayout/MainLayout';
import RoleSubNavagation from '../roleSubNavigation/roleSubNavigation';
import RoleDetails from '../roleDetails/RoleDetails';
import RoleList from './components/RoleList';

type Props = {
    roles: RoleWithGoals[];
    children: ReactNode;
};

const RolesOverview: React.FC<Props> = ({ roles, children }) => (
    <MainLayout.Body>
        <MainLayout.ContentHeader>
            <Heading tag="h1" flattened>
                Rollen en bijbehorende doelen
            </Heading>
        </MainLayout.ContentHeader>
        <MainLayout.ContentMain>
            <RoleList>
                {roles.map((role) => (
                    <RoleDetails key={role.uid} role={role} />
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

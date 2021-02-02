import React, { ReactNode } from 'react';
import Heading from '../../primitives/heading/Heading';
import MainLayout from '../../primitives/mainLayout/MainLayout';
import RoleSubNavigation from '../roleSubNavigation/roleSubNavigation';
import RoleDetails from '../roleDetails/RoleDetails';
import RoleList from './components/RoleList';
import useFetchUserRolesWithGoals from '../../hooks/useFetchUserRolesWithGoals';

type Props = {
    children: ReactNode;
};

const RolesOverview: React.FC<Props> = ({ children }) => {
    const { rolesWithGoals } = useFetchUserRolesWithGoals();

    if (!rolesWithGoals) {
        return null;
    }

    return (
        <MainLayout.Body>
            <MainLayout.ContentHeader>
                <Heading tag="h1" flattened>
                    Rollen en bijbehorende doelen
                </Heading>
            </MainLayout.ContentHeader>
            <MainLayout.ContentMain>
                <RoleList>
                    {rolesWithGoals.map((role) => (
                        <RoleDetails key={role.uid} role={role} />
                    ))}
                </RoleList>
                {children}
            </MainLayout.ContentMain>
            <MainLayout.ContentSidebar>
                <RoleSubNavigation roles={rolesWithGoals} />
            </MainLayout.ContentSidebar>
        </MainLayout.Body>
    );
};

export default RolesOverview;

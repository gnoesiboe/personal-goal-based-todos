import React from 'react';
import Head from 'next/head';
import { fetchAllRolesWithGoalsForUser } from '../repository/rolesRepository';
import { GetServerSideProps, GetStaticProps } from 'next';
import { RoleWithGoals } from '../model/role';
import { getCookieValue } from '../utility/cookieUtilities';
import { cookieName } from '../context/authentication/hooks/usePersistCurrentUserInCookie';
import { User } from '../model/user';
import RolesOverview from '../features/rolesOverview/RolesOverview';
import { createMetaTitle } from '../utility/metaUtilities';
import AddRole from '../features/addRole/AddRole';

type Props = {
    roles: RoleWithGoals[];
};

const GoalsAndRoles: React.FC<Props> = ({ roles }) => (
    <div>
        <Head>
            <title>{createMetaTitle('Roles and Goals')}</title>
        </Head>
        <h1>Roles & Goals</h1>
        <RolesOverview roles={roles} />
        <AddRole />
    </div>
);

export const getServerSideProps: GetServerSideProps<Props> = async ({
    req: request,
}) => {
    const value = getCookieValue(cookieName, request);

    if (!value) {
        throw new Error('Expecting cookie value to be available at this point');
    }

    const currentUser: User = JSON.parse(value);

    const roles = await fetchAllRolesWithGoalsForUser(currentUser.uid);

    return {
        props: { roles },
    };
};

export default GoalsAndRoles;

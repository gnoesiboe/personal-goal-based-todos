import React from 'react';
import Head from 'next/head';
import { fetchAllRolesWithGoalsForUserOrderedByTimestamp } from '../repository/rolesRepository';
import { GetServerSideProps, GetStaticProps } from 'next';
import { RoleWithGoals } from '../model/role';
import { getCookieValue } from '../utility/cookieUtilities';
import { cookieName } from '../context/authentication/hooks/usePersistCurrentUserInCookie';
import { User } from '../model/user';
import RolesOverview from '../features/rolesOverview/RolesOverview';
import { createMetaTitle } from '../utility/metaUtilities';
import AddRole from '../features/addRole/AddRole';
import { home } from '../routing/paths';

type Props = {
    roles: RoleWithGoals[];
};

const GoalsAndRoles: React.FC<Props> = ({ roles }) => (
    <>
        <Head>
            <title>{createMetaTitle('Roles and Goals')}</title>
        </Head>
        <RolesOverview roles={roles}>
            <AddRole />
        </RolesOverview>
    </>
);

export const getServerSideProps: GetServerSideProps<Props> = async ({
    req: request,
}) => {
    const value = getCookieValue(cookieName, request);

    if (!value) {
        return {
            redirect: {
                destination: home,
                permanent: false,
            },
        };
    }

    const currentUser: User = JSON.parse(value);

    const roles = await fetchAllRolesWithGoalsForUserOrderedByTimestamp(
        currentUser.uid,
    );

    return {
        props: { roles },
    };
};

export default GoalsAndRoles;

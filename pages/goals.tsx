import React, { useEffect } from 'react';
import Head from 'next/head';
import { useLoggedInUser } from '../context/authentication/AuthenticationContext';
import { fetchAllRolesForUser } from '../repository/rolesRepository';
import { GetServerSideProps, GetStaticProps } from 'next';
import { Role } from '../model/role';
import { getCookieValue } from '../utility/cookieUtilities';
import { cookieName } from '../context/authentication/hooks/usePersistCurrentUserInCookie';
import { User } from '../model/user';

type Props = {
    roles: Role[];
};

const Goals: React.FC<Props> = ({ roles }) => (
    <div>
        <Head>
            <title>Personal Goal based todos</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <ul>
            {roles.map((role) => (
                <li key={role.uid}>{role.title}</li>
            ))}
        </ul>
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

    const roles = await fetchAllRolesForUser(currentUser.uid);

    return {
        props: { roles },
    };
};

export default Goals;

import React from 'react';
import Head from 'next/head';
import RolesOverview from '../features/rolesOverview/RolesOverview';
import { createMetaTitle } from '../utility/metaUtilities';
import AddRole from '../features/addRole/AddRole';

const GoalsAndRoles: React.FC = () => (
    <>
        <Head>
            <title>{createMetaTitle('Roles and Goals')}</title>
        </Head>
        <RolesOverview>
            <AddRole />
        </RolesOverview>
    </>
);

export default GoalsAndRoles;

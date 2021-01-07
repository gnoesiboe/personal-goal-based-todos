import { Role as RoleModel } from '../../../model/role';
import React from 'react';
import Heading from '../../../primitives/heading/Heading';
import { PersonIcon } from '@primer/octicons-react';
import classNames from '../rolesOverview.module.scss';
import { createSlug } from '../../../utility/stringUtilities';

type Props = {
    role: RoleModel;
    children: React.ReactNode;
};

const Role: React.FC<Props> = ({ role, children }) => (
    <div className={classNames.roleContainer} id={createSlug(role.title)}>
        <div className={classNames.roleTypeIndicator}>
            <PersonIcon />
        </div>
        <Heading tag="h2" style="secondary">
            {role.title}
        </Heading>
        {children}
    </div>
);

export default Role;

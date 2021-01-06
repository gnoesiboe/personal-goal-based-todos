import { Role as RoleModel } from '../../../model/role';
import React from 'react';
import Island from '../../../primitives/island/Island';
import Heading from '../../../primitives/heading/Heading';
import { PersonIcon } from '@primer/octicons-react';
import classNames from '../rolesOverview.module.scss';

type Props = {
    role: RoleModel;
    children: React.ReactNode;
};

const Role: React.FC<Props> = ({ role, children }) => (
    <div className={classNames.container}>
        <Island>
            <div className={classNames.roleTypeIndicator}>
                <PersonIcon />
            </div>
            <Heading tag="h2" style="secondary">
                {role.title}
            </Heading>
            {children}
        </Island>
    </div>
);

export default Role;

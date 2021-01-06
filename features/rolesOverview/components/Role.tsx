import { Role as RoleModel } from '../../../model/role';
import React from 'react';
import Island from '../../../primitives/island/Island';
import Heading from '../../../primitives/heading/Heading';

type Props = {
    role: RoleModel;
    children: React.ReactNode;
};

const Role: React.FC<Props> = ({ role, children }) => (
    <Island>
        <Heading tag="h2" style="secondary">
            {role.title}
        </Heading>
        {children}
    </Island>
);

export default Role;

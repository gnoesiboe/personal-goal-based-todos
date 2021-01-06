import { Role as RoleModel } from '../../../model/role';
import React from 'react';

type Props = {
    role: RoleModel;
    children: React.ReactNode;
};

const Role: React.FC<Props> = ({ role, children }) => (
    <div>
        <h2>{role.title}</h2>
        {children}
    </div>
);

export default Role;

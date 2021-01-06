import React from 'react';
import { Role } from '../../model/role';

type Props = {
    roles: Role[];
};

const RolesOverview: React.FC<Props> = ({ roles }) => {
    return (
        <ul>
            {roles.map((role) => (
                <li key={role.uid}>{role.title}</li>
            ))}
        </ul>
    );
};

export default RolesOverview;

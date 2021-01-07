import React from 'react';
import Button from '../../primitives/button/Button';
import { TrashcanIcon } from '@primer/octicons-react';
import { Role } from '../../model/role';
import useRemoveRoleOnButtonClick from './hooks/useRemoveRoleOnButtonClick';

type Props = {
    role: Role;
};

const RemoveRole: React.FC<Props> = ({ role }) => {
    const { onButtonClick } = useRemoveRoleOnButtonClick(role);

    return (
        <Button
            icon={<TrashcanIcon />}
            style="link"
            deflated
            onClick={onButtonClick}
            size="small"
        >
            verwijderen
        </Button>
    );
};

export default RemoveRole;

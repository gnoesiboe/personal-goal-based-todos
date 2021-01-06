import React from 'react';
import Button from '../../primitives/button/Button';
import { PlusIcon } from '@primer/octicons-react';

const AddRole: React.FC = () => {
    return (
        <Button icon={<PlusIcon />} style="primary">
            Add role
        </Button>
    );
};

export default AddRole;

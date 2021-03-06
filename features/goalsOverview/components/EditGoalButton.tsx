import React, { MouseEventHandler } from 'react';
import { PencilIcon } from '@primer/octicons-react';
import Button from '../../../primitives/button/Button';

type Props = {
    onClick: MouseEventHandler<HTMLButtonElement>;
};

const EditGoalButton: React.FC<Props> = ({ onClick }) => (
    <Button
        icon={<PencilIcon />}
        style="link"
        deflated
        size="small"
        onClick={onClick}
    >
        wijzigen
    </Button>
);

export default EditGoalButton;

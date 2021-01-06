import React from 'react';
import { Role } from '../../model/role';
import Button from '../../primitives/button/Button';
import { TrashcanIcon } from '@primer/octicons-react';
import useRemoveGoalOnButtonClick from './hooks/useRemoveGoalOnButtonClick';
import { Goal } from '../../model/goal';

type Props = {
    role: Role;
    goal: Goal;
};

const RemoveGoal: React.FC<Props> = ({ role, goal }) => {
    const { onButtonClick } = useRemoveGoalOnButtonClick(role, goal);

    return (
        <Button
            icon={<TrashcanIcon />}
            style="link"
            deflated
            onClick={onButtonClick}
            size="small"
        >
            remove
        </Button>
    );
};

export default RemoveGoal;

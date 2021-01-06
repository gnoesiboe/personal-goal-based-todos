import { removeGoalFromRole } from './../../../repository/rolesRepository';
import { MouseEventHandler } from 'react';
import { Role } from '../../../model/role';
import { Goal } from '../../../model/goal';
import useRefreshServerSideProps from '../../../hooks/useRefetchServerSideProps';

export default function useRemoveGoalOnButtonClick(role: Role, goal: Goal) {
    const refreshServerSideProps = useRefreshServerSideProps();

    const onButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
        if (!confirm('Are you sure? This can not be undone!')) {
            return;
        }

        removeGoalFromRole(role.uid, goal.uid).then(() => {
            // ensure the overview is reloaded without the removed item
            refreshServerSideProps();
        });
    };

    return { onButtonClick };
}

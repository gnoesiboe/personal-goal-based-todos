import { useNotifications } from './../../../context/notification/NotificationContext';
import { removeGoalFromRole } from './../../../repository/rolesRepository';
import { MouseEventHandler } from 'react';
import { Role } from '../../../model/role';
import { Goal } from '../../../model/goal';
import useRefreshServerSideProps from '../../../hooks/useRefetchServerSideProps';
import { NotificationType } from '../../../model/notification';

export default function useRemoveGoalOnButtonClick(role: Role, goal: Goal) {
    const refreshServerSideProps = useRefreshServerSideProps();

    const { notify } = useNotifications();

    const onButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
        if (!confirm('Are you sure? This can not be undone!')) {
            return;
        }

        removeGoalFromRole(role.uid, goal.uid).then((success) => {
            if (!success) {
                notify(
                    'Oeps!',
                    'Er is iets foutgegaan bij het verwijderen van je doel. Probeer het later nog eens!',
                    NotificationType.Error,
                );
            }

            // ensure the overview is reloaded without the removed item
            refreshServerSideProps();
        });
    };

    return { onButtonClick };
}

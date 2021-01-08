import { useNotifications } from './../../../context/notification/NotificationContext';
import { removeRole } from './../../../repository/rolesRepository';
import { MouseEventHandler } from 'react';
import useRefreshServerSideProps from '../../../hooks/useRefetchServerSideProps';
import { Role } from '../../../model/role';
import { NotificationType } from '../../../model/notification';

export default function useRemoveRoleOnButtonClick(role: Role) {
    const refreshServerSideProps = useRefreshServerSideProps();

    const { notify } = useNotifications();

    const onButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
        if (!confirm('Are you sure? This can not be undone!')) {
            return;
        }

        removeRole(role.uid).then((succes) => {
            if (!succes) {
                notify(
                    'Oeps!',
                    'Je rol kon door een fout niet verwijderd worden. Probeer het later nog eens!',
                    NotificationType.Error,
                );
            }

            // ensure the overview is reloaded without the removed item
            refreshServerSideProps();
        });
    };

    return { onButtonClick };
}

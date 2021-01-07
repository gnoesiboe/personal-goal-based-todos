import { removeRole } from './../../../repository/rolesRepository';
import { MouseEventHandler } from 'react';
import useRefreshServerSideProps from '../../../hooks/useRefetchServerSideProps';
import { Role } from '../../../model/role';

export default function useRemoveRoleOnButtonClick(role: Role) {
    const refreshServerSideProps = useRefreshServerSideProps();

    const onButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
        if (!confirm('Are you sure? This can not be undone!')) {
            return;
        }

        removeRole(role.uid).then(() => {
            // ensure the overview is reloaded without the removed item
            refreshServerSideProps();
        });
    };

    return { onButtonClick };
}

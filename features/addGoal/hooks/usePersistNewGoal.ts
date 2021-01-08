import { useNotifications } from './../../../context/notification/NotificationContext';
import { NotificationType } from '../../../model/notification';
import { persistNewGoalForRole } from '../../../repository/rolesRepository';
import { OnFormDataValidHandler } from './useHandleFormEvents';

export default function usePersistNewGoal() {
    const { notify } = useNotifications();

    const onFormValid: OnFormDataValidHandler = async (
        roleUid,
        values,
    ): Promise<boolean> => {
        const success = persistNewGoalForRole(
            roleUid,
            values.title,
            values.description || null,
        );

        if (!success) {
            notify(
                'Oeps!',
                'Er is iets foutgegaan bij het opslaan van je doel. Probeer het later nog eens!',
                NotificationType.Error,
            );
        }

        return success;
    };

    return { onFormValid };
}

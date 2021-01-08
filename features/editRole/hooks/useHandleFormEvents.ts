import { useNotifications } from './../../../context/notification/NotificationContext';
import { persistRoleUpdates } from './../../../repository/rolesRepository';
import useFormState, {
    FormErrors,
    InputValidator,
    OnFormValidHandler,
} from '../../../hooks/useFormState';
import { Role } from '../../../model/role';
import { FormValues } from '../../goalForm/GoalForm';
import { NotificationType } from '../../../model/notification';

export default function useHandleFormEvents(role: Role, onDone: () => void) {
    const { notify } = useNotifications();

    const validateInput: InputValidator<FormValues> = (values) => {
        const newErrors: FormErrors<FormValues> = {};

        if (!values.title) {
            newErrors.title = 'Required';
        }

        return newErrors;
    };

    const onFormValid: OnFormValidHandler<FormValues> = async (values) => {
        const success = await persistRoleUpdates({
            ...role,
            ...values,
        });

        if (success) {
            onDone();
        } else {
            notify(
                'Oeps!',
                'Er is iets foutgegaan bij het opslaan van wijzigingen. Probeer het later nog eens!',
                NotificationType.Error,
            );
        }

        return success;
    };

    return useFormState(['title', 'description'], validateInput, onFormValid, {
        title: role.title,
    });
}

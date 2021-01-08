import { useNotifications } from './../../../context/notification/NotificationContext';
import { useLoggedInUser } from './../../../context/authentication/AuthenticationContext';
import { persistNewRole } from './../../../repository/rolesRepository';
import useFormState, {
    FormErrors,
    InputValidator,
    OnFormValidHandler,
} from '../../../hooks/useFormState';
import { FormValues } from '../../roleForm/RoleForm';
import { NotificationType } from '../../../model/notification';

export default function useHandleFormEvents(onDone: () => void) {
    const user = useLoggedInUser();

    const { notify } = useNotifications();

    const validateInput: InputValidator<FormValues> = (values) => {
        const newErrors: FormErrors<FormValues> = {};

        if (!values.title) {
            newErrors.title = 'Required';
        }

        return newErrors;
    };

    const onFormValid: OnFormValidHandler<FormValues> = async (values) => {
        if (!user) {
            throw new Error('Expecting user to be available at this point');
        }

        const success = await persistNewRole(values.title, user.uid);

        if (success) {
            onDone();
        } else {
            notify(
                'Oeps!',
                'Er is iets foutgegaan bij het opslaan van je nieuwe rol. Probeer het later nog eens!',
                NotificationType.Error,
            );
        }

        return success;
    };

    return useFormState(['title'], validateInput, onFormValid);
}

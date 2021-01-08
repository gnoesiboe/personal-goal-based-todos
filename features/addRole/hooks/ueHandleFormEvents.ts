import { useLoggedInUser } from './../../../context/authentication/AuthenticationContext';
import { persistNewRole } from './../../../repository/rolesRepository';
import useFormState, {
    FormErrors,
    InputValidator,
    OnFormValidHandler,
} from '../../../hooks/useFormState';
import { FormValues } from '../../roleForm/RoleForm';

export default function useHandleFormEvents(onDone: () => void) {
    const user = useLoggedInUser();

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
        }

        return success;
    };

    return useFormState(['title'], validateInput, onFormValid);
}

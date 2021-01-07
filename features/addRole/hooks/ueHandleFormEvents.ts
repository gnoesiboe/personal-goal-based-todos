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

    const validateInput: InputValidator = <FormValues>(values) => {
        const newErrors: FormErrors<FormValues> = {};

        if (!values.title) {
            // @ts-ignore → don't know how to get this typescript error fixed
            newErrors.title = 'Required';
        }

        return newErrors;
    };

    const onFormValid: OnFormValidHandler<FormValues> = async (values) => {
        const success = await persistNewRole(values.title, user.uid);

        if (success) {
            onDone();
        }

        return success;
    };

    return useFormState(['title'], validateInput, onFormValid);
}

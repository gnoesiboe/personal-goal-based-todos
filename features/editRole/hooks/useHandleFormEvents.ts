import { persistRoleUpdates } from './../../../repository/rolesRepository';
import useFormState, {
    FormErrors,
    InputValidator,
    OnFormValidHandler,
} from '../../../hooks/useFormState';
import { Role } from '../../../model/role';
import { FormValues } from '../../goalForm/GoalForm';

export default function useHandleFormEvents(role: Role, onDone: () => void) {
    const validateInput: InputValidator = <FormValues>(values) => {
        const newErrors: FormErrors<FormValues> = {};

        if (!values.title) {
            // @ts-ignore → don't know how to get this typescript error fixed
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
        }

        return success;
    };

    return useFormState(['title', 'description'], validateInput, onFormValid, {
        title: role.title,
    });
}

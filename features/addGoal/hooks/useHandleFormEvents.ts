import useFormState, {
    InputValidator,
    FormErrors,
    OnFormValidHandler,
} from '../../../hooks/useFormState';
import { Role } from '../../../model/role';

type FormValues = {
    title: string;
    description: string;
};

export type OnFormDataValidHandler = (
    roleUid: string,
    values: FormValues,
) => Promise<boolean>;

export default function useHandleFormEvents(
    role: Role,
    onFormValidHandler: OnFormDataValidHandler,
    onDone: () => void,
) {
    const validateInput: InputValidator = <FormValues>(values) => {
        const newErrors: FormErrors<FormValues> = {};

        if (!values.title) {
            // @ts-ignore → don't know how to get this typescript error fixed
            newErrors.title = 'Required';
        }

        return newErrors;
    };

    const onFormValid: OnFormValidHandler<FormValues> = async (values) => {
        const success = await onFormValidHandler(role.uid, values);

        if (success) {
            onDone();
        }

        return success;
    };

    return useFormState(['title', 'description'], validateInput, onFormValid);
}

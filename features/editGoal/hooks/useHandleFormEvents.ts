import { updateGoalFromRole } from './../../../repository/rolesRepository';
import useFormState, {
    FormErrors,
    InputValidator,
    OnFormValidHandler,
} from '../../../hooks/useFormState';
import { Goal } from '../../../model/goal';
import { Role } from '../../../model/role';
import { FormValues } from '../../goalForm/GoalForm';

export default function useHandleFormEvents(
    role: Role,
    goal: Goal,
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
        const success = await updateGoalFromRole(
            role.uid,
            goal.uid,
            values.title,
            values.description,
        );

        if (success) {
            onDone();
        }

        return success;
    };

    return useFormState(['title', 'description'], validateInput, onFormValid, {
        ...goal,
    });
}

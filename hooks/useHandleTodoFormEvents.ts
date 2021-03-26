import useFormState, {
    FormErrors,
    InputValidator,
    OnFormValidHandler,
    PreCommitValuesUpdateCallback,
} from './useFormState';
import { FormValues } from '../features/todoForm/TodoForm';
import { FocusEventHandler } from 'react';
import { applyAndExtractQuickTags } from '../features/addTodo/utility/quickTagApplicationUtilities';

export default function useHandleTodoFormEvents(
    onFormValid: OnFormValidHandler<FormValues>,
    initialValues: Partial<FormValues>,
) {
    const validateInput: InputValidator<FormValues> = (values) => {
        const newErrors: FormErrors<FormValues> = {};

        if (!values.summary) {
            newErrors.summary = 'Required';
        }

        return newErrors;
    };

    const preCommitValueUpdates: PreCommitValuesUpdateCallback<FormValues> = (
        values,
    ) => ({
        ...values,
        ...applyAndExtractQuickTags(values.summary),
    });

    const {
        onSubmit,
        values,
        errors,
        onFieldChange,
        setFieldValue,
        touched,
        onFieldBlur: handleFieldBlur,
        inputIsValid,
        disabled,
        onFieldKeyDown,
        onFieldFocus,
        focussedField,
    } = useFormState(
        [
            'summary',
            'description',
            'roleWithGoal',
            'deadline',
            'date',
            'quickfix',
        ],
        validateInput,
        onFormValid,
        initialValues,
        preCommitValueUpdates,
    );

    const onFieldBlur: FocusEventHandler<
        HTMLInputElement | HTMLTextAreaElement
    > = (event) => {
        const field = event.target.name as keyof FormValues;

        if (field === 'summary') {
            const updates = applyAndExtractQuickTags(event.target.value);

            // @ts-ignore → Somehow Typescript does not know that field is a key of FormValues here?!
            Object.keys(updates).forEach((field: keyof FormValues) => {
                setFieldValue(field, updates[field]);
            });
        }

        handleFieldBlur(event);
    };

    return {
        onSubmit,
        values,
        errors,
        onFieldChange,
        setFieldValue,
        touched,
        onFieldBlur,
        inputIsValid,
        disabled,
        onFieldKeyDown,
        onFieldFocus,
        focussedField,
    };
}

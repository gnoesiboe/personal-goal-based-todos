import {
    ChangeEventHandler,
    FocusEventHandler,
    FormEventHandler,
    KeyboardEventHandler,
    useEffect,
    useState,
} from 'react';

export type FormErrors<FormValues extends {}> = {
    [key in keyof FormValues]?: string;
};

export type FormTouched<FormValues> = {
    [key in keyof FormValues]: boolean;
};

export type InputValidator = <FormValues>(
    values: FormValues,
) => FormErrors<FormValues>;

export type OnFormValidHandler<FormValues> = (
    values: FormValues,
) => Promise<boolean>;

const determineValues = <FormValues,>(
    keys: string[],
    initialValues: Partial<FormValues> = {},
) => {
    const values = {};

    keys.forEach((key) => {
        values[key] = '';
    });

    return { ...values, ...initialValues } as FormValues;
};

const createTouched = <FormValues,>(keys: string[], fieldValue: boolean) => {
    const touched = {};

    keys.forEach((key) => (touched[key] = fieldValue));

    return touched as FormTouched<FormValues>;
};

export default function useFormState<
    FormValues extends Record<string, string | null>
>(
    keys: Array<string>,
    validateInput: InputValidator,
    onFormValid: OnFormValidHandler<FormValues>,
    initialValues: Partial<FormValues> = {},
) {
    const [disabled, setDisabled] = useState<boolean>(false);

    const [values, setValues] = useState<FormValues>(
        determineValues(keys, initialValues),
    );

    const [errors, setErrors] = useState<FormErrors<FormValues>>({});

    const [touched, setTouched] = useState<FormTouched<FormValues>>(
        createTouched(keys, false),
    );

    const [inputIsValid, setInputIsValid] = useState<boolean>(false);

    const checkInputIsValid = () => {
        const newErrors: FormErrors<FormValues> = validateInput(values);

        const hasErrors = Object.keys(newErrors).length > 0;

        setErrors(newErrors);
        setInputIsValid(!hasErrors);

        return !hasErrors;
    };

    useEffect(() => {
        checkInputIsValid();
    }, [values, touched]);

    const resetFormState = () => {
        setValues(determineValues(keys));
        setTouched(createTouched(keys, false));
        setErrors({});
    };

    const submitForm = async () => {
        // when submitting, define every field as touched to make sure the
        // errors are shown
        setTouched(createTouched(keys, true));

        if (checkInputIsValid()) {
            setDisabled(true);

            const success = await onFormValid(values);

            setDisabled(false);

            if (success) {
                resetFormState();
            }

            return success;
        }
    };

    const onSubmit: FormEventHandler = async (event) => {
        event.preventDefault();

        submitForm();
    };

    const onFieldChange: ChangeEventHandler<HTMLElement> = (event) => {
        const target = event.target;

        if (
            !(target instanceof HTMLTextAreaElement) &&
            !(target instanceof HTMLInputElement)
        ) {
            throw new Error('Element type not supported');
        }

        const field = target.name as keyof FormValues;
        const newValue = target.value;

        setValues((currentValues) => ({
            ...currentValues,
            [field]: newValue,
        }));
    };

    const onFieldBlur: FocusEventHandler<
        HTMLInputElement | HTMLTextAreaElement
    > = (event) => {
        const field = event.target.name as keyof FormValues;

        setTouched((currentValue) => ({
            ...currentValue,
            [field]: true,
        }));

        checkInputIsValid();
    };

    const onFieldKeyDown: KeyboardEventHandler = (event) => {
        if (
            event.key === 'Enter' &&
            event.ctrlKey &&
            !event.shiftKey &&
            !event.altKey &&
            !event.metaKey
        ) {
            submitForm();
        }
    };

    return {
        onSubmit,
        values,
        errors,
        onFieldChange,
        touched,
        onFieldBlur,
        inputIsValid,
        disabled,
        onFieldKeyDown,
    };
}

import { title } from 'process';
import {
    ChangeEventHandler,
    FocusEventHandler,
    FormEventHandler,
    useEffect,
    useState,
} from 'react';
import { deserialize } from 'v8';
import { Role } from '../../../model/role';

export enum FormKeys {
    Title = 'title',
    Description = 'description',
}

type FormValues = {
    [key in FormKeys]: string;
};

type FormErrors = {
    [key in FormKeys]?: string;
};

type FormTouched = {
    [key in FormKeys]: boolean;
};

export type OnFormValidHandler = (
    roleUid: string,
    values: FormValues,
) => Promise<boolean>;

export default function useHandleFormEvents(
    role: Role,
    onFormValid: OnFormValidHandler,
    onDone: () => void,
) {
    const [disabled, setDisabled] = useState<boolean>(false);

    const [values, setValues] = useState<FormValues>({
        title: '',
        description: '',
    });

    const [errors, setErrors] = useState<FormErrors>({});

    const [touched, setTouched] = useState<FormTouched>({
        title: false,
        description: false,
    });

    const [inputIsValid, setInputIsValid] = useState<boolean>(false);

    useEffect(() => {
        checkInputIsValid();
    }, [values, touched]);

    const checkInputIsValid = () => {
        const newErrors: FormErrors = {};

        if (!values.title) {
            newErrors.title = 'Required';
        }

        const hasErrors = Object.keys(newErrors).length > 0;

        setErrors(newErrors);
        setInputIsValid(!hasErrors);

        return !hasErrors;
    };

    const onSubmit: FormEventHandler = (event) => {
        event.preventDefault();

        // when submitting, define every field as touched to make sure the
        // errors are shown
        setTouched({ title: true, description: true });

        if (checkInputIsValid()) {
            setDisabled(true);

            onFormValid(role.uid, values).then((success) => {
                if (success) {
                    onDone();
                } else {
                    setDisabled(false);
                }
            });
        }
    };

    const onFieldChange: ChangeEventHandler<
        HTMLInputElement | HTMLTextAreaElement
    > = (event) => {
        const field = event.target.name as keyof FormValues;
        const newValue = event.target.value;

        setValues((currentValues) => ({
            ...currentValues,
            [field]: newValue,
        }));
    };

    const onFieldBlur: FocusEventHandler<
        HTMLInputElement | HTMLTextAreaElement
    > = (event) => {
        const field = event.target.name;

        setTouched((currentValue) => ({
            ...currentValue,
            [field]: true,
        }));

        checkInputIsValid();
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
    };
}

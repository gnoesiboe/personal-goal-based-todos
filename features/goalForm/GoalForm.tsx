import React, {
    ChangeEventHandler,
    FocusEventHandler,
    FormEventHandler,
    MouseEventHandler,
} from 'react';
import { FormErrors, FormTouched } from '../../hooks/useFormState';
import Button from '../../primitives/button/Button';
import Form from '../../primitives/form/Form';

export type FormValues = {
    title: string;
    description: string;
};

type Props = {
    onSubmit: FormEventHandler<HTMLFormElement>;
    onFieldChange: ChangeEventHandler;
    onFieldBlur: FocusEventHandler;
    onCancelClick: MouseEventHandler<HTMLButtonElement>;
    values: FormValues;
    errors: FormErrors<FormValues>;
    touched: FormTouched<FormValues>;
    disabled: boolean;
    inputIsValid: boolean;
};

const GoalForm: React.FC<Props> = ({
    onSubmit,
    onFieldChange,
    onFieldBlur,
    onCancelClick,
    values,
    errors,
    touched,
    disabled,
    inputIsValid,
}) => (
    <Form.Form onSubmit={onSubmit}>
        <Form.Group>
            <Form.Input
                type="text"
                name="title"
                placeholder="Title"
                value={values.title}
                onChange={onFieldChange}
                onBlur={onFieldBlur}
                disabled={disabled}
                autoFocus
            />
            {touched.title && errors.title && (
                <Form.Error>{errors.title}</Form.Error>
            )}
        </Form.Group>
        <Form.Group>
            <Form.TextArea
                name="description"
                placeholder="Optional description"
                value={values.description}
                onChange={onFieldChange}
                onBlur={onFieldBlur}
                disabled={disabled}
            />
            {touched.description && errors.description && (
                <Form.Error>{errors.description}</Form.Error>
            )}
        </Form.Group>
        <Form.ActionButtons>
            <Button type="submit" disabled={!inputIsValid || disabled}>
                Save
            </Button>
            <Button type="button" style="link" onClick={onCancelClick}>
                cancel
            </Button>
        </Form.ActionButtons>
    </Form.Form>
);

export default GoalForm;

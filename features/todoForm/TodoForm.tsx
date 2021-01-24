import React, {
    ChangeEventHandler,
    FocusEventHandler,
    FormEventHandler,
    KeyboardEventHandler,
    MouseEventHandler,
} from 'react';
import useFetchUserRolesWithGoals from '../../hooks/useFetchUserRolesWithGoals';
import { FormErrors, FormTouched } from '../../hooks/useFormState';
import Button from '../../primitives/button/Button';
import Form from '../../primitives/form/Form';

export type FormValues = {
    summary: string;
    description: string;
    roleWithGoal: string;
};

type Props = {
    onSubmit: FormEventHandler<HTMLFormElement>;
    onFieldChange: ChangeEventHandler;
    onFieldKeyDown: KeyboardEventHandler;
    onFieldBlur: FocusEventHandler;
    onCancelClick: MouseEventHandler<HTMLButtonElement>;
    values: FormValues;
    errors: FormErrors<FormValues>;
    touched: FormTouched<FormValues>;
    disabled: boolean;
    inputIsValid: boolean;
};

const TodoForm: React.FC<Props> = ({
    onSubmit,
    onFieldChange,
    onFieldKeyDown,
    onFieldBlur,
    onCancelClick,
    values,
    errors,
    touched,
    disabled,
    inputIsValid,
}) => {
    const { rolesWithGoals } = useFetchUserRolesWithGoals();

    return (
        <Form.Form onSubmit={onSubmit}>
            <Form.Group>
                <Form.Input
                    type="summary"
                    name="summary"
                    placeholder="Summary"
                    value={values.summary}
                    onChange={onFieldChange}
                    onBlur={onFieldBlur}
                    disabled={disabled}
                    autoFocus
                    onKeyDown={onFieldKeyDown}
                />
                {touched.summary && errors.summary && (
                    <Form.Error>{errors.summary}</Form.Error>
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
                    minRows={5}
                    onKeyDown={onFieldKeyDown}
                />
                {touched.description && errors.description && (
                    <Form.Error>{errors.description}</Form.Error>
                )}
            </Form.Group>
            <Form.Group>
                {rolesWithGoals && (
                    <>
                        <Form.Select
                            name="roleWithGoal"
                            value={values.roleWithGoal}
                            onChange={onFieldChange}
                            onBlur={onFieldBlur}
                            disabled={disabled}
                            onKeyDown={onFieldKeyDown}
                        >
                            <option value="">...</option>
                            {rolesWithGoals.map((role) => (
                                <optgroup key={role.uid} label={role.title}>
                                    {role.goals.map((goal) => (
                                        <option
                                            key={goal.uid}
                                            value={[role.uid, goal.uid]}
                                        >
                                            {role.title} » {goal.title}
                                        </option>
                                    ))}
                                </optgroup>
                            ))}
                        </Form.Select>
                        {touched.roleWithGoal && errors.roleWithGoal && (
                            <Form.Error>{errors.roleWithGoal}</Form.Error>
                        )}
                    </>
                )}
            </Form.Group>
            <Form.ActionButtons>
                <Button
                    type="submit"
                    disabled={!inputIsValid || disabled || !rolesWithGoals}
                >
                    Save
                </Button>
                <Button type="button" style="link" onClick={onCancelClick}>
                    cancel
                </Button>
            </Form.ActionButtons>
        </Form.Form>
    );
};

export default TodoForm;

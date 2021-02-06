import React, {
    ChangeEventHandler,
    FocusEventHandler,
    FormEventHandler,
    KeyboardEventHandler,
    MouseEventHandler,
} from 'react';
import useFetchUserRolesWithGoals from '../../hooks/useFetchUserRolesWithGoals';
import {
    FormErrors,
    FormTouched,
    SetFieldValueHandler,
} from '../../hooks/useFormState';
import Button from '../../primitives/button/Button';
import Form from '../../primitives/form/Form';
import { generateComposedKey } from '../../utility/idUtilities';
import { createStartOfToday } from '../../utility/dateTimeUtilities';

export type FormValues = {
    summary: string;
    description: string;
    roleWithGoal: string;
    urgent: boolean;
    deadline: Date | null;
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
    setFieldValue: SetFieldValueHandler<FormValues>;
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
    setFieldValue,
}) => {
    const { rolesWithGoals } = useFetchUserRolesWithGoals();

    return (
        <Form.Form onSubmit={onSubmit}>
            <Form.Group>
                <Form.Label>
                    Samenvatting:
                    <Form.Input
                        type="text"
                        name="summary"
                        placeholder="Summary"
                        value={values.summary}
                        onChange={onFieldChange}
                        onBlur={onFieldBlur}
                        disabled={disabled}
                        autoFocus
                        onKeyDown={onFieldKeyDown}
                    />
                </Form.Label>
                {touched.summary && errors.summary && (
                    <Form.Error>{errors.summary}</Form.Error>
                )}
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    Beschrijving:
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
                </Form.Label>
                {touched.description && errors.description && (
                    <Form.Error>{errors.description}</Form.Error>
                )}
            </Form.Group>
            {rolesWithGoals && (
                <Form.Group>
                    <Form.Label>
                        Draagt bij aan doel:
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
                                            value={generateComposedKey(
                                                role.uid,
                                                goal.uid,
                                            )}
                                        >
                                            {role.title} » {goal.title}
                                        </option>
                                    ))}
                                </optgroup>
                            ))}
                        </Form.Select>
                    </Form.Label>
                    {touched.roleWithGoal && errors.roleWithGoal && (
                        <Form.Error>{errors.roleWithGoal}</Form.Error>
                    )}
                </Form.Group>
            )}
            <Form.Group>
                <Form.Label>
                    Deadline:
                    <Form.DatePicker
                        name="deadline"
                        selected={values.deadline}
                        dateFormat="dd/MM/yyyy"
                        onChange={(newValue) =>
                            setFieldValue('deadline', newValue)
                        }
                        onBlur={onFieldBlur}
                        disabled={disabled}
                        onKeyDown={onFieldKeyDown}
                        minDate={createStartOfToday()}
                        todayButton="Vandaag"
                        openToDate={createStartOfToday()}
                        closeOnScroll
                        showWeekNumbers
                        shouldCloseOnSelect
                    />
                </Form.Label>
                {touched.deadline && errors.deadline && (
                    <Form.Error>{errors.deadline}</Form.Error>
                )}
            </Form.Group>
            <Form.Group horizontal>
                <Form.Label>
                    <Form.Input
                        type="checkbox"
                        name="urgent"
                        checked={values.urgent}
                        onChange={onFieldChange}
                        onBlur={onFieldBlur}
                        disabled={disabled}
                        onKeyDown={onFieldKeyDown}
                    />
                    Urgent
                </Form.Label>
                {touched.urgent && errors.urgent && (
                    <Form.Error>{errors.urgent}</Form.Error>
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

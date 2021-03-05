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
import { createStartOfToday } from '../../utility/dateTimeUtilities';
import GroupedSelect from '../../primitives/groupedSelect/GroupedSelect';
import { generateOptionsForRolesWithGoals } from './utility/optionGenerator';

export type FormValues = {
    summary: string;
    description: string;
    roleWithGoal: string;
    deadline: Date | null;
    date: Date | null;
    quickfix: boolean;
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
            <Form.Section>
                <Form.Group>
                    <Form.Label>
                        Samenvatting
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
                    <Form.Help>
                        Tip! Gebruik Markdown om links of formatting toe te
                        voegen.
                    </Form.Help>
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Beschrijving
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
                    <Form.Help>
                        Tip! Gebruik Markdown om links of formatting toe te
                        voegen.
                    </Form.Help>
                </Form.Group>
                {rolesWithGoals && (
                    <Form.Group>
                        <Form.Label>
                            Draagt bij aan doel
                            <GroupedSelect
                                options={generateOptionsForRolesWithGoals(
                                    rolesWithGoals,
                                )}
                                value={values.roleWithGoal}
                                onChange={(newValue) =>
                                    setFieldValue('roleWithGoal', newValue)
                                }
                                placeholder="Klik om een rol te kiezen"
                            />
                        </Form.Label>
                        {touched.roleWithGoal && errors.roleWithGoal && (
                            <Form.Error>{errors.roleWithGoal}</Form.Error>
                        )}
                    </Form.Group>
                )}
            </Form.Section>
            <Form.Section horizontal>
                <Form.Group>
                    <Form.Label preventClick>
                        Start
                        <Form.DatePicker
                            name="date"
                            selected={values.date}
                            dateFormat="dd/MM/yyyy"
                            onChange={(newValue) =>
                                setFieldValue('date', newValue)
                            }
                            onBlur={onFieldBlur}
                            disabled={disabled}
                            onKeyDown={onFieldKeyDown}
                            minDate={createStartOfToday()}
                            todayButton="Vandaag"
                            closeOnScroll
                            showWeekNumbers
                            isClearable
                            clearButtonTitle="Geen datum"
                            shouldCloseOnSelect
                            placement="top"
                        />
                    </Form.Label>
                    {touched.date && errors.date && (
                        <Form.Error>{errors.date}</Form.Error>
                    )}
                </Form.Group>
                <Form.Group>
                    <Form.Label preventClick>
                        Deadline
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
                            isClearable
                            clearButtonTitle="Geen deadline"
                            closeOnScroll
                            showWeekNumbers
                            shouldCloseOnSelect
                            placement="top"
                        />
                    </Form.Label>
                    {touched.deadline && errors.deadline && (
                        <Form.Error>{errors.deadline}</Form.Error>
                    )}
                </Form.Group>
            </Form.Section>
            <Form.Section horizontal>
                <Form.Group horizontal>
                    <Form.Label>
                        <Form.Input
                            type="checkbox"
                            checked={values.quickfix}
                            onChange={onFieldChange}
                            name="quickfix"
                        />
                        Quickfix
                    </Form.Label>
                    {touched.quickfix && errors.quickfix && (
                        <Form.Error>{errors.quickfix}</Form.Error>
                    )}
                </Form.Group>
            </Form.Section>
            <Form.ActionButtons centered>
                <Button
                    type="submit"
                    disabled={!inputIsValid || disabled || !rolesWithGoals}
                    style="primary"
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

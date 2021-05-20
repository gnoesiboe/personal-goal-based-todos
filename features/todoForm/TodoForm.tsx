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
import DefinitionList from '../../primitives/definitionList/DefinitionList';

export type FormValues = {
    summary: string;
    description: string;
    roleWithGoal: string;
    deadline: Date | null;
    date: Date | null;
    quickfix: boolean;
    waiting: boolean;
    evening: boolean;
};

type Props = {
    onSubmit: FormEventHandler<HTMLFormElement>;
    onFieldChange: ChangeEventHandler;
    onFieldKeyDown: KeyboardEventHandler;
    onFieldBlur: FocusEventHandler;
    onFieldFocus: FocusEventHandler;
    onCancelClick: MouseEventHandler<HTMLButtonElement>;
    values: FormValues;
    errors: FormErrors<FormValues>;
    touched: FormTouched<FormValues>;
    disabled: boolean;
    inputIsValid: boolean;
    setFieldValue: SetFieldValueHandler<FormValues>;
    isUpdate?: boolean;
    focussedField: keyof FormValues | null;
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
    isUpdate = false,
    onFieldFocus,
    focussedField,
}) => {
    const { rolesWithGoals, goalCounters } = useFetchUserRolesWithGoals();

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
                            onFocus={onFieldFocus}
                            disabled={disabled}
                            autoFocus={!isUpdate}
                            onKeyDown={onFieldKeyDown}
                            autoComplete="off"
                        />
                    </Form.Label>
                    {touched.summary && errors.summary && (
                        <Form.Error>{errors.summary}</Form.Error>
                    )}
                    <Form.Help visible={focussedField === 'summary'}>
                        <strong>Tip 1</strong> → Gebruik tags om snel andere
                        settings te kunnen doen:
                        <DefinitionList.List>
                            <DefinitionList.Item
                                term="@today"
                                description="Datum wordt naar vandaag gezet."
                            />
                            <DefinitionList.Item
                                term="@tomorrow"
                                description="Datum wordt naar morgen gezet."
                            />
                            <DefinitionList.Item
                                term="@nextWeek"
                                description="Datum wordt naar komende maandag gezet."
                            />
                            <DefinitionList.Item
                                term="@dl(today)"
                                description="Deadline wordt op vandaag gezet."
                            />
                            <DefinitionList.Item
                                term="@dl(tomorrow)"
                                description="Deadline wordt op morgen gezet."
                            />
                            <DefinitionList.Item
                                term="@thisWeek"
                                description="Deadline wordt op einde van deze week (zondag) gezet."
                            />
                            <DefinitionList.Item
                                term="@quickfix"
                                description="Mark this todo as a quickfix."
                            />
                            <DefinitionList.Item
                                term="@must"
                                description="Set that this todo needs to be finished today."
                            />
                            <DefinitionList.Item
                                term="@waiting"
                                description="Mark the todo as waiting for something."
                            />
                        </DefinitionList.List>
                        <strong>Tip 2</strong> → Gebruik Markdown om links of
                        formatting toe te voegen.
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
                            onFocus={onFieldFocus}
                            disabled={disabled}
                            minRows={5}
                            onKeyDown={onFieldKeyDown}
                            autoComplete="off"
                        />
                    </Form.Label>
                    {touched.description && errors.description && (
                        <Form.Error>{errors.description}</Form.Error>
                    )}
                    <Form.Help visible={focussedField === 'description'}>
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
                                    goalCounters,
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
                            onFocus={(event) => {
                                // workaround to make sure that keyboard does not pop up on mobile when editing the date
                                // @see https://github.com/Hacker0x01/react-datepicker/issues/1640
                                event.target.readOnly = true;

                                onFieldFocus(event);
                            }}
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
                            autoComplete="off"
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
                            onFocus={(event) => {
                                // workaround to make sure that keyboard does not pop up on mobile when editing the date
                                // @see https://github.com/Hacker0x01/react-datepicker/issues/1640
                                event.target.readOnly = true;

                                onFieldFocus(event);
                            }}
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
                            autoComplete="off"
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
                            onFocus={onFieldFocus}
                            onBlur={onFieldBlur}
                            name="quickfix"
                        />
                        Quickfix
                    </Form.Label>
                    {touched.quickfix && errors.quickfix && (
                        <Form.Error>{errors.quickfix}</Form.Error>
                    )}
                </Form.Group>
                <Form.Group horizontal>
                    <Form.Label>
                        <Form.Input
                            type="checkbox"
                            checked={values.waiting}
                            onChange={onFieldChange}
                            onFocus={onFieldFocus}
                            onBlur={onFieldBlur}
                            name="waiting"
                        />
                        Waiting
                    </Form.Label>
                    {touched.waiting && errors.waiting && (
                        <Form.Error>{errors.waiting}</Form.Error>
                    )}
                </Form.Group>
                <Form.Group horizontal>
                    <Form.Label>
                        <Form.Input
                            type="checkbox"
                            checked={values.evening}
                            onChange={onFieldChange}
                            onFocus={onFieldFocus}
                            onBlur={onFieldBlur}
                            name="evening"
                        />
                        Evening
                    </Form.Label>
                    {touched.evening && errors.evening && (
                        <Form.Error>{errors.evening}</Form.Error>
                    )}
                </Form.Group>
            </Form.Section>
            <Form.ActionButtons centered fixed>
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

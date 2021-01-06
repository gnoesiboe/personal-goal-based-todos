import React from 'react';
import { Role } from '../../model/role';
import { Goal } from '../../model/goal';
import GoalForm from '../goalForm/GoalForm';
import useHandleFormEvents from './hooks/useHandleFormEvents';

type Props = {
    role: Role;
    goal: Goal;
    onDone: () => void;
};

const EditGoal: React.FC<Props> = ({ role, goal, onDone }) => {
    const {
        onSubmit,
        values,
        errors,
        onFieldChange,
        touched,
        onFieldBlur,
        inputIsValid,
        disabled,
    } = useHandleFormEvents(role, goal, onDone);

    return (
        <GoalForm
            onSubmit={onSubmit}
            onFieldChange={onFieldChange}
            onFieldBlur={onFieldBlur}
            onCancelClick={() => onDone()}
            values={values}
            errors={errors}
            touched={touched}
            disabled={disabled}
            inputIsValid={inputIsValid}
        />
    );
};

export default EditGoal;

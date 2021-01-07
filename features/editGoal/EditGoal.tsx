import React from 'react';
import { Role } from '../../model/role';
import { Goal } from '../../model/goal';
import GoalForm from '../goalForm/GoalForm';
import useHandleFormEvents from './hooks/useHandleFormEvents';
import classNames from './editGoal.module.scss';

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
        onFieldKeyDown,
        touched,
        onFieldBlur,
        inputIsValid,
        disabled,
    } = useHandleFormEvents(role, goal, onDone);

    return (
        <div className={classNames.container}>
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
                onFieldKeyDown={onFieldKeyDown}
            />
        </div>
    );
};

export default EditGoal;

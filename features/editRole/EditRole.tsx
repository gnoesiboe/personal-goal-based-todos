import React from 'react';
import { Role } from '../../model/role';
import RoleForm from '../roleForm/RoleForm';
import useHandleFormEvents from './hooks/useHandleFormEvents';
import classNames from './editRole.module.scss';

type Props = {
    role: Role;
    onDone: () => void;
};

const EditRole: React.FC<Props> = ({ role, onDone }) => {
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
    } = useHandleFormEvents(role, onDone);

    return (
        <div className={classNames.container}>
            <RoleForm
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

export default EditRole;

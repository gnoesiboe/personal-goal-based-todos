import React from 'react';
import Button from '../../primitives/button/Button';
import { PlusIcon } from '@primer/octicons-react';
import useShowHide from '../../hooks/useShowHide';
import RoleForm from '../roleForm/RoleForm';
import useRefreshServerSideProps from '../../hooks/useRefetchServerSideProps';
import useHandleFormEvents from './hooks/ueHandleFormEvents';

const AddRole: React.FC = () => {
    const {
        visible: formVisible,
        show: showForm,
        hide: hideForm,
    } = useShowHide();

    const refreshServerSideProps = useRefreshServerSideProps();

    const onDone = () => {
        hideForm();
        refreshServerSideProps();
    };

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
    } = useHandleFormEvents(onDone);

    if (formVisible) {
        return (
            <RoleForm
                onSubmit={onSubmit}
                onFieldChange={onFieldChange}
                onFieldBlur={onFieldBlur}
                onCancelClick={() => hideForm()}
                values={values}
                errors={errors}
                touched={touched}
                disabled={disabled}
                inputIsValid={inputIsValid}
                onFieldKeyDown={onFieldKeyDown}
            />
        );
    }

    return (
        <Button icon={<PlusIcon />} style="primary" onClick={() => showForm()}>
            Add role
        </Button>
    );
};

export default AddRole;

import React from 'react';
import useShowHide from '../../hooks/useShowHide';
import { Role } from '../../model/role';
import Button from '../../primitives/button/Button';
import { PlusIcon } from '@primer/octicons-react';
import useHandleFormEvents from './hooks/useHandleFormEvents';
import usePersistNewGoal from './hooks/usePersistNewGoal';
import useRefreshServerSideProps from '../../hooks/useRefetchServerSideProps';
import useHideFormOnCancelClick from './hooks/useHideFormOnCancelClick';
import GoalForm from '../goalForm/GoalForm';

type Props = {
    role: Role;
};

const AddGoal: React.FC<Props> = ({ role }) => {
    const {
        visible: formVisible,
        show: showForm,
        hide: hideForm,
    } = useShowHide();

    const { onFormValid } = usePersistNewGoal();

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
    } = useHandleFormEvents(role, onFormValid, onDone);

    const onCancelClick = useHideFormOnCancelClick(hideForm);

    return (
        <>
            {formVisible ? (
                <GoalForm
                    onSubmit={onSubmit}
                    onFieldChange={onFieldChange}
                    onFieldBlur={onFieldBlur}
                    onCancelClick={onCancelClick}
                    values={values}
                    errors={errors}
                    touched={touched}
                    disabled={disabled}
                    inputIsValid={inputIsValid}
                    onFieldKeyDown={onFieldKeyDown}
                />
            ) : (
                <Button icon={<PlusIcon />} onClick={() => showForm()}>
                    add goal
                </Button>
            )}
        </>
    );
};

export default AddGoal;

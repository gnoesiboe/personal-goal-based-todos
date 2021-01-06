import React from 'react';
import useShowHide from '../../hooks/useShowHide';
import { Role } from '../../model/role';
import Button from '../../primitives/button/Button';
import { PlusIcon } from '@primer/octicons-react';
import useHandleFormEvents from './hooks/useHandleFormEvents';
import Form from './../../primitives/form/Form';
import usePersistNewGoal from './hooks/usePersistNewGoal';
import useRefreshServerSideProps from '../../hooks/useRefetchServerSideProps';

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
        touched,
        onFieldBlur,
        inputIsValid,
        disabled,
    } = useHandleFormEvents(role, onFormValid, onDone);

    return (
        <>
            {formVisible ? (
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
                        <Button
                            type="submit"
                            disabled={!inputIsValid || disabled}
                        >
                            Save
                        </Button>
                        <Button type="button" onClick={() => hideForm()}>
                            cancel
                        </Button>
                    </Form.ActionButtons>
                </Form.Form>
            ) : (
                <Button icon={<PlusIcon />} onClick={() => showForm()}>
                    add goal
                </Button>
            )}
        </>
    );
};

export default AddGoal;

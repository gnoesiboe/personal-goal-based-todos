import React from 'react';
import Button from '../../primitives/button/Button';
import { PlusIcon } from '@primer/octicons-react';
import useShowHide from '../../hooks/useShowHide';
import Modal from '../../primitives/modal/Modal';
import useShowModalWithKeyboardShortcut from './hooks/useShowModalWithKeyboardShortcut';
import TodoForm from '../todoForm/TodoForm';
import useHandleAddTodoFormEvents from './hooks/useHandleAddTodoFormEvents';

type Props = {
    date: Date;
};

const AddTodo: React.FC<Props> = ({ date }) => {
    const { visible, show: showForm, hide: hideForm } = useShowHide(false);

    useShowModalWithKeyboardShortcut(showForm);

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
        setFieldValue,
    } = useHandleAddTodoFormEvents(date, hideForm);

    if (visible) {
        return (
            <Modal.Container onRequestClose={() => hideForm()}>
                <Modal.Header title="Add todo" />
                <Modal.Content>
                    <TodoForm
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
                        setFieldValue={setFieldValue}
                    />
                </Modal.Content>
            </Modal.Container>
        );
    }

    return (
        <Button icon={<PlusIcon />} style="primary" onClick={() => showForm()}>
            Todo toevoegen
        </Button>
    );
};

export default AddTodo;

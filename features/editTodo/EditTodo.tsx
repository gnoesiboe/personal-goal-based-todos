import React, { MouseEventHandler } from 'react';
import useShowHide from '../../hooks/useShowHide';
import Modal from '../../primitives/modal/Modal';
import Island from '../../primitives/island/Island';
import Heading from '../../primitives/heading/Heading';
import TodoForm from '../todoForm/TodoForm';
import useHandleEditTodoFormEvents from './hooks/useHandleEditTodoFormEvents';
import { TodoListItem } from '../../model/todoListItem';
import useShowFormWithKeyboardShortcut from './hooks/useShowFormWithKeyboardShortcut';

type Props = {
    children: (onClick: MouseEventHandler) => JSX.Element;
    todo: TodoListItem;
    current: boolean;
};

const EditTodo: React.FC<Props> = ({ children, todo, current }) => {
    const { visible, show: showForm, hide: hideForm } = useShowHide(false);

    useShowFormWithKeyboardShortcut(showForm, current);

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
    } = useHandleEditTodoFormEvents(todo, hideForm);

    if (visible) {
        return (
            <Modal onRequestClose={() => hideForm()}>
                <Island ghost>
                    <Heading tag="h1">Edit todo</Heading>
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
                </Island>
            </Modal>
        );
    }

    return children(() => showForm());
};

export default EditTodo;

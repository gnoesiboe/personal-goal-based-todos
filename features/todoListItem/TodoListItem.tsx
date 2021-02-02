import React from 'react';
import { TodoListItem as TodoListItemModel } from '../../model/todoListItem';
import classNames from './todoListItem.module.scss';
import createClassName from 'classnames';
import CheckboxInput from './components/CheckboxInput';
import useToggleDoneStatus from './hooks/useToggleDoneStatus';
import ActionButtonList from './components/ActionButtonList';
import ActionButton from './components/ActionButton';
import { useTodoListItems } from '../../context/todos/TodoListItemsContext';
import CurrentContentContainer from './components/CurrentContentContainer';
import Description from './components/Description';
import EditTodo from '../editTodo/EditTodo';
import Summary from './components/Summary';
import RemoveTodo from '../removeTodo/RemoveTodo';
import Breadcrumb from './components/Breadcrumb';

export type OnContainerClickHandler = (id: string) => void;

type Props = {
    item: TodoListItemModel;
    current: boolean;
    onContainerClick: OnContainerClickHandler;
};

const TodoListItem: React.FC<Props> = ({ item, current, onContainerClick }) => {
    const { postponeTodoToTomorrow } = useTodoListItems();

    const containerClassName = createClassName(classNames.container, {
        [classNames.containerIsCurrent]: current,
        [classNames.containerIsDone]: item.done,
    });

    const { onInputChange } = useToggleDoneStatus(item, current);

    return (
        <div className={containerClassName}>
            <div
                className={classNames.header}
                onClick={() => onContainerClick(item.id)}
            >
                <CheckboxInput item={item} onChange={onInputChange} />
                <div className={classNames.content}>
                    <Breadcrumb item={item} />
                    <Summary item={item} />
                </div>
            </div>
            <CurrentContentContainer current={current}>
                {item.description && (
                    <Description>{item.description}</Description>
                )}
                <ActionButtonList>
                    <EditTodo todo={item}>
                        {(onClick) => (
                            <ActionButton onClick={onClick}>edit</ActionButton>
                        )}
                    </EditTodo>
                    <RemoveTodo todo={item}>
                        {(onClick) => (
                            <ActionButton onClick={onClick}>
                                delete
                            </ActionButton>
                        )}
                    </RemoveTodo>
                    <ActionButton
                        onClick={() => postponeTodoToTomorrow(item.id)}
                    >
                        tomorrow
                    </ActionButton>
                </ActionButtonList>
            </CurrentContentContainer>
        </div>
    );
};

export default TodoListItem;

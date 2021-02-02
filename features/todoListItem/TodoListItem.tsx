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

export type OnContainerClickHandler = (id: string) => void;

type Props = {
    item: TodoListItemModel;
    current: boolean;
    onContainerClick: OnContainerClickHandler;
};

const TodoListItem: React.FC<Props> = ({ item, current, onContainerClick }) => {
    const { removeTodo, postponeTodoToTomorrow } = useTodoListItems();

    const containerClassName = createClassName(classNames.container, {
        [classNames.containerIsCurrent]: current,
    });

    const { onInputChange } = useToggleDoneStatus(item, current);

    const hasBreadcrumb = !!item.roleTitle && !!item.goalTitle;

    return (
        <div className={containerClassName}>
            <div
                className={classNames.header}
                onClick={() => onContainerClick(item.id)}
            >
                <CheckboxInput
                    hasBreadcrumb={hasBreadcrumb}
                    checked={item.done}
                    onChange={onInputChange}
                />
                <div className={classNames.content}>
                    {item.roleTitle && item.goalTitle && (
                        <ul className={classNames.breadcrumb}>
                            <li title={item.roleTitle}>{item.roleTitle}</li>
                            <li title={item.goalTitle}>{item.goalTitle}</li>
                        </ul>
                    )}
                    <div className={classNames.summary}>{item.summary}</div>
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
                    <ActionButton onClick={() => removeTodo(item.id)}>
                        delete
                    </ActionButton>
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

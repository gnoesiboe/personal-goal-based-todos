import React, { Fragment } from 'react';
import {
    PriorityLevel,
    TodoListItem as TodoListItemModel,
} from '../../../model/todoListItem';
import { groupItemsByPriorityLevel } from '../utility/itemGroupingUtilities';
import TodoListItem from '../../todoListItem/TodoListItem';
import { useTodoListItems } from '../../../context/todos/TodoListItemsContext';
import PriorityLevelDescription from './PriorityLevelDescription';
import VerticalUnorderedList from '../../../primitives/verticalUnorderedList/VerticalUnorderedList';

type Props = {
    items: TodoListItemModel[];
    currentDate?: boolean;
};

const TodoList: React.FC<Props> = ({ items, currentDate = false }) => {
    const {
        currentTodoIndex,
        setCurrentTodo,
        resetCurrentTodoIndex,
    } = useTodoListItems();

    const itemsGrouped = groupItemsByPriorityLevel(items);

    const checkItemIsCurrent = (item: TodoListItemModel) => {
        if (!currentDate || currentTodoIndex === null) {
            return false;
        }

        return (
            items.findIndex((cursorItem) => cursorItem.id === item.id) ===
            currentTodoIndex
        );
    };

    const keys = Object.keys(itemsGrouped) as PriorityLevel[];

    return (
        <VerticalUnorderedList>
            {keys.map((priorityLevel) => (
                <Fragment key={priorityLevel}>
                    <PriorityLevelDescription level={priorityLevel} />
                    <VerticalUnorderedList>
                        {itemsGrouped[priorityLevel].map((item) => {
                            const current = checkItemIsCurrent(item);

                            const onClick = () => {
                                current
                                    ? resetCurrentTodoIndex()
                                    : setCurrentTodo(item.id);
                            };

                            return (
                                <TodoListItem
                                    key={item.id}
                                    item={item}
                                    current={current}
                                    onContainerClick={onClick}
                                />
                            );
                        })}
                    </VerticalUnorderedList>
                </Fragment>
            ))}
        </VerticalUnorderedList>
    );
};

export default TodoList;

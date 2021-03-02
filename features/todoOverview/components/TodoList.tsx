import React from 'react';
import classNames from '../todoOverview.module.scss';
import {
    PriorityLevel,
    TodoListItem as TodoListItemModel,
} from '../../../model/todoListItem';
import { groupItemsByPriorityLevel } from '../utility/itemGroupingUtilities';
import TodoListItem from '../../todoListItem/TodoListItem';
import { useTodoListItems } from '../../../context/todos/TodoListItemsContext';
import PriorityLevelDescription from './PriorityLevelDescription';

type Props = {
    items: TodoListItemModel[];
    currentDate: boolean;
    date: Date;
};

const TodoList: React.FC<Props> = ({ items, currentDate, date }) => {
    const { currentTodoIndex, setCurrentTodoIndex } = useTodoListItems();

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
        <ul className={classNames.todoList}>
            {keys.map((priorityLevel) => (
                <li key={priorityLevel}>
                    <PriorityLevelDescription level={priorityLevel} />
                    <ul>
                        {itemsGrouped[priorityLevel].map((item, index) => (
                            <li key={item.id}>
                                <TodoListItem
                                    item={item}
                                    current={checkItemIsCurrent(item)}
                                    onContainerClick={() =>
                                        setCurrentTodoIndex(index, date)
                                    }
                                />
                            </li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    );
};

export default TodoList;

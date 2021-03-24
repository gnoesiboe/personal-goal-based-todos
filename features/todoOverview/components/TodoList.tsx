import React, { Fragment } from 'react';
import {
    PriorityLevel,
    TodoListItem as TodoListItemModel,
} from '../../../model/todoListItem';
import { groupItemsByPriorityLevel } from '../utility/itemGroupingUtilities';
import TodoListItem from '../../todoListItem/TodoListItem';
import { useTodoListItems } from '../../../context/todos/TodoListItemsContext';
import PriorityLevelDescription from './PriorityLevelDescription';
import UnorderedList from '../../../primitives/unorderedList/UnorderedList';

type Props = {
    items: TodoListItemModel[];
    currentDate?: boolean;
};

const TodoList: React.FC<Props> = ({ items, currentDate = false }) => {
    const { currentTodoIndex, setCurrentTodo } = useTodoListItems();

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
        <UnorderedList direction="vertical">
            {keys.map((priorityLevel) => (
                <Fragment key={priorityLevel}>
                    <PriorityLevelDescription level={priorityLevel} />
                    <UnorderedList direction="vertical">
                        {itemsGrouped[priorityLevel].map((item) => (
                            <TodoListItem
                                key={item.id}
                                item={item}
                                current={checkItemIsCurrent(item)}
                                onContainerClick={() => setCurrentTodo(item.id)}
                            />
                        ))}
                    </UnorderedList>
                </Fragment>
            ))}
        </UnorderedList>
    );
};

export default TodoList;

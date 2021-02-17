import { ItemsState, TodoIndexCursor } from '../reducers/todoReducer';
import { TodoListItem } from '../../../model/todoListItem';
import { createDateKey } from '../../../utility/dateTimeUtilities';

export const resolveTodoFromItems = (
    items: ItemsState,
    id: string,
): TodoListItem | null => {
    if (!items) {
        return null;
    }

    for (const dateKey in items) {
        if (!items.hasOwnProperty(dateKey)) {
            continue;
        }

        const itemsForDate = items[dateKey];

        const item = itemsForDate.find((cursor) => cursor.id === id);

        if (item) {
            return item;
        }
    }

    return null;
};

export const resolveCurrentTodo = (
    items: ItemsState,
    currentDate: Date,
    currentTodoIndex: TodoIndexCursor,
): TodoListItem | null => {
    if (!items || currentTodoIndex === null) {
        return null;
    }

    const dateKey = createDateKey(currentDate);

    const itemsForCurrentDate = items[dateKey];

    if (!itemsForCurrentDate || itemsForCurrentDate.length === 0) {
        return null;
    }

    return itemsForCurrentDate[currentTodoIndex] || null;
};

import { createDateKey } from '../../../utility/dateTimeUtilities';
import { TodoListItem } from '../../../model/todoListItem';
import { CurrentTodoIndexState } from '../../../context/todos/hooks/useManageCurrentTodo';

export const resolveNextCurrentTodoIndex = (
    itemsPerDate: Record<string, TodoListItem[]>,
    currentDate: Date,
    currentTodoIndex: CurrentTodoIndexState,
): CurrentTodoIndexState => {
    const dateKey = createDateKey(currentDate);

    const todosForCurrentDate = itemsPerDate[dateKey] || [];

    if (todosForCurrentDate.length === 0) {
        return null;
    }

    const possibleNextIndex =
        currentTodoIndex === null ? 0 : currentTodoIndex + 1;

    return typeof todosForCurrentDate[possibleNextIndex] !== 'undefined'
        ? possibleNextIndex
        : 0;
};

export const resolvePreviousCurrentTodoIndex = (
    itemsPerDate: Record<string, TodoListItem[]>,
    currentDate: Date,
    currentTodoIndex: CurrentTodoIndexState,
): CurrentTodoIndexState => {
    const dateKey = createDateKey(currentDate);

    const todosForCurrentDate = itemsPerDate[dateKey] || [];

    if (todosForCurrentDate.length === 0) {
        return null;
    }

    if (currentTodoIndex === null) {
        return todosForCurrentDate.length - 1;
    }

    const possiblePreviousIndex = currentTodoIndex - 1;

    return possiblePreviousIndex >= 0
        ? possiblePreviousIndex
        : todosForCurrentDate.length - 1;
};

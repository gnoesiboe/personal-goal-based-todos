import { createDateKey } from './../../../utility/dateTimeUtilities';
import { TodoListItem } from '../../../model/todoListItem';

export const resolveNextCurrentTodoIndex = (
    itemsPerDate: Record<string, TodoListItem[]>,
    currentDate: Date,
    currentTodoIndex: number,
): number => {
    const possibleNextIndex = currentTodoIndex + 1;

    const dateKey = createDateKey(currentDate);

    const todosForCurrentDate = itemsPerDate[dateKey] || [];

    return typeof todosForCurrentDate[possibleNextIndex] !== 'undefined'
        ? possibleNextIndex
        : 0;
};

export const resolvePreviousCurrentTodoIndex = (
    itemsPerDate: Record<string, TodoListItem[]>,
    currentDate: Date,
    currentTodoIndex: number,
): number => {
    const possiblePreviousIndex = currentTodoIndex - 1;

    if (possiblePreviousIndex >= 0) {
        return possiblePreviousIndex;
    }

    const dateKey = createDateKey(currentDate);

    const todosForCurrentDate = itemsPerDate[dateKey] || [];

    return todosForCurrentDate.length - 1;
};

export const resolvePossibleSameTodoIndex = (
    itemsPerDate: Record<string, TodoListItem[]>,
    currentDate: Date,
    currentTodoIndex: number,
): number => {
    const dateKey = createDateKey(currentDate);

    const todosForCurrentDate = itemsPerDate[dateKey] || [];

    return typeof todosForCurrentDate[currentTodoIndex] !== 'undefined'
        ? currentTodoIndex
        : 0;
};

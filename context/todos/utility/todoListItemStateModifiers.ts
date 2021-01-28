import produce from 'immer';
import { TodoListItem } from '../../../model/todoListItem';

export const applyItemUpdate = (
    currentItems: TodoListItem[],
    id: string,
    updates: Partial<TodoListItem>,
): TodoListItem[] => {
    return produce<TodoListItem[]>(currentItems, (nextItems) => {
        const todoIndex = nextItems.findIndex(
            (cursorItem) => cursorItem.id === id,
        );

        if (todoIndex === -1) {
            return;
        }

        nextItems[todoIndex] = { ...nextItems[todoIndex], ...updates };
    });
};

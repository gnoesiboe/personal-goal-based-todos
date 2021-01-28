import { PriorityLevel, TodoListItem } from '../../../model/todoListItem';
import { groupItemsWithCallback } from '../../../utility/arrayUtilities';

export const groupItemsByPriorityLevel = (
    items: TodoListItem[],
): Record<PriorityLevel, TodoListItem[]> => {
    return groupItemsWithCallback<TodoListItem>(items, (item) => {
        if (item.roleRef) {
            return item.urgent
                ? PriorityLevel.UrgentAndImportant
                : PriorityLevel.NotUrgentAndImportant;
        } else {
            return item.urgent
                ? PriorityLevel.UrgentAndNotImportant
                : PriorityLevel.NotUrgentAndNotImportant;
        }
    });
};

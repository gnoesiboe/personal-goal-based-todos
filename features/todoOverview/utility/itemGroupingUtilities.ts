import { PriorityLevel, TodoListItem } from '../../../model/todoListItem';
import { groupItemsWithCallback } from '../../../utility/arrayUtilities';
import { determineUrgencyScore } from '../../../model/selector/todoListItemSelectors';

export const groupItemsByPriorityLevel = (
    items: TodoListItem[],
): Record<PriorityLevel, TodoListItem[]> => {
    return groupItemsWithCallback<TodoListItem, PriorityLevel>(
        items,
        (item) => {
            const urgencyScore = determineUrgencyScore(item);

            if (item.roleRef) {
                return urgencyScore > 0
                    ? PriorityLevel.UrgentAndImportant
                    : PriorityLevel.NotUrgentAndImportant;
            } else {
                return urgencyScore > 0
                    ? PriorityLevel.UrgentAndNotImportant
                    : PriorityLevel.NotUrgentAndNotImportant;
            }
        },
    );
};

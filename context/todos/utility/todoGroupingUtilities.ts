import { TodoListItem } from '../../../model/todoListItem';
import { ItemsState } from '../reducers/todoReducer';
import {
    createDateKey,
    createDateRange,
    parseFirebaseTimestamp,
} from '../../../utility/dateTimeUtilities';
import { groupItemsWithCallback } from '../../../utility/arrayUtilities';

export const groupTodosByDateKey = (
    items: TodoListItem[],
    firstVisibleDate: Date,
    numberOfDaysDisplayed: number,
): NonNullable<ItemsState> => {
    const dateRange = createDateRange(firstVisibleDate, numberOfDaysDisplayed);

    const groupedItems: NonNullable<ItemsState> = {};

    dateRange.forEach((cursorDate) => {
        const dateKey = createDateKey(cursorDate);

        groupedItems[dateKey] = [];
    });

    items.forEach((cursorItem) => {
        if (!cursorItem.date) {
            return;
        }

        const itemDateKey = createDateKey(
            parseFirebaseTimestamp(cursorItem.date),
        );

        if (groupedItems[itemDateKey] === undefined) {
            return;
        }

        groupedItems[itemDateKey].push(cursorItem);
    });

    return groupedItems;
};

export const createRoleKey = (item: TodoListItem): string =>
    item.roleTitle || 'Overige';

export const groupTodosByRole = (
    items: TodoListItem[],
): NonNullable<ItemsState> => {
    return groupItemsWithCallback<TodoListItem, string>(items, (item) =>
        createRoleKey(item),
    );
};

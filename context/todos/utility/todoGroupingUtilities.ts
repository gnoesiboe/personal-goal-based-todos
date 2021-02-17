import { TodoListItem } from '../../../model/todoListItem';
import { ItemsState } from '../reducers/todoReducer';
import {
    createDateKey,
    createDateRange,
    parseFirebaseTimestamp,
} from '../../../utility/dateTimeUtilities';

export const groupTodosByDateKey = (
    items: TodoListItem[],
    currentDate: Date,
    numberOfDaysDisplayed: number,
): NonNullable<ItemsState> => {
    const dateRange = createDateRange(currentDate, numberOfDaysDisplayed);

    const groupedItems: NonNullable<ItemsState> = {};

    dateRange.forEach((cursorDate) => {
        const dateKey = createDateKey(cursorDate);

        groupedItems[dateKey] = [];
    });

    items.forEach((cursorItem) => {
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

import {
    AddTodoAction,
    LoadIncomingTodoListItemsAction,
    RemoveTodoAction,
    UpdateTodoAction,
} from '../model/actionTypes';
import { State } from '../reducers/todoReducer';
import produce from 'immer';
import {
    checkIsSameDay,
    createDateKey,
    parseFirebaseTimestamp,
} from '../../../utility/dateTimeUtilities';
import { sortTodoListItemsByPriority } from '../../../model/selector/todoListItemSelectors';
import { TodoListItem } from '../../../model/todoListItem';
import { groupTodosByDateKey } from '../utility/todoGroupingUtilities';

export const applyAddTodoModifier = (
    currentState: State,
    action: AddTodoAction,
): State => {
    return produce<State>(currentState, (nextState) => {
        if (!nextState.items) {
            return;
        }

        const dateKey = createDateKey(parseFirebaseTimestamp(action.todo.date));

        if (nextState.items[dateKey] === undefined) {
            return;
        }

        nextState.items[dateKey].push(action.todo);

        nextState.items = sortTodoListItemsByPriority(nextState.items);
    });
};

export const applyRemoveCurrentTodoModifier = (currentState: State) => {
    return produce<State>(currentState, (nextState) => {
        if (!nextState.items || nextState.currentTodoIndex === null) {
            return;
        }

        const dateKey = createDateKey(nextState.currentDate.date);

        const itemsForCurrentDate = nextState.items[dateKey];

        if (itemsForCurrentDate[nextState.currentTodoIndex] === undefined) {
            return;
        }

        nextState.items[dateKey].splice(nextState.currentTodoIndex, 1);
        nextState.currentTodoIndex = null;

        nextState.items = sortTodoListItemsByPriority(nextState.items);
    });
};

export const applyRemoveTodoModifier = (
    currentState: State,
    action: RemoveTodoAction,
): State => {
    return produce<State>(currentState, (nextState) => {
        if (!nextState.items || nextState.currentTodoIndex === null) {
            return;
        }

        Object.keys(nextState.items).map((dateKey) => {
            // @ts-ignore → Somehow typescript does not know the date key exists
            const itemsForDate = nextState.items[dateKey];

            const indexToRemove = itemsForDate.findIndex(
                (cursor) => cursor.id === action.id,
            );

            if (indexToRemove === -1) {
                return;
            }

            // @ts-ignore → Somehow typescript does not know the date key exists
            nextState.items[dateKey].splice(indexToRemove, 1);
        });
    });
};

export const applyUpdateTodoModifier = (
    currentState: State,
    action: UpdateTodoAction,
) => {
    return produce<State>(currentState, (nextState) => {
        if (!nextState.items || nextState.currentTodoIndex === null) {
            return;
        }

        const dateKey = createDateKey(nextState.currentDate.date);

        const itemsForCurrentDate = nextState.items[dateKey];

        const indexToUpdate = itemsForCurrentDate.findIndex(
            (cursor) => cursor.id === action.id,
        );

        if (indexToUpdate === -1) {
            return;
        }

        const itemToUpdate = itemsForCurrentDate[indexToUpdate];

        const updatedItem: TodoListItem = {
            ...itemToUpdate,
            ...action.updates,
        };

        const existingDate = parseFirebaseTimestamp(itemToUpdate.date);
        const incomingDate = action.updates.date
            ? parseFirebaseTimestamp(action.updates.date)
            : null;

        if (incomingDate && !checkIsSameDay(existingDate, incomingDate)) {
            // remove from old item
            itemsForCurrentDate.splice(indexToUpdate, 1);

            const newDateKey = createDateKey(incomingDate);

            // add to new date, if in current item range
            if (nextState.items[newDateKey] !== undefined) {
                nextState.items[newDateKey].push(updatedItem);
            }
        } else {
            nextState.items[dateKey][indexToUpdate] = updatedItem;
        }

        nextState.items = sortTodoListItemsByPriority(nextState.items);
    });
};

export const applyLoadIncomingTodoListItemsModifier = (
    currentState: State,
    action: LoadIncomingTodoListItemsAction,
): State => {
    const itemsPerDate = groupTodosByDateKey(
        action.items,
        currentState.currentDate.date,
        currentState.numberOfDaysDisplayed,
    );

    const sortedItemsPerDate = sortTodoListItemsByPriority(itemsPerDate);

    return {
        ...currentState,
        items: sortedItemsPerDate,
        isFetching: false,
    };
};

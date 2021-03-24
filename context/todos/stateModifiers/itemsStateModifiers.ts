import {
    AddTodoAction,
    LoadIncomingTodoListItemsAction,
    RemoveTodoAction,
    UpdateTodoAction,
} from '../model/actionTypes';
import { State } from '../reducers/todoReducer';
import produce from 'immer';
import {
    checkDateIsBefore,
    checkDateIsWithinRange,
    checkIsSameDay,
    createDateKey,
    parseFirebaseTimestamp,
} from '../../../utility/dateTimeUtilities';
import { sortGroupedTodoListItemsByPriority } from '../../../model/selector/todoListItemSelectors';
import { TodoListItem } from '../../../model/todoListItem';
import {
    createRoleKey,
    groupTodosByDateKey,
    groupTodosByRole,
} from '../utility/todoGroupingUtilities';
import { resolveTodoFromItems } from '../resolver/todoResolver';
import { applyFilters } from '../utility/todoFilterUtilities';

export const applyAddTodoModifier = (
    currentState: State,
    action: AddTodoAction,
): State => {
    return produce<State>(currentState, (nextState) => {
        if (action.todo.date) {
            if (!nextState.items) {
                nextState.items = {};
            }

            const dateKey = createDateKey(
                parseFirebaseTimestamp(action.todo.date),
            );

            if (nextState.items[dateKey] === undefined) {
                return;
            }

            nextState.items[dateKey].push(action.todo);

            nextState.items = sortGroupedTodoListItemsByPriority(
                nextState.items,
            );
        } else {
            if (!nextState.backlogItems) {
                nextState.backlogItems = {};
            }

            if (
                nextState.backlogItems[createRoleKey(action.todo)] === undefined
            ) {
                nextState.backlogItems[createRoleKey(action.todo)] = [];
            }

            nextState.backlogItems[createRoleKey(action.todo)].push(
                action.todo,
            );

            nextState.backlogItems = sortGroupedTodoListItemsByPriority(
                nextState.backlogItems,
            );
        }
    });
};

export const applyRemoveCurrentTodoModifier = (currentState: State) => {
    return produce<State>(currentState, (nextState) => {
        if (!nextState.items || nextState.currentTodoIndex === null) {
            return;
        }

        const dateKey = createDateKey(nextState.dateCursor.currentDate);

        const itemsForCurrentDate = nextState.items[dateKey];

        if (itemsForCurrentDate[nextState.currentTodoIndex] === undefined) {
            return;
        }

        nextState.items[dateKey].splice(nextState.currentTodoIndex, 1);
        nextState.currentTodoIndex = null;

        nextState.items = sortGroupedTodoListItemsByPriority(nextState.items);
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
): State => {
    const plannedTodo =
        !!currentState.items &&
        !!resolveTodoFromItems(currentState.items, action.id);

    if (plannedTodo) {
        return applyUpdateTodoFromItemsModifier(currentState, action);
    }

    const backlogTodo =
        !!currentState.backlogItems &&
        !!resolveTodoFromItems(currentState.backlogItems, action.id);

    if (backlogTodo) {
        return applyUpdateTodoFromBacklogItemsModifier(currentState, action);
    }

    return currentState;
};

const applyUpdateTodoFromBacklogItemsModifier = (
    currentState: State,
    action: UpdateTodoAction,
): State => {
    return produce<State>(currentState, (nextState) => {
        if (!nextState.backlogItems) {
            throw new Error('Expecting there to exist items in state');
        }

        const roleKey = Object.keys(nextState.backlogItems).find(
            (cursorRoleKey) => {
                // @ts-ignore Don't know why Typescript thinks backlogItems might by null at this point :|
                return nextState.backlogItems[cursorRoleKey].some(
                    (cursorItem) => cursorItem.id === action.id,
                );
            },
        );

        if (!roleKey) {
            return;
        }

        const itemsForRole = nextState.backlogItems[roleKey];

        const indexToUpdate = itemsForRole.findIndex(
            (cursor) => cursor.id === action.id,
        );

        if (indexToUpdate === -1) {
            return;
        }

        const itemToUpdate = itemsForRole[indexToUpdate];

        const updatedItem: TodoListItem = {
            ...itemToUpdate,
            ...action.updates,
        };

        if (updatedItem.date) {
            // remove from backlog items
            itemsForRole.splice(indexToUpdate, 1);

            // add to regular items
            if (!nextState.items) {
                nextState.items = {};
            }

            const dateKey = createDateKey(
                parseFirebaseTimestamp(updatedItem.date),
            );

            if (!nextState.items[dateKey]) {
                nextState.items[dateKey] = [];
            }

            nextState.items[dateKey].push(updatedItem);

            nextState.items = sortGroupedTodoListItemsByPriority(
                nextState.items,
            );
        } else {
            const currentRole = updatedItem.roleTitle;
            const nextRole = itemToUpdate.roleTitle;

            if (currentRole !== nextRole) {
                // remove from old role items
                itemsForRole.splice(indexToUpdate, 1);

                // add updated item to new date key
                const newRoleKey = createRoleKey(itemToUpdate);

                if (!nextState.backlogItems[newRoleKey]) {
                    nextState.backlogItems[newRoleKey] = [];
                }

                nextState.backlogItems[newRoleKey].push(updatedItem);
            } else {
                itemsForRole[indexToUpdate] = updatedItem;
            }
        }

        nextState.backlogItems = sortGroupedTodoListItemsByPriority(
            nextState.backlogItems,
        );
    });
};

const applyUpdateTodoFromItemsModifier = (
    currentState: State,
    action: UpdateTodoAction,
): State => {
    return produce<State>(currentState, (nextState) => {
        if (!nextState.items) {
            throw new Error('Expecting there to exist items in state');
        }

        const dateKey = createDateKey(nextState.dateCursor.currentDate);

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

        const currentDate = itemToUpdate.date
            ? parseFirebaseTimestamp(itemToUpdate.date)
            : null;

        if (!currentDate) {
            throw new Error('Expecting current date todo to have a date set');
        }

        const newDate = updatedItem.date
            ? parseFirebaseTimestamp(updatedItem.date)
            : null;

        const dateHasChanged =
            !newDate || !checkIsSameDay(currentDate, newDate);

        if (dateHasChanged) {
            // remove from old item
            itemsForCurrentDate.splice(indexToUpdate, 1);

            if (newDate) {
                const newDateKey = createDateKey(newDate);

                // add to new date, if in current item range
                if (nextState.items[newDateKey] !== undefined) {
                    nextState.items[newDateKey].push(updatedItem);

                    // move the date cursor along with the item
                    nextState.dateCursor.currentDate = newDate;
                    nextState.dateCursor.direction = checkDateIsBefore(
                        newDate,
                        currentDate,
                    )
                        ? 'backwards'
                        : 'forwards';

                    if (
                        !checkDateIsWithinRange(
                            newDate,
                            nextState.dateCursor.firstVisibleDate,
                            nextState.numberOfDaysDisplayed,
                        )
                    ) {
                        nextState.dateCursor.firstVisibleDate = newDate;
                    }
                }
            } else {
                // add to backlog items

                if (!nextState.backlogItems) {
                    nextState.backlogItems = {};
                }

                const roleKey = createRoleKey(updatedItem);

                if (nextState.backlogItems[roleKey] === undefined) {
                    nextState.backlogItems[roleKey] = [];
                }

                nextState.backlogItems[roleKey].push(updatedItem);
            }
        } else {
            nextState.items[dateKey][indexToUpdate] = updatedItem;
        }

        nextState.items = sortGroupedTodoListItemsByPriority(nextState.items);
        nextState.filteredItems = applyFilters(
            nextState.items,
            nextState.appliedFilters,
        );

        // set current item index to updated item
        const newIndexOfUpdatedItem = nextState.items[
            createDateKey(nextState.dateCursor.currentDate)
        ].findIndex((cursorItem) => cursorItem.id === action.id);

        if (newIndexOfUpdatedItem !== -1) {
            nextState.currentTodoIndex = newIndexOfUpdatedItem;
        }
    });
};

export const applyLoadIncomingTodoListItemsModifier = (
    currentState: State,
    action: LoadIncomingTodoListItemsAction,
): State => {
    const sortedItemsPerDate = sortGroupedTodoListItemsByPriority(
        groupTodosByDateKey(
            action.items,
            currentState.dateCursor.firstVisibleDate,
            currentState.numberOfDaysDisplayed,
        ),
    );

    const sortedBacklogItemsPerRole = sortGroupedTodoListItemsByPriority(
        groupTodosByRole(action.backlogItems),
    );

    return {
        ...currentState,
        items: sortedItemsPerDate,
        filteredItems: applyFilters(
            sortedItemsPerDate,
            currentState.appliedFilters,
        ),
        backlogItems: sortedBacklogItemsPerRole,
        isFetching: false,
    };
};

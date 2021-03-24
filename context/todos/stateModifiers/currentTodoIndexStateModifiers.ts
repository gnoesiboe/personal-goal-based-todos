import { State } from '../reducers/todoReducer';
import {
    createDateKey,
    parseFirebaseTimestamp,
} from '../../../utility/dateTimeUtilities';
import { SelectTodoAction } from '../model/actionTypes';
import produce from 'immer';
import { TodoListItem } from '../../../model/todoListItem';

export const applyMoveToNextTodoModifier = (currentState: State): State => {
    const currentDateKey = createDateKey(currentState.dateCursor.currentDate);

    if (!currentState.filteredItems) {
        return currentState;
    }

    const todosForCurrentDate =
        currentState.filteredItems[currentDateKey] || [];

    if (todosForCurrentDate.length === 0) {
        return {
            ...currentState,
            currentTodoIndex: null,
        };
    }

    const nextIndex =
        currentState.currentTodoIndex !== null &&
        todosForCurrentDate[currentState.currentTodoIndex + 1] !== undefined
            ? currentState.currentTodoIndex + 1
            : 0;

    return {
        ...currentState,
        currentTodoIndex: nextIndex,
    };
};

export const applyMoveToPreviousTodoModifier = (currentState: State): State => {
    const currentDateKey = createDateKey(currentState.dateCursor.currentDate);

    if (!currentState.filteredItems) {
        return currentState;
    }

    const todosForCurrentDate =
        currentState.filteredItems[currentDateKey] || [];

    if (todosForCurrentDate.length === 0) {
        return {
            ...currentState,
            currentTodoIndex: null,
        };
    }

    const previousIndex =
        currentState.currentTodoIndex !== null &&
        currentState.currentTodoIndex - 1 >= 0
            ? currentState.currentTodoIndex - 1
            : todosForCurrentDate.length - 1;

    return {
        ...currentState,
        currentTodoIndex: previousIndex,
    };
};

export const applyClearCurrentTodoModifier = (currentState: State): State => ({
    ...currentState,
    currentTodoIndex: null,
});

export const applySelectTodoModifier = (
    currentState: State,
    action: SelectTodoAction,
): State => {
    return produce<State>(currentState, (nextState) => {
        if (!currentState.filteredItems) {
            return currentState;
        }

        let newCurrentDate: Date | null = null;
        let newCurrentIndex: number | null = null;

        Object.keys(currentState.filteredItems).forEach((cursorDateKey) => {
            const cursorItems: TodoListItem[] = currentState.filteredItems
                ? currentState.filteredItems[cursorDateKey]
                : [];

            const index = cursorItems.findIndex(
                (cursorItem) => cursorItem.id === action.id,
            );

            if (index !== -1) {
                const date = cursorItems[index].date;

                if (!date) {
                    throw new Error('Expecting item to have a date');
                }

                newCurrentDate = parseFirebaseTimestamp(date);
                newCurrentIndex = index;
            }
        });

        if (newCurrentIndex === null || !newCurrentDate) {
            return;
        }

        nextState.currentTodoIndex = newCurrentIndex;
        nextState.dateCursor.currentDate = newCurrentDate;
    });
};

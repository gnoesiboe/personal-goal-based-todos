import { State } from '../reducers/todoReducer';
import { createDateKey } from '../../../utility/dateTimeUtilities';
import { SelectTodoAction } from '../model/actionTypes';

export const applyMoveToNextTodoModifier = (currentState: State): State => {
    const currentDateKey = createDateKey(currentState.dateCursor.date);

    if (!currentState.items) {
        return currentState;
    }

    const todosForCurrentDate = currentState.items[currentDateKey] || [];

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
    const currentDateKey = createDateKey(currentState.dateCursor.date);

    if (!currentState.items) {
        return currentState;
    }

    const todosForCurrentDate = currentState.items[currentDateKey] || [];

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
    const currentDateKey = createDateKey(currentState.dateCursor.date);

    if (!currentState.items) {
        return currentState;
    }

    const todosForCurrentDate = currentState.items[currentDateKey] || [];

    if (todosForCurrentDate[action.index] === undefined) {
        return currentState;
    }

    return {
        ...currentState,
        currentTodoIndex: action.index,
    };
};

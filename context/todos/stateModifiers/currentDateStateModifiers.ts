import { DayNavigationDirection, State } from '../reducers/todoReducer';
import {
    addNumberOfDays,
    checkDateIsBefore,
    checkIsSameDay,
    createStartOfToday,
    subtractNumberOfDays,
} from '../../../utility/dateTimeUtilities';

export const applyMoveToPreviousDateModifier = (
    currentState: State,
): State => ({
    ...currentState,
    dateCursor: {
        date: subtractNumberOfDays(currentState.dateCursor.date, 1),
        direction: 'backwards',
    },
    currentTodoIndex: null,
    items: null,
    isFetching: false,
});

export const applyMoveToNextDateModifier = (currentState: State): State => ({
    ...currentState,
    dateCursor: {
        date: addNumberOfDays(currentState.dateCursor.date, 1),
        direction: 'forwards',
    },
    currentTodoIndex: null,
});

export const applyMoveToTodayModifier = (currentState: State): State => {
    const today = createStartOfToday();

    if (checkIsSameDay(currentState.dateCursor.date, today)) {
        return currentState;
    }

    const direction: DayNavigationDirection = checkDateIsBefore(
        currentState.dateCursor.date,
        today,
    )
        ? 'forwards'
        : 'backwards';

    return {
        ...currentState,
        dateCursor: {
            date: today,
            direction,
        },
        currentTodoIndex: null,
    };
};

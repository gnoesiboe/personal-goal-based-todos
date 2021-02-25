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
        currentDate: subtractNumberOfDays(
            currentState.dateCursor.currentDate,
            1,
        ),
        direction: 'backwards',
    },
    currentTodoIndex: null,
    items: null,
    isFetching: false,
});

export const applyMoveToNextDateModifier = (currentState: State): State => ({
    ...currentState,
    dateCursor: {
        currentDate: addNumberOfDays(currentState.dateCursor.currentDate, 1),
        direction: 'forwards',
    },
    currentTodoIndex: null,
});

export const applyMoveToTodayModifier = (currentState: State): State => {
    const today = createStartOfToday();

    if (checkIsSameDay(currentState.dateCursor.currentDate, today)) {
        return currentState;
    }

    const direction: DayNavigationDirection = checkDateIsBefore(
        currentState.dateCursor.currentDate,
        today,
    )
        ? 'forwards'
        : 'backwards';

    return {
        ...currentState,
        dateCursor: {
            currentDate: today,
            direction,
        },
        currentTodoIndex: null,
    };
};

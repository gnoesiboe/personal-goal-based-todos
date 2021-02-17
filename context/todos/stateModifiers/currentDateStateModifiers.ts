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
    currentDate: {
        date: subtractNumberOfDays(currentState.currentDate.date, 1),
        direction: 'backwards',
    },
    currentTodoIndex: null,
    items: null,
    isFetching: false,
});

export const applyMoveToNextDateModifier = (currentState: State): State => ({
    ...currentState,
    currentDate: {
        date: addNumberOfDays(currentState.currentDate.date, 1),
        direction: 'forwards',
    },
    currentTodoIndex: null,
});

export const applyMoveToTodayModifier = (currentState: State): State => {
    const today = createStartOfToday();

    if (checkIsSameDay(currentState.currentDate.date, today)) {
        return currentState;
    }

    const direction: DayNavigationDirection = checkDateIsBefore(
        currentState.currentDate.date,
        today,
    )
        ? 'forwards'
        : 'backwards';

    return {
        ...currentState,
        currentDate: {
            date: today,
            direction,
        },
        currentTodoIndex: null,
    };
};

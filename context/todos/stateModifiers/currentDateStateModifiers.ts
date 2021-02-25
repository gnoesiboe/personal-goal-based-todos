import { State } from '../reducers/todoReducer';
import {
    addNumberOfDays,
    checkDateIsBefore,
    checkDateIsWithinRange,
    checkIsSameDay,
    createStartOfToday,
    subtractNumberOfDays,
} from '../../../utility/dateTimeUtilities';
import produce from 'immer';
import { MoveToDateAction } from '../model/actionTypes';

export const applyMoveToPreviousDateModifier = (currentState: State): State => {
    return produce<State>(currentState, (nextState) => {
        const nextFirstVisibleDate = subtractNumberOfDays(
            currentState.dateCursor.firstVisibleDate,
            1,
        );

        nextState.dateCursor.firstVisibleDate = nextFirstVisibleDate;
        nextState.dateCursor.direction = 'backwards';

        const currentDateIsWithinNewDateRange = checkDateIsWithinRange(
            nextState.dateCursor.currentDate,
            nextFirstVisibleDate,
            nextState.numberOfDaysDisplayed,
        );

        if (!currentDateIsWithinNewDateRange) {
            nextState.dateCursor.currentDate = nextFirstVisibleDate;
            nextState.currentTodoIndex = null;
        }
    });
};

export const applyMoveToNextDateModifier = (currentState: State): State => {
    return produce<State>(currentState, (nextState) => {
        const previousVisibleDate = addNumberOfDays(
            currentState.dateCursor.firstVisibleDate,
            1,
        );

        nextState.dateCursor.firstVisibleDate = previousVisibleDate;
        nextState.dateCursor.direction = 'forwards';

        const currentDateIsWithinNewDateRange = checkDateIsWithinRange(
            nextState.dateCursor.currentDate,
            previousVisibleDate,
            nextState.numberOfDaysDisplayed,
        );

        if (!currentDateIsWithinNewDateRange) {
            nextState.dateCursor.currentDate = previousVisibleDate;
            nextState.currentTodoIndex = null;
        }
    });
};

export const applyMoveToDateModifier = (
    currentState: State,
    action: MoveToDateAction,
): State => {
    if (checkIsSameDay(currentState.dateCursor.currentDate, action.date)) {
        return currentState;
    }

    return produce<State>(currentState, (nextState) => {
        const nextCurentDate = action.date;

        nextState.dateCursor.currentDate = nextCurentDate;
        nextState.dateCursor.direction = checkDateIsBefore(
            currentState.dateCursor.currentDate,
            nextCurentDate,
        )
            ? 'forwards'
            : 'backwards';

        const currentDateIsWithinNewDateRange = checkDateIsWithinRange(
            nextCurentDate,
            nextState.dateCursor.firstVisibleDate,
            nextState.numberOfDaysDisplayed,
        );

        if (!currentDateIsWithinNewDateRange) {
            nextState.dateCursor.firstVisibleDate = nextCurentDate;
        }

        nextState.currentTodoIndex = null;
    });
};

export const applyMoveToTodayModifier = (currentState: State): State => {
    const today = createStartOfToday();

    if (checkIsSameDay(currentState.dateCursor.firstVisibleDate, today)) {
        return currentState;
    }

    return produce<State>(currentState, (nextState) => {
        nextState.dateCursor.direction = checkDateIsBefore(
            currentState.dateCursor.firstVisibleDate,
            today,
        )
            ? 'forwards'
            : 'backwards';
        nextState.dateCursor.firstVisibleDate = today;

        const currentDateIsWithinNewDateRange = checkDateIsWithinRange(
            nextState.dateCursor.currentDate,
            today,
            nextState.numberOfDaysDisplayed,
        );

        if (!currentDateIsWithinNewDateRange) {
            nextState.dateCursor.currentDate = today;
            nextState.currentTodoIndex = null;
        }
    });
};

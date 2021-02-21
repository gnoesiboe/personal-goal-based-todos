import { TodoListItem } from '../todoListItem';
import {
    checkDayIsInThePast,
    checkIsToday,
    checkIsTomorrow,
    parseFirebaseTimestamp,
} from '../../utility/dateTimeUtilities';
import { ItemsState } from '../../context/todos/reducers/todoReducer';
import produce from 'immer';

export enum UrgencyScore {
    ExtremelyUrgent = 3,
    Urgent = 2,
    MildlyUrgent = 1,
    NotUrgent = 0,
}

export const determineUrgencyScore = (item: TodoListItem): UrgencyScore => {
    if (!item.deadline) {
        return UrgencyScore.NotUrgent;
    }

    const deadline = parseFirebaseTimestamp(item.deadline);

    if (checkDayIsInThePast(deadline) || checkIsToday(deadline)) {
        return UrgencyScore.ExtremelyUrgent;
    }

    if (checkIsTomorrow(deadline)) {
        return UrgencyScore.Urgent;
    }

    return UrgencyScore.MildlyUrgent;
};

const determineDeadlineSortingAdjustment = (item: TodoListItem): number => {
    if (!item.deadline) {
        return 0;
    }

    const deadline = parseFirebaseTimestamp(item.deadline);

    return deadline.getTime() / 10000000000000;
};

const calculatePriorityScore = (item: TodoListItem): number => {
    const urgencyScore = determineUrgencyScore(item);

    const deadlineAdjustment = determineDeadlineSortingAdjustment(item);

    return (
        (item.goalRef ? 10 + urgencyScore : urgencyScore) - deadlineAdjustment
    );
};

export const sortTodoListItemsByPriority = (
    items: NonNullable<ItemsState>,
): NonNullable<ItemsState> => {
    return produce<NonNullable<ItemsState>>(items, (nextItems) => {
        for (const dateKey in nextItems) {
            if (!nextItems.hasOwnProperty(dateKey)) {
                continue;
            }

            nextItems[dateKey].sort((first, second) => {
                const firstScore = calculatePriorityScore(first);
                const secondScore = calculatePriorityScore(second);

                if (firstScore === secondScore) {
                    return 0;
                }

                return firstScore > secondScore ? -1 : 1;
            });
        }
    });
};

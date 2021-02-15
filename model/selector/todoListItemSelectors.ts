import { TodoListItem } from '../todoListItem';
import {
    checkDayIsInThePast,
    checkIsToday,
    checkIsTomorrow,
    parseFirebaseTimestamp,
} from '../../utility/dateTimeUtilities';

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

const calculatePriorityScore = (item: TodoListItem): number => {
    const urgencyScore = determineUrgencyScore(item);

    return item.goalRef ? 10 + urgencyScore : urgencyScore;
};

export const sortTodoListItemsByPriority = (items: TodoListItem[]) => {
    items.sort((first, second) => {
        const firstScore = calculatePriorityScore(first);
        const secondScore = calculatePriorityScore(second);

        if (firstScore === secondScore) {
            return 0;
        }

        return firstScore > secondScore ? -1 : 1;
    });
};

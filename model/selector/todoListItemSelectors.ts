import { TodoListItem } from '../todoListItem';
import {
    checkIsToday,
    checkIsTomorrow,
    parseFirebaseTimestamp,
} from '../../utility/dateTimeUtilities';

export const determineUrgencyScore = (item: TodoListItem): number => {
    if (!item.deadline) {
        return 0;
    }

    const deadline = parseFirebaseTimestamp(item.deadline);

    if (checkIsToday(deadline)) {
        return 3;
    }

    if (checkIsTomorrow(deadline)) {
        return 2;
    }

    return 1;
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

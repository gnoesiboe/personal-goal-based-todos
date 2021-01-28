import { TodoListItem } from '../todoListItem';

export const calculatePriorityScore = (item: TodoListItem): number => {
    if (!!item.goalRef && item.urgent) {
        return 4;
    }

    if (!!item.goalRef && !item.urgent) {
        return 3;
    }

    if (!item.goalRef && item.urgent) {
        return 2;
    }

    return 1;
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

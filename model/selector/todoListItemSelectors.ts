import { TodoListItem } from './../todoListItem.d';

export const sortTodoListItemsByPriority = (items: TodoListItem[]) => {
    items.sort((first, second) => {
        const firstScore = (first.important ? 10 : 0) + (first.urgent ? 1 : 0);
        const secondScore =
            (second.important ? 10 : 0) + (second.urgent ? 1 : 0);

        if (firstScore === secondScore) {
            return 0;
        }

        return firstScore > secondScore ? 1 : 0;
    });
};

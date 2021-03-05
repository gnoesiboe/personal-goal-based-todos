import { TodoListItemFirebaseData } from '../model/todoListItem';

export const normalizeTodoListItemFirebaseData = (
    partialData: Partial<TodoListItemFirebaseData>,
): TodoListItemFirebaseData => {
    return {
        date: null,
        summary: '',
        deadline: null,
        done: false,
        important: false,
        userUid: '',
        goalRef: null,
        goalTitle: null,
        roleRef: null,
        roleTitle: null,
        description: null,
        quickfix: false,
        ...partialData,
    };
};

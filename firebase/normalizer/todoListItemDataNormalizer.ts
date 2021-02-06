import { createFirestoreTimestampFromDate } from '../../utility/dateTimeUtilities';
import { TodoListItemFirebaseData } from '../model/todoListItem';

export const normalizeTodoListItemFirebaseData = (
    partialData: Partial<TodoListItemFirebaseData>,
): TodoListItemFirebaseData => {
    return {
        date: createFirestoreTimestampFromDate(new Date()),
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
        ...partialData,
    };
};

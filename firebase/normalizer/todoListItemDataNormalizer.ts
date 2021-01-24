import { createFirestoreTimestampFromDate } from './../../utility/dateTimeUtilities';
import { TodoListItemFirebaseData } from '../model/todoListItem';

export const normalizeTodoListItemFirebaseData = (
    partialData: Partial<TodoListItemFirebaseData>,
): TodoListItemFirebaseData => {
    return {
        date: createFirestoreTimestampFromDate(new Date()),
        summary: '',
        done: false,
        urgent: false,
        important: false,
        userUid: '',
        goalRef: null,
        goalTitle: null,
        roleRef: null,
        roleTitle: null,
        ...partialData,
    };
};

import { normalizeTodoListItemFirebaseData } from '../normalizer/todoListItemDataNormalizer';
import { TodoListItem } from '../../model/todoListItem';
import firebase from 'firebase/app';
import { TodoListItemFirebaseData } from '../model/todoListItem';

// @see https://stackoverflow.com/questions/46568850/what-is-firebase-firestore-reference-data-type-good-for

const firebaseToApplicationTodoListItemConverter: firebase.firestore.FirestoreDataConverter<TodoListItem> = {
    toFirestore(todo: TodoListItem): TodoListItemFirebaseData {
        const { id, ...otherProps } = todo;

        return otherProps as TodoListItemFirebaseData;
    },
    fromFirestore(snapshot, options) {
        const data = normalizeTodoListItemFirebaseData(snapshot.data(options));

        return {
            id: snapshot.id,
            ...data,
            quickfix: !!data.quickfix,
            waiting: !!data.waiting,
            evening: !!data.evening,
        };
    },
};

export default firebaseToApplicationTodoListItemConverter;

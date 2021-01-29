import { createEndOfDay } from './../utility/dateTimeUtilities';
import { TodoListItem } from '../model/todoListItem';
import firebase from 'firebase/app';
import firebaseToApplicationTodoListItemConverter from '../firebase/converter/toApplicationTodoListItemConverter';
import { addNumberOfDays } from '../utility/dateTimeUtilities';

const todosCollectionName = 'todos';

export const fetchAllForUserForUpcomingDates = async (
    currentDate: Date,
    noOfDaysAfter: number,
    userUid: string,
): Promise<TodoListItem[]> => {
    const until = createEndOfDay(addNumberOfDays(currentDate, noOfDaysAfter));

    const snapshot = await firebase
        .firestore()
        .collection(todosCollectionName)
        .withConverter(firebaseToApplicationTodoListItemConverter)
        .where('userUid', '==', userUid)
        .where('date', '>=', currentDate)
        .where('date', '<=', until)
        .orderBy('date', 'asc')
        .get();

    return snapshot.docs.map((doc) => doc.data());
};

export const removeTodoFromServer = async (id: string): Promise<boolean> => {
    try {
        await firebase
            .firestore()
            .collection(todosCollectionName)
            .doc(id)
            .delete();

        return true;
    } catch (error) {
        console.error('Could not persist new todo', error);

        return false;
    }
};

export const persistNewTodo = async (item: TodoListItem): Promise<boolean> => {
    try {
        await firebase
            .firestore()
            .collection(todosCollectionName)
            .withConverter(firebaseToApplicationTodoListItemConverter)
            .add(item);

        return true;
    } catch (error) {
        console.error('Could not persist new todo', error);

        return false;
    }
};

export const persistTodoUpdate = async (
    updatedItem: TodoListItem,
): Promise<boolean> => {
    try {
        await firebase
            .firestore()
            .collection(todosCollectionName)
            .withConverter(firebaseToApplicationTodoListItemConverter)
            .doc(updatedItem.id)
            .set(updatedItem);

        return true;
    } catch (error) {
        console.error('Could not persist updates to todo', error);

        return false;
    }
};

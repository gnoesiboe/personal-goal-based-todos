import {
    createEndOfDay,
    createFirestoreTimestampFromDate,
    createStartOfToday,
} from '../utility/dateTimeUtilities';
import { TodoListItem } from '../model/todoListItem';
import firebase from 'firebase/app';
import firebaseToApplicationTodoListItemConverter from '../firebase/converter/toApplicationTodoListItemConverter';
import { addNumberOfDays } from '../utility/dateTimeUtilities';
import { GoalDocumentData } from '../firebase/model/roleDocumentData';
import {
    decrementCountForGoal,
    incrementCountForGoal,
} from './counterRepository';

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
        .where('date', '>=', createFirestoreTimestampFromDate(currentDate))
        .where('date', '<=', createFirestoreTimestampFromDate(until))
        .orderBy('date', 'asc')
        .get();

    return snapshot.docs.map((doc) => doc.data());
};

export const fetchAllForUserWithoutDate = async (userUid: string) => {
    const snapshot = await firebase
        .firestore()
        .collection(todosCollectionName)
        .withConverter(firebaseToApplicationTodoListItemConverter)
        .where('userUid', '==', userUid)
        .where('date', '==', null)
        .get();

    return snapshot.docs.map((doc) => doc.data());
};

export const fetchAllForUserNotDoneInPast = async (
    userUid: string,
): Promise<TodoListItem[]> => {
    const startOfToday = createStartOfToday();

    const snapshot = await firebase
        .firestore()
        .collection(todosCollectionName)
        .withConverter(firebaseToApplicationTodoListItemConverter)
        .where('userUid', '==', userUid)
        .where('date', '<', createFirestoreTimestampFromDate(startOfToday))
        .where('done', '==', false)
        .get();

    return snapshot.docs.map((doc) => doc.data());
};

export const fetchCountForUserWithGoal = async (
    userUid: string,
    goalRef: firebase.firestore.DocumentReference<GoalDocumentData>,
): Promise<number> => {
    const snapshot = await firebase
        .firestore()
        .collection(todosCollectionName)
        .where('userUid', '==', userUid)
        .where('goalRef', '==', goalRef)
        .get();

    // @todo might possible not work or will be too expensive ($) for large collections?!
    return snapshot.size;
};

export const removeTodoFromServer = async (id: string): Promise<boolean> => {
    try {
        const item = await fetchOneWithId(id);

        if (!item) {
            console.error('Could not resolve item with id: ', id);

            return false;
        }

        await firebase
            .firestore()
            .collection(todosCollectionName)
            .doc(id)
            .delete();

        if (item.goalRef) {
            // update goal counter
            await decrementCountForGoal(item.userUid, item.goalRef);
        }

        return true;
    } catch (error) {
        console.error('Could not remove todo', error);

        return false;
    }
};

export const persistNewTodo = async (item: TodoListItem): Promise<boolean> => {
    // @todo add to transaction or batch to ensure that, if addition fails?!

    try {
        if (item.goalRef) {
            // update goal counter
            await incrementCountForGoal(item.userUid, item.goalRef);
        }

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

export const fetchOneWithId = async (
    id: string,
): Promise<TodoListItem | null> => {
    const snapshot = await firebase
        .firestore()
        .collection(todosCollectionName)
        .withConverter(firebaseToApplicationTodoListItemConverter)
        .doc(id)
        .get();

    const todoListItem = snapshot.exists ? snapshot.data() : null;

    return todoListItem || null;
};

export const persistTodoUpdate = async (
    updatedItem: TodoListItem,
): Promise<boolean> => {
    try {
        const previousState = await fetchOneWithId(updatedItem.id);

        if (!previousState) {
            return false;
        }

        await firebase
            .firestore()
            .collection(todosCollectionName)
            .withConverter(firebaseToApplicationTodoListItemConverter)
            .doc(updatedItem.id)
            .set(updatedItem);

        // update goal counters
        const previousGoalId = previousState.goalRef?.id;
        const currentGoalId = updatedItem.goalRef?.id;

        if (previousGoalId !== currentGoalId) {
            if (previousState.goalRef) {
                await decrementCountForGoal(
                    updatedItem.userUid,
                    previousState.goalRef,
                );
            }

            if (updatedItem.goalRef) {
                await incrementCountForGoal(
                    updatedItem.userUid,
                    updatedItem.goalRef,
                );
            }
        }

        return true;
    } catch (error) {
        console.error('Could not persist updates to todo', error);

        return false;
    }
};

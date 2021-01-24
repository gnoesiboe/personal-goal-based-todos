import {
    GoalDocumentData,
    RoleDocumentData,
} from './../firebase/model/roleDocumentData.d';
import {
    createEndOfDay,
    createFirestoreTimestampFromDate,
} from './../utility/dateTimeUtilities';
import { TodoListItem } from '../model/todoListItem';
import firebase from 'firebase/app';
import firebaseToApplicationTodoListItemConverter from '../firebase/converter/toApplicationTodoListItemConverter';
import { generateId } from '../utility/idGenerator';
import { addNumberOfDays } from '../utility/dateTimeUtilities';
import {
    roleCollectionName,
    goalsSubCollectionName,
    fetchRole,
    fetchGoal,
} from './rolesRepository';
import useFetchRoleAndGoal from '../features/todoListItem/useFetchRoleAndGoal';

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

export const persistNewTodo = async (
    summary: string,
    description: string | null,
    roleUid: string | null,
    goalUid: string | null,
    date: Date,
    userUid: string,
): Promise<boolean> => {
    try {
        let role = null;

        if (roleUid) {
            role = await fetchRole(roleUid);
        }

        let goal = null;

        if (goalUid && role) {
            goal = await fetchGoal(role.uid, goalUid);
        }

        const todoListItem: TodoListItem = {
            id: generateId(),
            date: createFirestoreTimestampFromDate(date),
            summary,
            description,
            done: false,
            urgent: false,
            important: false,
            userUid,
            goalRef:
                role && goal
                    ? (firebase
                          .firestore()
                          .doc(
                              `${roleCollectionName}/${role.uid}/${goalsSubCollectionName}/${goal.uid}`,
                          ) as firebase.firestore.DocumentReference<GoalDocumentData>)
                    : null,
            goalTitle: goal?.title || null,
            roleRef: role
                ? (firebase
                      .firestore()
                      .doc(
                          `${roleCollectionName}/${role.uid}`,
                      ) as firebase.firestore.DocumentReference<RoleDocumentData>)
                : null,
            roleTitle: role?.title || null,
        };

        await firebase
            .firestore()
            .collection(todosCollectionName)
            .withConverter(firebaseToApplicationTodoListItemConverter)
            .add(todoListItem);

        return true;
    } catch (error) {
        console.error('Could not persist new todo', error);

        return false;
    }
};

import {
    GoalDocumentData,
    RoleDocumentData,
} from '../../firebase/model/roleDocumentData';
import {
    fetchGoal,
    goalsSubCollectionName,
} from '../../repository/rolesRepository';
import { User } from '../user';
import { FormValues } from '../../features/todoForm/TodoForm';
import { TodoListItem } from '../todoListItem';
import {
    fetchRole,
    roleCollectionName,
} from '../../repository/rolesRepository';
import { generateId, splitComposedKey } from '../../utility/idUtilities';
import { createFirestoreTimestampFromDate } from '../../utility/dateTimeUtilities';
import firebase from 'firebase/app';

export const createTodoListItemFromFormValuesForUserAndDate = async (
    values: FormValues,
    user: User,
    date: Date,
): Promise<TodoListItem> => {
    const [roleUid, goalUid] = splitComposedKey(values.roleWithGoal);

    let role = null;

    if (roleUid) {
        role = await fetchRole(roleUid);
    }

    let goal = null;

    if (goalUid && role) {
        goal = await fetchGoal(role.uid, goalUid);
    }

    let deadline: firebase.firestore.Timestamp | null = null;

    if (values.deadline) {
        deadline = createFirestoreTimestampFromDate(values.deadline);
    }

    return {
        id: generateId(),
        date: createFirestoreTimestampFromDate(date),
        summary: values.summary,
        deadline,
        description: values.description,
        done: false,
        urgent: values.urgent,
        userUid: user.uid,
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
};

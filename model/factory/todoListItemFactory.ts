import {
    GoalDocumentData,
    RoleDocumentData,
} from './../../firebase/model/roleDocumentData.d';
import {
    fetchGoal,
    goalsSubCollectionName,
} from './../../repository/rolesRepository';
import { User } from './../user.d';
import { FormValues } from '../../features/todoForm/TodoForm';
import { TodoListItem } from '../todoListItem';
import {
    fetchRole,
    roleCollectionName,
} from '../../repository/rolesRepository';
import { generateId } from '../../utility/idGenerator';
import { createFirestoreTimestampFromDate } from '../../utility/dateTimeUtilities';
import firebase from 'firebase/app';

export const createTodoListItemFromFormValuesForUserAndDate = async (
    values: FormValues,
    user: User,
    date: Date,
): Promise<TodoListItem> => {
    const [roleUid, goalUid] = values.roleWithGoal.split(',');

    let role = null;

    if (roleUid) {
        role = await fetchRole(roleUid);
    }

    let goal = null;

    if (goalUid && role) {
        goal = await fetchGoal(role.uid, goalUid);
    }

    return {
        id: generateId(),
        date: createFirestoreTimestampFromDate(date),
        summary: values.summary,
        description: values.description,
        done: false,
        urgent: false,
        important: false,
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

import { parseTimestamp } from './../../utility/dateTimeUtilities';
import { goalsSubCollectionName } from '../../repository/rolesRepository';
import { TodoListItemWithGoalAndRole } from '../../model/todoListItem';
import firebase from 'firebase';
import { roleCollectionName } from '../../repository/rolesRepository';
import { TodoListItemFirebaseData } from '../model/todoListItem';
import { GoalDocumentData, RoleDocumentData } from '../model/roleDocumentData';

// @see https://stackoverflow.com/questions/46568850/what-is-firebase-firestore-reference-data-type-good-for

const firebaseToApplicationTodoListItemConverter: firebase.firestore.FirestoreDataConverter<TodoListItemWithGoalAndRole> = {
    toFirestore(todo: TodoListItemWithGoalAndRole): TodoListItemFirebaseData {
        return {
            date: todo.date.getTime(),
            summary: todo.summary,
            done: todo.done,
            urgent: todo.urgent,
            important: todo.important,
            userUid: todo.userUid,
            goalRef:
                todo.role && todo.goal
                    ? (firebase
                          .firestore()
                          .doc(
                              `/${roleCollectionName}/${todo.role.uid}/${goalsSubCollectionName}/${todo.goal.uid}`,
                          ) as firebase.firestore.DocumentReference<GoalDocumentData>)
                    : null,
            roleRef: todo.role
                ? (firebase
                      .firestore()
                      .doc(
                          `/${roleCollectionName}/${todo.role.uid}`,
                      ) as firebase.firestore.DocumentReference<RoleDocumentData>)
                : null,
        };
    },
    fromFirestore(snapshot, options) {
        const data = snapshot.data(options) as TodoListItemFirebaseData;

        return {
            id: snapshot.id,
            date: parseTimestamp(data.date),
            summary: data.summary,
            done: data.done,
            urgent: data.urgent,
            important: data.important,
            userUid: data.userUid,
            goal: null,
            role: null,
        };
    },
};

export default firebaseToApplicationTodoListItemConverter;

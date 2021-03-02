import { useLoggedInUser } from '../../../context/authentication/AuthenticationContext';
import useFormState, {
    FormErrors,
    InputValidator,
    OnFormValidHandler,
} from '../../../hooks/useFormState';
import { FormValues } from '../../todoForm/TodoForm';
import { TodoListItem } from '../../../model/todoListItem';
import {
    generateComposedKey,
    splitComposedKey,
} from '../../../utility/idUtilities';
import { useTodoListItems } from '../../../context/todos/TodoListItemsContext';
import {
    fetchGoal,
    fetchRole,
    goalsSubCollectionName,
    roleCollectionName,
} from '../../../repository/rolesRepository';
import firebase from 'firebase/app';
import {
    GoalDocumentData,
    RoleDocumentData,
} from '../../../firebase/model/roleDocumentData';
import { useNotifications } from '../../../context/notification/NotificationContext';
import { NotificationType } from '../../../model/notification';
import { Role } from '../../../model/role';
import { Goal } from '../../../model/goal';
import {
    createFirestoreTimestampFromDate,
    parseFirebaseTimestamp,
} from '../../../utility/dateTimeUtilities';

export default function useHandleEditTodoFormEvents(
    todo: TodoListItem,
    onDone: () => void,
) {
    const { updateTodo } = useTodoListItems();

    const user = useLoggedInUser();

    const { notify } = useNotifications();

    const validateInput: InputValidator<FormValues> = (values) => {
        const newErrors: FormErrors<FormValues> = {};

        if (!values.summary) {
            newErrors.summary = 'Required';
        }

        if (!values.date) {
            newErrors.date = 'Required';
        }

        return newErrors;
    };

    const onFormValid: OnFormValidHandler<FormValues> = async (values) => {
        if (!user) {
            throw new Error('Expecting user to be available at this point');
        }

        let role: Role | null = null;
        let goal: Goal | null = null;

        if (values.roleWithGoal) {
            const [roleUid, goalUid] = splitComposedKey(values.roleWithGoal);

            if (roleUid) {
                role = (await fetchRole(roleUid)) || null;
            }

            if (goalUid && role) {
                goal = (await fetchGoal(role.uid, goalUid)) || null;
            }
        }

        let deadline: firebase.firestore.Timestamp | null = null;

        if (values.deadline) {
            deadline = createFirestoreTimestampFromDate(values.deadline);
        }

        const date = createFirestoreTimestampFromDate(values.date);

        const updates: Partial<TodoListItem> = {
            summary: values.summary,
            description: values.description,
            deadline,
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
            date,
            quickfix: values.quickfix,
        };

        const success = await updateTodo(todo.id, updates);

        if (success) {
            onDone();
        } else {
            notify(
                'Oeps!',
                'Er is iets foutgegaan bij het opslaan van de wijzigingen. Probeer het later nog eens!',
                NotificationType.Error,
            );
        }

        return false;
    };

    return useFormState(
        [
            'summary',
            'description',
            'roleWithGoal',
            'deadline',
            'date',
            'quickfix',
        ],
        validateInput,
        onFormValid,
        {
            summary: todo.summary,
            description: todo.description || '',
            roleWithGoal:
                todo.roleRef && todo.goalRef
                    ? generateComposedKey(todo.roleRef.id, todo.goalRef.id)
                    : undefined,
            deadline: todo.deadline
                ? parseFirebaseTimestamp(todo.deadline)
                : null,
            date: parseFirebaseTimestamp(todo.date),
            quickfix: !!todo.quickfix,
        },
    );
}

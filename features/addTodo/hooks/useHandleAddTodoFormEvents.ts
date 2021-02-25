import { createTodoListItemFromFormValuesForUserAndDate } from '../../../model/factory/todoListItemFactory';
import { useTodoListItems } from '../../../context/todos/TodoListItemsContext';
import { useNotifications } from '../../../context/notification/NotificationContext';
import { useLoggedInUser } from '../../../context/authentication/AuthenticationContext';
import useFormState, {
    FormErrors,
    InputValidator,
    OnFormValidHandler,
} from '../../../hooks/useFormState';
import { NotificationType } from '../../../model/notification';
import { FormValues } from '../../todoForm/TodoForm';

export default function useHandleAddTodoFormEvents(
    date: Date,
    onDone: () => void,
) {
    const { addTodo } = useTodoListItems();

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

        const newTodo = await createTodoListItemFromFormValuesForUserAndDate(
            values,
            user,
        );

        const success = await addTodo(newTodo);

        if (success) {
            onDone();
        } else {
            notify(
                'Oeps!',
                'Er is iets foutgegaan bij het opslaan van de todo. Probeer het later nog eens!',
                NotificationType.Error,
            );
        }

        return success;
    };

    return useFormState(
        ['summary', 'description', 'roleWithGoal', 'deadline', 'date'],
        validateInput,
        onFormValid,
        {
            date,
        },
    );
}

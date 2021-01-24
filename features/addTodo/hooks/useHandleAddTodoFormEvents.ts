import { useNotifications } from './../../../context/notification/NotificationContext';
import { useLoggedInUser } from '../../../context/authentication/AuthenticationContext';
import useFormState, {
    FormErrors,
    InputValidator,
    OnFormValidHandler,
} from '../../../hooks/useFormState';
import { NotificationType } from '../../../model/notification';
import { FormValues } from '../../todoForm/TodoForm';
import { persistNewTodo } from '../../../repository/todoListItemRepository';

export type OnFormDataValidHandler = (
    roleUid: string,
    values: FormValues,
) => Promise<boolean>;

export default function useHandleAddTodoFormEvents(
    date: Date,
    onDone: () => void,
) {
    const user = useLoggedInUser();

    const { notify } = useNotifications();

    const validateInput: InputValidator<FormValues> = (values) => {
        console.log('val', values);

        const newErrors: FormErrors<FormValues> = {};

        if (!values.summary) {
            newErrors.summary = 'Required';
        }

        if (!values.roleWithGoal) {
            newErrors.roleWithGoal = 'Required';
        }

        return newErrors;
    };

    const onFormValid: OnFormValidHandler<FormValues> = async (values) => {
        if (!user) {
            throw new Error('Expecting user to be available at this point');
        }

        const [roleUid, goalUid] = values.roleWithGoal.split(',');

        console.log('incoming', roleUid, goalUid);

        const success = await persistNewTodo(
            values.summary,
            values.description,
            roleUid,
            goalUid,
            date,
            user.uid,
        );

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
        ['summary', 'description', 'roleWithGoal'],
        validateInput,
        onFormValid,
    );
}

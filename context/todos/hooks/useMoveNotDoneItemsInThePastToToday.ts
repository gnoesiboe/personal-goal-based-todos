import { useEffect } from 'react';
import {
    fetchAllForUserNotDoneInPast,
    persistTodoUpdate,
} from '../../../repository/todoListItemRepository';
import { useLoggedInUser } from '../../authentication/AuthenticationContext';
import {
    createFirestoreTimestampFromDate,
    createStartOfToday,
} from '../../../utility/dateTimeUtilities';
import { useNotifications } from '../../notification/NotificationContext';

export default function useMoveNotDoneItemsInThePastToToday(
    refetchTodos: () => void,
) {
    const user = useLoggedInUser();

    const { notify } = useNotifications();

    useEffect(() => {
        if (!user) {
            return;
        }

        fetchAllForUserNotDoneInPast(user.uid)
            .then((todoListItems) => {
                const promises = todoListItems.map((item) => {
                    const today = createFirestoreTimestampFromDate(
                        createStartOfToday(),
                    );

                    return persistTodoUpdate({
                        ...item,
                        date: today,
                    });
                });

                return Promise.all(promises);
            })
            .then((results) => {
                const successResults = results.filter((result) => result);

                if (successResults.length > 0) {
                    notify(
                        'De niet-afgeronde items zijn naar vandaag doorgezet',
                    );
                }
            })
            .then(() => refetchTodos())
            .catch((error) => {
                console.error(error);
            });
    }, [user]);
}

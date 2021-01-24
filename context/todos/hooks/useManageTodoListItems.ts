import { sortTodoListItemsByPriority } from '../../../model/selector/todoListItemSelectors';
import {
    createDateKey,
    parseFirebaseTimestamp,
} from '../../../utility/dateTimeUtilities';
import { useNotifications } from '../../notification/NotificationContext';
import { fetchAllForUserForUpcomingDates } from '../../../repository/todoListItemRepository';
import { groupItemsWithCallback } from '../../../utility/arrayUtilities';
import { useState, useEffect } from 'react';
import { TodoListItem } from '../../../model/todoListItem';
import { NotificationType } from '../../../model/notification';
import { useLoggedInUser } from '../../authentication/AuthenticationContext';

export default function useManageTodoListItems(
    currentDate: Date,
    noOfDaysDisplayed: number,
) {
    const [items, setItems] = useState<TodoListItem[] | null>(null);

    const [isFetching, setIsFetching] = useState<boolean>(false);

    const { notify } = useNotifications();

    const user = useLoggedInUser();

    useEffect(() => {
        setIsFetching(true);

        if (!user || noOfDaysDisplayed === 0) {
            return;
        }

        fetchAllForUserForUpcomingDates(
            currentDate,
            noOfDaysDisplayed,
            user.uid,
        )
            .then((items) => setItems(items))
            .catch((error) => {
                console.error(
                    'Something went wrong wile fetching todo list items',
                    error,
                );

                notify(
                    'Oeps!',
                    'Er is iets foutgegaan bij het ophalen van de items. Probeer het later nog eens!',
                    NotificationType.Error,
                );
            })
            .finally(() => setIsFetching(false));
    }, [currentDate, setIsFetching, noOfDaysDisplayed]);

    if (items) {
        sortTodoListItemsByPriority(items);
    }

    const itemsPerDate = groupItemsWithCallback<TodoListItem>(
        items || [],
        (item) => createDateKey(parseFirebaseTimestamp(item.date)),
    );

    return { itemsPerDate, isFetching };
}

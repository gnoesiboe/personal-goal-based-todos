import { sortTodoListItemsByPriority } from './../../../model/selector/todoListItemSelectors';
import { createDateKey } from './../../../utility/dateTimeUtilities';
import { useNotifications } from './../../../context/notification/NotificationContext';
import { fetchAllForUpcomingDates } from './../../../repository/todoListItemRepository';
import { groupItemsWithCallback } from './../../../utility/arrayUtilities';
import { useState, useEffect } from 'react';
import { TodoListItem } from '../../../model/todoListItem';
import { NotificationType } from '../../../model/notification';

export default function useManageTodoListItems(
    currentDate: Date,
    noOfDaysDisplayed: number,
) {
    const [items, setItems] = useState<TodoListItem[] | null>(null);

    const [isFetching, setIsFetching] = useState<boolean>(false);

    const { notify } = useNotifications();

    useEffect(() => {
        setIsFetching(true);

        fetchAllForUpcomingDates(currentDate, noOfDaysDisplayed)
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
    }, [currentDate, setIsFetching]);

    if (items) {
        sortTodoListItemsByPriority(items);
    }

    const itemsPerDate = groupItemsWithCallback<TodoListItem>(
        items || [],
        (item) => createDateKey(item.date),
    );

    return { itemsPerDate, isFetching };
}

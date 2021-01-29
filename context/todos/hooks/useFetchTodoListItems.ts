import { fetchAllForUserForUpcomingDates } from '../../../repository/todoListItemRepository';
import { NotificationType } from '../../../model/notification';
import { useEffect, useState } from 'react';
import { useLoggedInUser } from '../../authentication/AuthenticationContext';
import { useNotifications } from '../../notification/NotificationContext';
import { TodoListItem } from '../../../model/todoListItem';

export type FetchTodoHandler = (
    date: Date,
    noOfDays: number,
    userUid: string,
) => Promise<boolean>;

export default function useFetchTodoListItems(
    currentDate: Date,
    noOfDaysDisplayed: number,
) {
    const [items, setItems] = useState<TodoListItem[] | null>(null);

    const [isFetching, setIsFetching] = useState<boolean>(false);

    const user = useLoggedInUser();

    const { notify } = useNotifications();

    const fetchTodos: FetchTodoHandler = async (date, noOfDays, userUid) => {
        setIsFetching(true);

        try {
            const newItems = await fetchAllForUserForUpcomingDates(
                date,
                noOfDays,
                userUid,
            );

            setItems(newItems);

            setIsFetching(false);

            return true;
        } catch (error) {
            console.error(
                'Something went wrong wile fetching todo list items',
                error,
            );

            notify(
                'Oeps!',
                'Er is iets foutgegaan bij het ophalen van de items. Probeer het later nog eens!',
                NotificationType.Error,
            );

            setIsFetching(false);
        }

        return false;
    };

    useEffect(() => {
        if (!user || noOfDaysDisplayed === 0) {
            return;
        }

        // noinspection JSIgnoredPromiseFromCall
        fetchTodos(currentDate, noOfDaysDisplayed, user.uid);
    }, [currentDate, setIsFetching, noOfDaysDisplayed]);

    return { items, isFetching, fetchTodos, setItems };
}

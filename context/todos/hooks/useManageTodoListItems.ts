import { sortTodoListItemsByPriority } from '../../../model/selector/todoListItemSelectors';
import {
    createDateKey,
    parseFirebaseTimestamp,
} from '../../../utility/dateTimeUtilities';
import { useNotifications } from '../../notification/NotificationContext';
import {
    fetchAllForUserForUpcomingDates,
    persistNewTodo,
} from '../../../repository/todoListItemRepository';
import { groupItemsWithCallback } from '../../../utility/arrayUtilities';
import { useState, useEffect } from 'react';
import { TodoListItem } from '../../../model/todoListItem';
import { NotificationType } from '../../../model/notification';
import { useLoggedInUser } from '../../authentication/AuthenticationContext';

export type AddTodoHandler = (todoListItem: TodoListItem) => Promise<boolean>;

export default function useManageTodoListItems(
    currentDate: Date,
    noOfDaysDisplayed: number,
) {
    const [items, setItems] = useState<TodoListItem[] | null>(null);

    const [isFetching, setIsFetching] = useState<boolean>(false);

    const { notify } = useNotifications();

    const user = useLoggedInUser();

    const fetchTodos = (date: Date, noOfDays: number, userUid: string) => {
        setIsFetching(true);

        fetchAllForUserForUpcomingDates(date, noOfDays, userUid)
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
    };

    useEffect(() => {
        if (!user || noOfDaysDisplayed === 0) {
            return;
        }

        fetchTodos(currentDate, noOfDaysDisplayed, user.uid);
    }, [currentDate, setIsFetching, noOfDaysDisplayed]);

    const addTodo: AddTodoHandler = async (newItem) => {
        const success = await persistNewTodo(newItem);

        if (!user) {
            throw new Error('Expecting a logged in user at this point');
        }

        fetchTodos(currentDate, noOfDaysDisplayed, user.uid);

        return success;
    };

    if (items) {
        sortTodoListItemsByPriority(items);
    }

    const itemsPerDate = groupItemsWithCallback<TodoListItem>(
        items || [],
        (item) => createDateKey(parseFirebaseTimestamp(item.date)),
    );

    return { itemsPerDate, isFetching, addTodo };
}

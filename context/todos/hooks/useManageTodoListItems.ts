import { applyItemUpdate } from './../utility/todoListItemStateModifiers';
import { sortTodoListItemsByPriority } from '../../../model/selector/todoListItemSelectors';
import {
    createDateKey,
    parseFirebaseTimestamp,
} from '../../../utility/dateTimeUtilities';
import { useNotifications } from '../../notification/NotificationContext';
import {
    fetchAllForUserForUpcomingDates,
    persistNewTodo,
    persistTodoUpdate,
} from '../../../repository/todoListItemRepository';
import { groupItemsWithCallback } from '../../../utility/arrayUtilities';
import { useState, useEffect } from 'react';
import { TodoListItem } from '../../../model/todoListItem';
import { NotificationType } from '../../../model/notification';
import { useLoggedInUser } from '../../authentication/AuthenticationContext';

export type AddTodoHandler = (todoListItem: TodoListItem) => Promise<boolean>;
export type UpdateTodoHandler = (
    id: string,
    updates: Partial<TodoListItem>,
) => Promise<boolean>;

export default function useManageTodoListItems(
    currentDate: Date,
    noOfDaysDisplayed: number,
) {
    const [items, setItems] = useState<TodoListItem[] | null>(null);

    const [isFetching, setIsFetching] = useState<boolean>(false);

    const { notify } = useNotifications();

    const user = useLoggedInUser();

    const fetchTodos = async (
        date: Date,
        noOfDays: number,
        userUid: string,
    ) => {
        setIsFetching(true);

        try {
            const newItems = await fetchAllForUserForUpcomingDates(
                date,
                noOfDays,
                userUid,
            );

            setItems(newItems);
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
        }

        setIsFetching(false);
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

    const updateTodo: UpdateTodoHandler = async (id, updates) => {
        if (!user) {
            throw new Error('Expecting user to be available at this point');
        }

        if (!items) {
            throw new Error(
                'Expecting current items to be available at this point',
            );
        }

        const todoToUpdate = items.find((cursorItem) => cursorItem.id === id);

        if (!todoToUpdate) {
            return false;
        }

        // optimistic updating
        setItems(applyItemUpdate(items, id, updates));

        // persist to server
        const updatedTodo = {
            ...todoToUpdate,
            ...updates,
        };

        const success = await persistTodoUpdate(updatedTodo);

        if (success) {
            fetchTodos(currentDate, noOfDaysDisplayed, user?.uid);
        }

        return success;
    };

    let sortedItems: TodoListItem[] = [...(items || [])];
    if (sortedItems) {
        sortTodoListItemsByPriority(sortedItems);
    }

    const itemsPerDate = groupItemsWithCallback<TodoListItem>(
        sortedItems || [],
        (item) => createDateKey(parseFirebaseTimestamp(item.date)),
    );

    return { itemsPerDate, isFetching, addTodo, updateTodo };
}
import {
    persistNewTodo,
    persistTodoUpdate,
    removeTodoFromServer,
} from '../../../repository/todoListItemRepository';
import { applyItemUpdate } from '../utility/todoListItemStateModifiers';
import { TodoListItem } from '../../../model/todoListItem';
import { useLoggedInUser } from '../../authentication/AuthenticationContext';
import { FetchTodoHandler } from './useFetchTodoListItems';
import { Dispatch, SetStateAction } from 'react';
import {
    addNumberOfDays,
    checkDateIsBeforeToday,
    createFirestoreTimestampFromDate,
    parseFirebaseTimestamp,
    subtractNumberOfDays,
} from '../../../utility/dateTimeUtilities';
import { useNotifications } from '../../notification/NotificationContext';
import { NotificationType } from '../../../model/notification';

export type AddTodoHandler = (todoListItem: TodoListItem) => Promise<boolean>;

export type UpdateTodoHandler = (
    id: string,
    updates: Partial<TodoListItem>,
) => Promise<boolean>;

export type MoveTodoOneDayForwardHandler = (id: string) => Promise<boolean>;

export type MoveTodoOneDayBackwardsHandler = (id: string) => Promise<boolean>;

export type RemoveTodoHandler = (id: string) => Promise<boolean>;

const persistUpdates = async (
    todoToUpdate: TodoListItem,
    updates: Partial<TodoListItem>,
): Promise<boolean> => {
    return await persistTodoUpdate({
        ...todoToUpdate,
        ...updates,
    });
};

export default function useModifyTodoCollection(
    currentDate: Date,
    noOfDaysDisplayed: number,
    fetchTodos: FetchTodoHandler,
    items: TodoListItem[] | null,
    setItems: Dispatch<SetStateAction<TodoListItem[] | null>>,
) {
    const user = useLoggedInUser();

    const { notify } = useNotifications();

    const addTodo: AddTodoHandler = async (newItem) => {
        if (!user) {
            throw new Error('Expecting a logged in user at this point');
        }

        const success = await persistNewTodo(newItem);

        // noinspection ES6MissingAwait
        fetchTodos(currentDate, noOfDaysDisplayed, user.uid);

        return success;
    };

    const removeTodo: RemoveTodoHandler = async (id) => {
        if (!user) {
            throw new Error('Expecting a logged in user at this point');
        }

        if (!confirm('Weet je het zeker?')) {
            return true;
        }

        const success = await removeTodoFromServer(id);

        // noinspection ES6MissingAwait
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
        const success = await persistUpdates(todoToUpdate, updates);

        if (success) {
            // noinspection ES6MissingAwait
            fetchTodos(currentDate, noOfDaysDisplayed, user?.uid);
        }

        return success;
    };

    const moveTodoOneDayBackwards: MoveTodoOneDayBackwardsHandler = async (
        id,
    ) => {
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

        const possibleNewDate = subtractNumberOfDays(
            parseFirebaseTimestamp(todoToUpdate.date),
            1,
        );

        if (checkDateIsBeforeToday(possibleNewDate)) {
            notify(
                'Het is niet toegestaan om een todo verder terug te zetten dan vandaag',
                NotificationType.Error,
            );

            return;
        }

        const updates: Partial<TodoListItem> = {
            date: createFirestoreTimestampFromDate(possibleNewDate),
        };

        // optimistic updating
        setItems(applyItemUpdate(items, id, updates));

        // persist to server
        const success = await persistUpdates(todoToUpdate, updates);

        if (success) {
            // noinspection JSIgnoredPromiseFromCall,ES6MissingAwait
            fetchTodos(currentDate, noOfDaysDisplayed, user?.uid);
        } else {
            // rewind optimistic update
            setItems(applyItemUpdate(items, id, todoToUpdate));
        }

        return success;
    };

    const moveTodoOneDayForward: MoveTodoOneDayForwardHandler = async (id) => {
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

        const newDate = createFirestoreTimestampFromDate(
            addNumberOfDays(parseFirebaseTimestamp(todoToUpdate.date), 1),
        );

        const updates: Partial<TodoListItem> = {
            date: newDate,
        };

        // optimistic updating
        setItems(applyItemUpdate(items, id, updates));

        // persist to server
        const success = await persistUpdates(todoToUpdate, updates);

        if (success) {
            // noinspection JSIgnoredPromiseFromCall,ES6MissingAwait
            fetchTodos(currentDate, noOfDaysDisplayed, user?.uid);
        } else {
            // rewind optimistic update
            setItems(applyItemUpdate(items, id, todoToUpdate));
        }

        return success;
    };

    return {
        addTodo,
        updateTodo,
        moveTodoOneDayForward,
        moveTodoOneDayBackwards,
        removeTodo,
    };
}

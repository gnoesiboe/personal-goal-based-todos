import {
    persistNewTodo,
    persistTodoUpdate,
    removeTodoFromServer,
} from '../../../repository/todoListItemRepository';
import { TodoListItem } from '../../../model/todoListItem';
import { useLoggedInUser } from '../../authentication/AuthenticationContext';
import { FetchTodoHandler } from './useFetchTodoListItems';
import { Dispatch } from 'react';
import {
    addNumberOfDays,
    checkDateIsBeforeToday,
    createFirestoreTimestampFromDate,
    parseFirebaseTimestamp,
    subtractNumberOfDays,
} from '../../../utility/dateTimeUtilities';
import { useNotifications } from '../../notification/NotificationContext';
import { NotificationType } from '../../../model/notification';
import { Action, ActionType } from '../model/actionTypes';
import { ItemsState } from '../reducers/todoReducer';
import { resolveTodoFromItems } from '../resolver/todoResolver';

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
    numberOfDaysDisplayed: number,
    fetchTodos: FetchTodoHandler,
    items: ItemsState,
    dispatch: Dispatch<Action>,
) {
    const user = useLoggedInUser();

    const { notify } = useNotifications();

    const addTodo: AddTodoHandler = async (newItem) => {
        if (!user) {
            throw new Error('Expecting a logged in user at this point');
        }

        // optimistic updating
        dispatch({
            type: ActionType.AddTodo,
            todo: newItem,
        });

        const success = await persistNewTodo(newItem);

        // noinspection ES6MissingAwait
        fetchTodos(currentDate, numberOfDaysDisplayed, user.uid);

        return success;
    };

    const removeTodo: RemoveTodoHandler = async (id) => {
        if (!user) {
            throw new Error('Expecting a logged in user at this point');
        }

        if (!confirm('Weet je het zeker?')) {
            return true;
        }

        dispatch({
            type: ActionType.RemoveTodo,
            id,
        });

        const success = await removeTodoFromServer(id);

        // noinspection ES6MissingAwait
        fetchTodos(currentDate, numberOfDaysDisplayed, user.uid);

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

        let itemToUpdate = resolveTodoFromItems(items, id);

        if (!itemToUpdate) {
            return false;
        }

        dispatch({
            type: ActionType.UpdateTodo,
            updates,
            id,
        });

        // persist to server
        const success = await persistUpdates(itemToUpdate, updates);

        // noinspection ES6MissingAwait
        fetchTodos(currentDate, numberOfDaysDisplayed, user.uid);

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

        const todoToUpdate = resolveTodoFromItems(items, id);

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

            return false;
        }

        const updates: Partial<TodoListItem> = {
            date: createFirestoreTimestampFromDate(possibleNewDate),
        };

        // optimistic updating
        dispatch({
            type: ActionType.UpdateTodo,
            updates,
            id,
        });

        // persist to server
        const success = await persistUpdates(todoToUpdate, updates);

        if (!success) {
            // rewind optimistic update
            dispatch({
                type: ActionType.UpdateTodo,
                updates: todoToUpdate,
                id,
            });
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

        const todoToUpdate = resolveTodoFromItems(items, id);

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
        dispatch({
            type: ActionType.UpdateTodo,
            updates,
            id,
        });

        // persist to server
        const success = await persistUpdates(todoToUpdate, updates);

        if (!success) {
            // rewind optimistic update
            dispatch({
                type: ActionType.UpdateTodo,
                updates: todoToUpdate,
                id,
            });
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

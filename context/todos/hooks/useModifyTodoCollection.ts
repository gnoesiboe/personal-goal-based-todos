import {
    persistNewTodo,
    persistTodoUpdate,
} from '../../../repository/todoListItemRepository';
import { applyItemUpdate } from '../utility/todoListItemStateModifiers';
import { TodoListItem } from '../../../model/todoListItem';
import { useLoggedInUser } from '../../authentication/AuthenticationContext';
import { FetchTodoHandler } from './useFetchTodoListItems';
import { Dispatch, SetStateAction } from 'react';

export type AddTodoHandler = (todoListItem: TodoListItem) => Promise<boolean>;
export type UpdateTodoHandler = (
    id: string,
    updates: Partial<TodoListItem>,
) => Promise<boolean>;

export default function useModifyTodoCollection(
    currentDate: Date,
    noOfDaysDisplayed: number,
    fetchTodos: FetchTodoHandler,
    items: TodoListItem[] | null,
    setItems: Dispatch<SetStateAction<TodoListItem[] | null>>,
) {
    const user = useLoggedInUser();

    const addTodo: AddTodoHandler = async (newItem) => {
        const success = await persistNewTodo(newItem);

        if (!user) {
            throw new Error('Expecting a logged in user at this point');
        }

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
        const updatedTodo = {
            ...todoToUpdate,
            ...updates,
        };

        const success = await persistTodoUpdate(updatedTodo);

        if (success) {
            // noinspection ES6MissingAwait
            fetchTodos(currentDate, noOfDaysDisplayed, user?.uid);
        }

        return success;
    };

    return { addTodo, updateTodo };
}

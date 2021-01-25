import { TodoListItem } from './../../../model/todoListItem.d';
import { ChangeEventHandler } from 'react';
import { useTodoListItems } from '../../../context/todos/TodoListItemsContext';

export default function useToggleDoneStatus(item: TodoListItem) {
    const { updateTodo } = useTodoListItems();

    const onInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        updateTodo(item.id, {
            done: event.target.checked,
        });
    };

    return { onInputChange };
}

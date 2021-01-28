import { TodoListItem } from './../../../model/todoListItem.d';
import { ChangeEventHandler, useEffect } from 'react';
import { useTodoListItems } from '../../../context/todos/TodoListItemsContext';

export default function useToggleDoneStatus(
    item: TodoListItem,
    current: boolean,
) {
    const { updateTodo } = useTodoListItems();

    const onInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        updateTodo(item.id, {
            done: event.target.checked,
        });
    };

    useEffect(() => {
        if (!current) {
            return;
        }

        const onKeyDown = (event: WindowEventMap['keydown']) => {
            if (
                event.target instanceof HTMLInputElement ||
                event.target instanceof HTMLTextAreaElement
            ) {
                return;
            }

            if (
                event.shiftKey ||
                event.metaKey ||
                event.key !== ' ' ||
                !event.ctrlKey
            ) {
                return;
            }

            updateTodo(item.id, { done: !item.done });
        };

        window.addEventListener('keydown', onKeyDown);

        return () => window.removeEventListener('keydown', onKeyDown);
    }, [current, item]);

    return { onInputChange };
}

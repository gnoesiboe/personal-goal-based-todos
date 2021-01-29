import { TodoListItem } from '../../../model/todoListItem';
import { ChangeEventHandler, useEffect } from 'react';
import { useTodoListItems } from '../../../context/todos/TodoListItemsContext';
import { checkKeyDefinitionIsPressed } from '../../../utility/keyboardUtilities';
import { toggleDoneStatusDefinition } from '../../../constants/keyboardDefinitions';

export default function useToggleDoneStatus(
    item: TodoListItem,
    current: boolean,
) {
    const { updateTodo } = useTodoListItems();

    const onInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        // noinspection JSIgnoredPromiseFromCall
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
                checkKeyDefinitionIsPressed(toggleDoneStatusDefinition, event)
            ) {
                // noinspection JSIgnoredPromiseFromCall
                updateTodo(item.id, { done: !item.done });
            }
        };

        window.addEventListener('keydown', onKeyDown);

        return () => window.removeEventListener('keydown', onKeyDown);
    }, [current, item]);

    return { onInputChange };
}

import { TodoListItem } from '../../../model/todoListItem';
import { useEffect } from 'react';
import { useTodoListItems } from '../../../context/todos/TodoListItemsContext';
import { checkKeyDefinitionIsPressed } from '../../../utility/keyboardUtilities';
import { toggleDoneStatusDefinition } from '../../../constants/keyboardDefinitions';
import { OnChangeHandler } from '../../../primitives/checkbox/Checkbox';

export default function useToggleDoneStatus(
    item: TodoListItem,
    current: boolean,
) {
    const { updateTodo } = useTodoListItems();

    const onInputChange: OnChangeHandler = (checked) => {
        // noinspection JSIgnoredPromiseFromCall
        updateTodo(item.id, {
            done: checked,
        });
    };

    useEffect(() => {
        if (!current) {
            return;
        }

        const onKeyDown = (event: WindowEventMap['keydown']) => {
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

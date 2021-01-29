import { useEffect } from 'react';
import {
    PostponeTodoToTomorrowHandler,
    RemoveTodoHandler,
} from './useModifyTodoCollection';
import { TodoListItem } from '../../../model/todoListItem';
import { checkKeyDefinitionIsPressed } from '../../../utility/keyboardUtilities';
import {
    postponeTillTomorrowDefinition,
    removeTodoDefinition,
} from '../../../constants/keyboardDefinitions';

export default function useKeyboardEventListeners(
    postponeTodoToTomorrow: PostponeTodoToTomorrowHandler,
    currentTodo: TodoListItem | null,
    removeTodo: RemoveTodoHandler,
) {
    useEffect(() => {
        if (!currentTodo) {
            return;
        }

        const onKeyDown = (event: WindowEventMap['keydown']) => {
            if (
                checkKeyDefinitionIsPressed(
                    postponeTillTomorrowDefinition,
                    event,
                )
            ) {
                // noinspection JSIgnoredPromiseFromCall
                postponeTodoToTomorrow(currentTodo.id);

                return;
            }

            if (checkKeyDefinitionIsPressed(removeTodoDefinition, event)) {
                // noinspection JSIgnoredPromiseFromCall
                removeTodo(currentTodo.id);

                return;
            }
        };

        window.addEventListener('keydown', onKeyDown);

        return () => window.removeEventListener('keydown', onKeyDown);
    }, [currentTodo, postponeTodoToTomorrow, removeTodo]);
}

import { useEffect } from 'react';
import {
    MoveTodoOneDayBackwardsHandler,
    MoveTodoOneDayForwardHandler,
    RemoveTodoHandler,
} from './useModifyTodoCollection';
import { TodoListItem } from '../../../model/todoListItem';
import { checkKeyDefinitionIsPressed } from '../../../utility/keyboardUtilities';
import {
    moveTodoOneDayBackwardsDefinition,
    moveTodoOneDayForwardDefinition,
    removeTodoDefinition,
} from '../../../constants/keyboardDefinitions';

export default function useKeyboardEventListeners(
    moveTodoOneDayForward: MoveTodoOneDayForwardHandler,
    moveTodoOneDayBackwards: MoveTodoOneDayBackwardsHandler,
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
                    moveTodoOneDayForwardDefinition,
                    event,
                )
            ) {
                // noinspection JSIgnoredPromiseFromCall
                moveTodoOneDayForward(currentTodo.id);

                return;
            }

            if (
                checkKeyDefinitionIsPressed(
                    moveTodoOneDayBackwardsDefinition,
                    event,
                )
            ) {
                // noinspection JSIgnoredPromiseFromCall
                moveTodoOneDayBackwards(currentTodo.id);

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
    }, [currentTodo, moveTodoOneDayForward, removeTodo]);
}

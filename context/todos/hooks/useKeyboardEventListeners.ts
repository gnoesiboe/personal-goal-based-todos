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
    resetCurrentTodoDefinition,
} from '../../../constants/keyboardDefinitions';

export default function useKeyboardEventListeners(
    moveTodoOneDayForward: MoveTodoOneDayForwardHandler,
    moveTodoOneDayBackwards: MoveTodoOneDayBackwardsHandler,
    currentTodo: TodoListItem | null,
    removeTodo: RemoveTodoHandler,
    resetCurrentTodoIndex: () => void,
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

            if (
                checkKeyDefinitionIsPressed(resetCurrentTodoDefinition, event)
            ) {
                resetCurrentTodoIndex();
            }
        };

        window.addEventListener('keydown', onKeyDown);

        return () => window.removeEventListener('keydown', onKeyDown);
    }, [currentTodo, moveTodoOneDayForward, removeTodo]);
}

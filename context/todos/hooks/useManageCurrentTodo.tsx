import { Dispatch, useCallback, useEffect } from 'react';
import { checkKeyDefinitionIsPressed } from '../../../utility/keyboardUtilities';
import {
    moveToNextTodoDefinition,
    moveToPreviousTodoDefinition,
} from '../../../constants/keyboardDefinitions';
import { Action, ActionType } from '../model/actionTypes';

export type SetCurrentTodoHandler = (id: string) => void;

export default function useManageCurrentTodo(dispatch: Dispatch<Action>) {
    const moveToNext = useCallback(() => {
        dispatch({
            type: ActionType.MoveToNextTodo,
        });
    }, [dispatch]);

    const moveToPrevious = useCallback(() => {
        dispatch({
            type: ActionType.MoveToPreviousTodo,
        });
    }, [dispatch]);

    useEffect(() => {
        const onKeyDown = (event: WindowEventMap['keydown']) => {
            if (checkKeyDefinitionIsPressed(moveToNextTodoDefinition, event)) {
                // prevent Arrow keys to also scroll the page
                event.preventDefault();

                moveToNext();

                return;
            }

            if (
                checkKeyDefinitionIsPressed(moveToPreviousTodoDefinition, event)
            ) {
                // prevent Arrow keys to also scroll the page
                event.preventDefault();

                moveToPrevious();

                return;
            }
        };

        window.addEventListener('keydown', onKeyDown);

        return () => window.removeEventListener('keydown', onKeyDown);
    }, []);

    const setCurrentTodo: SetCurrentTodoHandler = useCallback((id) => {
        dispatch({
            type: ActionType.SelectTodo,
            id,
        });
    }, []);

    const resetCurrentTodoIndex = () => {
        dispatch({
            type: ActionType.ClearCurrentTodo,
        });
    };

    return { setCurrentTodo, resetCurrentTodoIndex };
}

import { Dispatch, useCallback, useEffect } from 'react';
import { checkKeyDefinitionIsPressed } from '../../../utility/keyboardUtilities';
import {
    moveToNextTodoDefinition,
    moveToPreviousTodoDefinition,
} from '../../../constants/keyboardDefinitions';
import { Action, ActionType } from '../model/actionTypes';

export type SetCurrentTodoIndexHandler = (index: number) => void;

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

    const setCurrentTodoIndex: SetCurrentTodoIndexHandler = useCallback(
        (index) => {
            dispatch({
                type: ActionType.SelectTodo,
                index,
            });
        },
        [],
    );

    const resetCurrentTodoIndex = () => {
        dispatch({
            type: ActionType.ClearCurrentTodo,
        });
    };

    return { setCurrentTodoIndex, resetCurrentTodoIndex };
}

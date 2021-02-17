import { useEffect, Dispatch, useCallback } from 'react';
import { checkKeyDefinitionIsPressed } from '../../../utility/keyboardUtilities';
import {
    moveToNextDateDefinition,
    moveToPreviousDateDefinition,
    moveToTodayDefinition,
} from '../../../constants/keyboardDefinitions';
import { Action, ActionType } from '../model/actionTypes';

export default function useManageCurrentDate(dispatch: Dispatch<Action>) {
    const moveToPreviousDate = useCallback(() => {
        dispatch({
            type: ActionType.MoveToPreviousDate,
        });
    }, [dispatch]);

    const moveToToday = useCallback(() => {
        dispatch({
            type: ActionType.MoveToToday,
        });
    }, [dispatch]);

    const moveToNextDate = useCallback(() => {
        dispatch({
            type: ActionType.MoveToNextDate,
        });
    }, [dispatch]);

    useEffect(() => {
        const onKeyDown = (event: WindowEventMap['keydown']) => {
            if (checkKeyDefinitionIsPressed(moveToNextDateDefinition, event)) {
                moveToNextDate();
            } else if (
                checkKeyDefinitionIsPressed(moveToPreviousDateDefinition, event)
            ) {
                moveToPreviousDate();
            } else if (
                checkKeyDefinitionIsPressed(moveToTodayDefinition, event)
            ) {
                moveToToday();
            }
        };

        window.addEventListener('keydown', onKeyDown);

        return () => window.removeEventListener('keydown', onKeyDown);
    }, []);

    return { moveToToday, moveToNextDate, moveToPreviousDate };
}

import { useEffect, Dispatch, useCallback } from 'react';
import { checkKeyDefinitionIsPressed } from '../../../utility/keyboardUtilities';
import {
    moveToNextCurrentDate,
    moveToNextDateDefinition,
    moveToPreviousDateDefinition,
    moveCurrentDateToTodayDefinition,
} from '../../../constants/keyboardDefinitions';
import { Action, ActionType } from '../model/actionTypes';

export type MoveToDateHandler = (date: Date) => void;

export default function useManageCurrentDate(dispatch: Dispatch<Action>) {
    const moveToPreviousDate = useCallback(() => {
        dispatch({
            type: ActionType.MoveToPreviousDate,
        });
    }, [dispatch]);

    const moveToDate: MoveToDateHandler = (date) => {
        dispatch({
            type: ActionType.MoveToDate,
            date,
        });
    };

    const moveCurrentDateToToday = useCallback(() => {
        dispatch({
            type: ActionType.MoveCurrentDateToToday,
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
                checkKeyDefinitionIsPressed(
                    moveCurrentDateToTodayDefinition,
                    event,
                )
            ) {
                moveCurrentDateToToday();
            }
        };

        window.addEventListener('keydown', onKeyDown);

        return () => window.removeEventListener('keydown', onKeyDown);
    }, []);

    return {
        moveCurrentDateToToday,
        moveToNextDate,
        moveToDate,
        moveToPreviousDate,
    };
}

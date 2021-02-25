import { useEffect, Dispatch, useCallback } from 'react';
import { checkKeyDefinitionIsPressed } from '../../../utility/keyboardUtilities';
import {
    moveToNextCurrentDateDefinition,
    moveToNextDateDefinition,
    moveToPreviousDateDefinition,
    moveCurrentDateToTodayDefinition,
    moveToPreviousCurrentTodoDefinition,
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

    const moveToNextCurrentDate = useCallback(() => {
        dispatch({
            type: ActionType.MoveToNextCurrentDate,
        });
    }, [dispatch]);

    const moveToPreviousCurrentDate = useCallback(() => {
        dispatch({
            type: ActionType.MoveToPreviousCurrentDate,
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
            } else if (
                checkKeyDefinitionIsPressed(
                    moveToNextCurrentDateDefinition,
                    event,
                )
            ) {
                moveToNextCurrentDate();
            } else if (
                checkKeyDefinitionIsPressed(
                    moveToPreviousCurrentTodoDefinition,
                    event,
                )
            ) {
                moveToPreviousCurrentDate();
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

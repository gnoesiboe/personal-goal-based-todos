import { Dispatch, useCallback } from 'react';
import { Action, ActionType } from '../model/actionTypes';

export default function useManageFilters(dispatch: Dispatch<Action>) {
    const toggleHideDone = useCallback(() => {
        dispatch({
            type: ActionType.ToggleHideDone,
        });
    }, [dispatch]);

    const toggleHideWaiting = useCallback(() => {
        dispatch({
            type: ActionType.ToggleHideWaiting,
        });
    }, [dispatch]);

    return { toggleHideDone, toggleHideWaiting };
}

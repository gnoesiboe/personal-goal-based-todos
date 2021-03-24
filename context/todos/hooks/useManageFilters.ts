import { Dispatch, useCallback } from 'react';
import { Action, ActionType } from '../model/actionTypes';

export default function useManageFilters(dispatch: Dispatch<Action>) {
    const toggleHideDone = useCallback(() => {
        dispatch({
            type: ActionType.ToggleHideDone,
        });
    }, [dispatch]);

    return { toggleHideDone };
}

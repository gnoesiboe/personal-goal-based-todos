import { useEffect, useCallback, Dispatch } from 'react';
import { Action, ActionType } from '../model/actionTypes';

// keep inline with todoOverview.module.scss
const gapWidth = 20;
const dayWidth = 400; // keep inline with sizes.scss

const calculateNumberOfDaysDisplayed = () => {
    const amount = Math.floor(window.innerWidth / (dayWidth + gapWidth));

    return amount === 0 ? 1 : amount;
};

export default function useDetermineNumberOfDaysThatCanBeDisplayed(
    dispatch: Dispatch<Action>,
) {
    const recalculatePossibleNoOfRows = useCallback(() => {
        dispatch({
            type: ActionType.ChangeNumberOfDaysDisplayed,
            numberOfDaysDisplayed: calculateNumberOfDaysDisplayed(),
        });
    }, [dispatch]);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        recalculatePossibleNoOfRows();

        const onWindowResize = () => recalculatePossibleNoOfRows();

        window.addEventListener('resize', onWindowResize);

        return () => window.removeEventListener('resize', onWindowResize);
    }, [recalculatePossibleNoOfRows]);
}

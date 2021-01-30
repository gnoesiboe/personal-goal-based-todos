import { useState, useEffect, useCallback } from 'react';

// keep inline with todoOverview.module.scss
const gapWidth = 20;
const dayWidth = 400; // keep inline with sizes.scss

export default function useDetermineNumberOfDaysThatCanBeDisplayed() {
    const [noOfRows, setNoOfRows] = useState<number>(0);

    const recalculatePossibleNoOfRows = useCallback(() => {
        setNoOfRows(Math.floor(window.innerWidth / (dayWidth + gapWidth)));
    }, [setNoOfRows]);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        recalculatePossibleNoOfRows();

        const onWindowResize = () => recalculatePossibleNoOfRows();

        window.addEventListener('resize', onWindowResize);

        return () => window.removeEventListener('resize', onWindowResize);
    }, [recalculatePossibleNoOfRows]);

    // ensure that at least one day is always shown
    return noOfRows > 1 ? noOfRows : 1;
}

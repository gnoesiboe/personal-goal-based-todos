import {
    createStartOfToday,
    addNumberOfDays,
    subtractNumberOfDays,
} from './../../../utility/dateTimeUtilities';
import { MouseEventHandler, useState, useEffect } from 'react';

export default function useManageCurrentDate() {
    const [currentDate, setCurrentDate] = useState<Date>(createStartOfToday());

    const moveToPrevious = () =>
        setCurrentDate((currentValue) => subtractNumberOfDays(currentValue, 1));

    const moveToToday = () => setCurrentDate(createStartOfToday());

    const moveToNext = () =>
        setCurrentDate((currentValue) => addNumberOfDays(currentValue, 1));

    const onNextClick: MouseEventHandler<HTMLButtonElement> = () =>
        moveToNext();

    const onTodayClick: MouseEventHandler<HTMLButtonElement> = () =>
        moveToToday();

    const onPreviousClick: MouseEventHandler<HTMLButtonElement> = () =>
        moveToPrevious();

    useEffect(() => {
        const onKeyDown = (event: WindowEventMap['keydown']) => {
            const target = event.target;

            if (
                target instanceof HTMLInputElement ||
                target instanceof HTMLTextAreaElement
            ) {
                return;
            }

            if (
                event.altKey ||
                event.shiftKey ||
                event.ctrlKey ||
                event.metaKey
            ) {
                return;
            }

            if (event.key === 'ArrowRight') {
                moveToNext();
            } else if (event.key === 'ArrowLeft') {
                moveToPrevious();
            } else if (event.key === 't') {
                moveToToday();
            }
        };

        window.addEventListener('keydown', onKeyDown);

        return () => window.removeEventListener('keydown', onKeyDown);
    }, []);

    return { currentDate, onNextClick, onTodayClick, onPreviousClick };
}

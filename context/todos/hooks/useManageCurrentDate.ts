import {
    createStartOfToday,
    addNumberOfDays,
    subtractNumberOfDays,
    checkDateIsBefore,
} from '../../../utility/dateTimeUtilities';
import { useState, useEffect } from 'react';

export type DayNavigationDirection = 'forwards' | 'backwards';

export type DateCursor = {
    date: Date;
    direction: DayNavigationDirection;
};

export default function useManageCurrentDate() {
    const [
        { date: currentDate, direction: dayNavigationDirection },
        setCurrentDate,
    ] = useState<DateCursor>({
        date: createStartOfToday(),
        direction: 'forwards',
    });

    const moveToPrevious = () =>
        setCurrentDate((currentValue) => ({
            date: subtractNumberOfDays(currentValue.date, 1),
            direction: 'backwards',
        }));

    const moveToToday = () => {
        setCurrentDate((currentValue) => {
            const today = createStartOfToday();

            const direction: DayNavigationDirection = checkDateIsBefore(
                currentValue.date,
                today,
            )
                ? 'forwards'
                : 'backwards';

            return {
                date: today,
                direction,
            };
        });
    };

    const moveToNext = () =>
        setCurrentDate((currentValue) => ({
            date: addNumberOfDays(currentValue.date, 1),
            direction: 'forwards',
        }));

    const onNextDateClick = () => moveToNext();

    const onTodayClick = () => moveToToday();

    const onPreviousDateClick = () => moveToPrevious();

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

    return {
        currentDate,
        dayNavigationDirection,
        onNextDateClick,
        onTodayClick,
        onPreviousDateClick,
    };
}

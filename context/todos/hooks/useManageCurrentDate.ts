import {
    createStartOfToday,
    addNumberOfDays,
    subtractNumberOfDays,
    checkDateIsBefore,
} from '../../../utility/dateTimeUtilities';
import { useState, useEffect } from 'react';
import {
    checkIsFormKeyboardEvent,
    checkKeyDefinitionIsPressed,
} from '../../../utility/keyboardUtilities';
import {
    moveToNextDateDefinition,
    moveToPreviousDateDefinition,
    moveToTodayDefinition,
} from '../../../constants/keyboardDefinitions';

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
            if (checkIsFormKeyboardEvent(event)) {
                return;
            }

            if (checkKeyDefinitionIsPressed(moveToNextDateDefinition, event)) {
                moveToNext();
            } else if (
                checkKeyDefinitionIsPressed(moveToPreviousDateDefinition, event)
            ) {
                moveToPrevious();
            } else if (
                checkKeyDefinitionIsPressed(moveToTodayDefinition, event)
            ) {
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

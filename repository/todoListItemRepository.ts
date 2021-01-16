import {
    createStartOfToday,
    createStartOfTomorrow,
} from './../utility/dateTimeUtilities';
import { TodoListItem } from '../model/todoListItem';

export const fetchAllForUpcomingDates = async (
    _currentDate: Date,
    _noOfDaysAfter: number,
): Promise<TodoListItem[]> => {
    return [
        {
            id: 'a',
            done: false,
            summary: 'Een lekkere boterham voor mezelf smeren',
            date: createStartOfToday(),
            important: true,
            urgent: false,
            userUid: 'v0n2lQCbyPVbZRUIKTh6tJpnbpL2',
        },
        {
            id: 'b',
            done: false,
            summary: 'Mijn vrouw een complimentje geven',
            date: createStartOfToday(),
            important: true,
            urgent: true,
            userUid: 'v0n2lQCbyPVbZRUIKTh6tJpnbpL2',
        },
        {
            id: 'c',
            done: true,
            summary: 'Een eindje fietsen met de hond',
            date: createStartOfTomorrow(),
            important: false,
            urgent: true,
            userUid: 'v0n2lQCbyPVbZRUIKTh6tJpnbpL2',
        },
    ];
};

import { createStartOfToday } from './../utility/dateTimeUtilities';
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
        },
        {
            id: 'b',
            done: false,
            summary: 'Mijn vrouw een complimentje geven',
            date: createStartOfToday(),
            important: true,
            urgent: true,
        },
        {
            id: 'c',
            done: true,
            summary: 'Een eindje fietsen met de hond',
            date: createStartOfToday(),
            important: false,
            urgent: true,
        },
    ];
};

import {
    addDays,
    startOfToday,
    startOfDay,
    isSameDay,
    subDays,
    isToday,
    isTomorrow,
    format,
    isBefore,
    parse,
    startOfTomorrow,
    endOfDay,
    isThisYear,
} from 'date-fns';
import { nl } from 'date-fns/locale';
import firebase from 'firebase/app';

export const createTimestamp = (): number => new Date().getTime();

export const createDateRange = (start: Date, noOfDays: number): Date[] => {
    const out: Date[] = [start];

    let cursor: Date = startOfDay(new Date(start.getTime()));

    for (let i = 0, l = noOfDays - 1; i < l; i++) {
        const withOnDayAdded = startOfDay(addDays(cursor, 1));

        out.push(withOnDayAdded);

        cursor = withOnDayAdded;
    }

    return out;
};

export const createEndOfDay = (date: Date) => endOfDay(date);

export const createStartOfToday = () => startOfToday();

export const createStartOfTomorrow = () => startOfTomorrow();

export const checkIsSameDay = (first: Date, second: Date) =>
    isSameDay(first, second);

export const checkIsToday = (date: Date): boolean => isToday(date);

export const checkIsTomorrow = (date: Date): boolean => isTomorrow(date);

export const addNumberOfDays = (date: Date, amount: number) =>
    addDays(date, amount);

export const subtractNumberOfDays = (date: Date, amount: number) =>
    subDays(date, amount);

export const checkIsThisYear = (date: Date): boolean => {
    return isThisYear(date);
};

export const getRelativeDayDescription = (date: Date) => {
    if (isToday(date)) {
        return 'vandaag';
    }

    if (isTomorrow(date)) {
        return 'morgen';
    }

    const dateFormat = checkIsThisYear(date)
        ? 'EEEEEE, d LLLL'
        : 'EEEEEE, d LLLL, yyyy';

    return format(date, dateFormat, {
        locale: nl,
    });
};

export const checkDateIsBefore = (date: Date, dateToCompare: Date) =>
    isBefore(date, dateToCompare);

export const createDateKey = (date: Date) =>
    startOfDay(date).getTime().toString();

export const parseFirebaseTimestamp = (
    firestoreTimestamp: firebase.firestore.Timestamp,
) => {
    const asTimestamp = firestoreTimestamp.seconds;

    return convertTimestampToDate(asTimestamp);
};

export const convertTimestampToDate = (timestamp: number): Date => {
    return parse(timestamp.toString(), 't', new Date(), {
        locale: nl,
    });
};

export const createFirestoreTimestampFromDate = (
    date: Date,
): firebase.firestore.Timestamp =>
    new firebase.firestore.Timestamp(date.getTime() / 1000, 0);

export const createFirestoreTimestampForNow = (): firebase.firestore.Timestamp =>
    createFirestoreTimestampFromDate(new Date());

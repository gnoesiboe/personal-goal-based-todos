import { FormValues } from '../../todoForm/TodoForm';
import {
    createEndOfThisWeek,
    createStartOfNextWeek,
    createStartOfToday,
    createStartOfTomorrow,
} from '../../../utility/dateTimeUtilities';

export const applyAndExtractQuickTags = (
    summary: string,
): Partial<FormValues> => {
    let updates: Partial<FormValues> = {};

    let newSummary = summary;

    if (newSummary.match(/@quickfix/)) {
        updates.quickfix = true;

        newSummary = newSummary.replace(/@quickfix/g, '');
    }

    if (newSummary.match(/@must/)) {
        updates.date = createStartOfToday();
        updates.deadline = createStartOfToday();

        newSummary = newSummary.replace(/@must/g, '');
    }

    if (newSummary.match(/@today/)) {
        updates.date = createStartOfToday();

        newSummary = newSummary.replace(/@today/g, '');
    }

    if (newSummary.match(/@tomorrow/)) {
        updates.date = createStartOfTomorrow();

        newSummary = newSummary.replace(/@tomorrow/g, '');
    }

    if (newSummary.match(/@nextWeek/i)) {
        updates.date = createStartOfNextWeek();

        newSummary = newSummary.replace(/@nextWeek/gi, '');
    }

    if (newSummary.match(/@dl\(today\)/g)) {
        updates.deadline = createStartOfToday();

        newSummary = newSummary.replace(/@dl\(today\)/g, '');
    }

    if (newSummary.match(/@dl\(tomorrow\)/g)) {
        updates.deadline = createStartOfTomorrow();

        newSummary = newSummary.replace(/@dl\(tomorrow\)/g, '');
    }

    if (newSummary.match(/@thisWeek/g)) {
        updates.deadline = createEndOfThisWeek();

        newSummary = newSummary.replace(/@thisWeek/g, '');
    }

    if (newSummary.match(/@waiting/g)) {
        updates.waiting = true;

        newSummary = newSummary.replace(/@waiting/g, '');
    }

    if (newSummary.match(/@evening/g)) {
        updates.evening = true;

        newSummary = newSummary.replace(/@evening/g, '');
    }

    return {
        ...updates,
        summary: newSummary,
    };
};

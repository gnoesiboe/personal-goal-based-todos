import { SetFieldValueHandler } from '../../../hooks/useFormState';
import { FormValues } from '../../todoForm/TodoForm';
import {
    createEndOfThisWeek,
    createStartOfNextWeek,
    createStartOfToday,
    createStartOfTomorrow,
} from '../../../utility/dateTimeUtilities';

export const applyAndExtractQuickTags = (
    value: string,
    setFieldValue: SetFieldValueHandler<FormValues>,
): string => {
    let newValue = value;

    if (value.match(/@quickfix/)) {
        setFieldValue('quickfix', true);

        newValue = newValue.replace(/@quickfix/g, '');
    }

    if (value.match(/@must/)) {
        setFieldValue('date', createStartOfToday());
        setFieldValue('deadline', createStartOfToday());

        newValue = newValue.replace(/@must/g, '');
    }

    if (value.match(/@today/)) {
        setFieldValue('date', createStartOfToday());

        newValue = newValue.replace(/@today/g, '');
    }

    if (value.match(/@tomorrow/)) {
        setFieldValue('date', createStartOfTomorrow());

        newValue = newValue.replace(/@tomorrow/g, '');
    }

    if (value.match(/@nextWeek/i)) {
        setFieldValue('date', createStartOfNextWeek());

        newValue = newValue.replace(/@nextWeek/gi, '');
    }

    if (value.match(/@before\(today\)/g)) {
        setFieldValue('deadline', createStartOfToday());

        newValue = newValue.replace(/@before\(today\)/g, '');
    }

    if (value.match(/@before\(tomorrow\)/g)) {
        setFieldValue('deadline', createStartOfTomorrow());

        newValue = newValue.replace(/@before\(tomorrow\)/g, '');
    }

    if (value.match(/@thisWeek/g)) {
        setFieldValue('deadline', createEndOfThisWeek());

        newValue = newValue.replace(/@thisWeek/g, '');
    }

    return newValue.trim();
};

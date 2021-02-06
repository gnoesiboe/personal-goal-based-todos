import React from 'react';
import { TodoListItem } from '../../../model/todoListItem';
import classNames from '../todoListItem.module.scss';
import {
    getRelativeDayDescription,
    parseFirebaseTimestamp,
} from '../../../utility/dateTimeUtilities';
import { ClockIcon } from '@primer/octicons-react';

type Props = {
    item: TodoListItem;
};

const DeadlineDescription: React.FC<Props> = ({ item }) => {
    if (!item.deadline) {
        return null;
    }

    const deadline = parseFirebaseTimestamp(item.deadline);

    const label = getRelativeDayDescription(deadline);

    return (
        <span className={classNames.deadlineDescription}>
            <ClockIcon size="small" />
            <span>{label}</span>
        </span>
    );
};

export default DeadlineDescription;

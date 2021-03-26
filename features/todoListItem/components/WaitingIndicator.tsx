import React from 'react';
import { TodoListItem } from '../../../model/todoListItem';
import classNames from '../todoListItem.module.scss';
import { StopIcon } from '@primer/octicons-react';
import createClassName from 'classnames';

type Props = {
    item: TodoListItem;
};

const WaitingIndicator: React.FC<Props> = ({ item }) => {
    if (!item.waiting) {
        return null;
    }

    const className = createClassName(
        classNames.statusIndicator,
        classNames.waitingIndicator,
    );

    return (
        <span className={className}>
            <StopIcon size="small" />
        </span>
    );
};

export default WaitingIndicator;

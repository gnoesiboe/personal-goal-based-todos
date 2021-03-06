import React from 'react';
import { TodoListItem } from '../../../model/todoListItem';
import { GiftIcon } from '@primer/octicons-react';
import classNames from '../todoListItem.module.scss';
import createClassName from 'classnames';

type Props = {
    item: TodoListItem;
};

const QuickfixIndicator: React.FC<Props> = ({ item }) => {
    if (!item.quickfix) {
        return null;
    }

    const className = createClassName(
        classNames.statusIndicator,
        classNames.quickfixIndicator,
    );

    return (
        <span className={className}>
            <GiftIcon size="small" />
        </span>
    );
};

export default QuickfixIndicator;

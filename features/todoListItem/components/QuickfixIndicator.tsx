import React from 'react';
import { TodoListItem } from '../../../model/todoListItem';
import { GiftIcon } from '@primer/octicons-react';
import classNames from '../todoListItem.module.scss';

type Props = {
    item: TodoListItem;
};

const QuickfixIndicator: React.FC<Props> = ({ item }) => {
    if (!item.quickfix) {
        return null;
    }

    return (
        <span className={classNames.quickfixIndicator}>
            <GiftIcon size="small" />
        </span>
    );
};

export default QuickfixIndicator;

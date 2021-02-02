import React from 'react';
import classNames from '../todoListItem.module.scss';
import createClassName from 'classnames';
import { TodoListItem } from '../../../model/todoListItem';

type Props = {
    item: TodoListItem;
};

const Summary: React.FC<Props> = ({ item }) => {
    const className = createClassName(classNames.summary, {
        [classNames.summaryIsDone]: item.done,
    });

    return <div className={className}>{item.summary}</div>;
};

export default Summary;

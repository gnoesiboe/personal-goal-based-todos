import React from 'react';
import classNames from '../todoListItem.module.scss';
import createClassName from 'classnames';
import { TodoListItem } from '../../../model/todoListItem';
import { parseMarkdown } from '../../../utility/markdownUtilities';

type Props = {
    item: TodoListItem;
};

const Summary: React.FC<Props> = ({ item }) => {
    const className = createClassName(classNames.summary, {
        [classNames.summaryIsDone]: item.done,
    });

    const title = parseMarkdown(item.summary, true);

    return (
        <div
            className={className}
            dangerouslySetInnerHTML={{ __html: title }}
        />
    );
};

export default Summary;

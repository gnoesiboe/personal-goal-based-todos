import React from 'react';
import classNames from '../todoListItem.module.scss';
import createClassName from 'classnames';
import { TodoListItem } from '../../../model/todoListItem';
import { parseMarkdown } from '../../../utility/markdownUtilities';
import QuickfixIndicator from './QuickfixIndicator';
import WaitingIndicator from './WaitingIndicator';

type Props = {
    item: TodoListItem;
};

const Summary: React.FC<Props> = ({ item }) => {
    const className = createClassName(classNames.summary, {
        [classNames.summaryIsDone]: item.done,
    });

    const title = parseMarkdown(item.summary, true);

    return (
        <div className={className}>
            <QuickfixIndicator item={item} />
            <WaitingIndicator item={item} />
            <span dangerouslySetInnerHTML={{ __html: title }} />
        </div>
    );
};

export default Summary;

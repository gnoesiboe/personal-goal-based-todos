import React from 'react';
import classNames from './todoListItemDescription.module.scss';
import MarkdownContent from '../../primitives/markdownContent/MarkdownContent';
import { TodoListItem } from '../../model/todoListItem';
import useToggleCheckedStatusForSubItemsOnClick from './hooks/useToggleCheckedStatusForSubItemsOnClick';

type Props = {
    item: TodoListItem;
};

const TodoListItemDescription: React.FC<Props> = ({ item }) => {
    const { containerRef } = useToggleCheckedStatusForSubItemsOnClick(item);

    if (!item.description) {
        return null;
    }

    return (
        <div className={classNames.container} ref={containerRef}>
            <MarkdownContent>{item.description}</MarkdownContent>
        </div>
    );
};

export default TodoListItemDescription;

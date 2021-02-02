import React from 'react';
import { TodoListItem } from '../../../model/todoListItem';
import classNames from '../todoListItem.module.scss';

type Props = {
    item: TodoListItem;
};

const Breadcrumb: React.FC<Props> = ({ item }) => {
    if (!item.roleTitle || !item.goalTitle) {
        return null;
    }

    return (
        <ul className={classNames.breadcrumb}>
            <li title={item.roleTitle}>{item.roleTitle}</li>
            <li title={item.goalTitle}>{item.goalTitle}</li>
        </ul>
    );
};

export default Breadcrumb;

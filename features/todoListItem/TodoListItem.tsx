import React from 'react';
import { TodoListItem as TodoListItemModel } from '../../model/todoListItem';
import classNames from './todoListItem.module.scss';

type Props = {
    item: TodoListItemModel;
};

const TodoListItem: React.FC<Props> = ({ item }) => (
    <div className={classNames.container}>
        <input
            type="checkbox"
            className={classNames.checkbox}
            checked={item.done}
            onChange={() => {}} /* @todo implement */
        />
        <div className={classNames.content}>
            <ul className={classNames.breadcrumb}>
                <li>Vader</li>
                <li>Liefde geven</li>
            </ul>
            <div className={classNames.summary}>{item.summary}</div>
        </div>
    </div>
);

export default TodoListItem;

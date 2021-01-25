import React from 'react';
import { TodoListItem as TodoListItemModel } from '../../model/todoListItem';
import classNames from './todoListItem.module.scss';
import createClassName from 'classnames';
import CheckboxInput from './components/CheckboxInput';
import useToggleDoneStatus from './hooks/useToggleDoneStatus';

type Props = {
    item: TodoListItemModel;
    current: boolean;
};

const TodoListItem: React.FC<Props> = ({ item, current }) => {
    const className = createClassName(classNames.container, {
        [classNames.containerIsCurrent]: current,
    });

    const { onInputChange } = useToggleDoneStatus(item, current);

    const hasBreadcrumb = !!item.roleTitle && !!item.goalTitle;

    return (
        <div className={className}>
            <CheckboxInput
                hasBreadcrumb={hasBreadcrumb}
                checked={item.done}
                onChange={onInputChange}
            />
            <div className={classNames.content}>
                {item.roleTitle && item.goalTitle && (
                    <ul className={classNames.breadcrumb}>
                        <li title={item.roleTitle}>{item.roleTitle}</li>
                        <li title={item.goalTitle}>{item.goalTitle}</li>
                    </ul>
                )}
                <div className={classNames.summary}>{item.summary}</div>
            </div>
        </div>
    );
};

export default TodoListItem;

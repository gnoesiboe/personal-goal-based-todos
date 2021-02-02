import React, { InputHTMLAttributes } from 'react';
import classNames from '../todoListItem.module.scss';
import createClassName from 'classnames';
import { TodoListItem } from '../../../model/todoListItem';

type Props = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'type' | 'className'
> & {
    item: TodoListItem;
};

const CheckboxInput: React.FC<Props> = ({ item, ...otherProps }) => {
    const hasBreadcrumb = !!item.roleTitle && !!item.goalTitle;

    const className = createClassName(classNames.checkboxContainer, {
        [classNames.checkboxContainerHasBreadcrumb]: hasBreadcrumb,
    });

    return (
        <div className={className}>
            <input
                {...otherProps}
                type="checkbox"
                className={className}
                checked={item.done}
            />
        </div>
    );
};

export default CheckboxInput;

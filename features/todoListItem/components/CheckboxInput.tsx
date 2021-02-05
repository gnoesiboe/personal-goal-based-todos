import React from 'react';
import classNames from '../todoListItem.module.scss';
import createClassName from 'classnames';
import { TodoListItem } from '../../../model/todoListItem';
import Checkbox, {
    OnChangeHandler,
} from '../../../primitives/checkbox/Checkbox';

type Props = {
    item: TodoListItem;
    onChange: OnChangeHandler;
};

const CheckboxInput: React.FC<Props> = ({ item, onChange }) => {
    const hasBreadcrumb = !!item.roleTitle && !!item.goalTitle;

    const className = createClassName(classNames.checkboxContainer, {
        [classNames.checkboxContainerHasBreadcrumb]: hasBreadcrumb,
    });

    return (
        <Checkbox
            checked={item.done}
            onChange={onChange}
            className={className}
        />
    );
};

export default CheckboxInput;

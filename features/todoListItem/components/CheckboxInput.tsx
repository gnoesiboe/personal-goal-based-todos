import React from 'react';
import classNames from '../todoListItem.module.scss';
import createClassName from 'classnames';
import { TodoListItem } from '../../../model/todoListItem';
import Checkbox, {
    OnChangeHandler,
} from '../../../primitives/checkbox/Checkbox';
import { UrgencyScore } from '../../../model/selector/todoListItemSelectors';

type Props = {
    item: TodoListItem;
    onChange: OnChangeHandler;
    urgencyScore: UrgencyScore;
};

const CheckboxInput: React.FC<Props> = ({ item, onChange, urgencyScore }) => {
    const hasBreadcrumb = !!item.roleTitle && !!item.goalTitle;

    const className = createClassName(classNames.checkboxContainer, {
        [classNames.checkboxContainerHasBreadcrumb]: hasBreadcrumb,
    });

    return (
        <Checkbox
            checked={item.done}
            onChange={onChange}
            className={className}
            accented={urgencyScore === UrgencyScore.ExtremelyUrgent}
            disabled={item.waiting}
        />
    );
};

export default CheckboxInput;

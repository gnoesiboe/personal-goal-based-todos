import React, { MouseEventHandler } from 'react';
import CheckboxButton from '../../../primitives/checkboxButton/CheckboxButton';
import FilterBadge from './FilterBadge';
import classNames from '../filterTodoOverview.module.scss';

type Props = {
    active: boolean;
    onClick: MouseEventHandler<HTMLButtonElement>;
    children: string;
    count: number;
};

const FilterButton: React.FC<Props> = ({
    active,
    onClick,
    children,
    count,
}) => (
    <div className={classNames.buttonContainer}>
        <CheckboxButton
            active={active}
            onClick={onClick}
            deflated
            style="link"
            size="small"
            className={classNames.button}
        >
            <span>{children}</span>
        </CheckboxButton>
        <FilterBadge count={count} />
    </div>
);

export default FilterButton;

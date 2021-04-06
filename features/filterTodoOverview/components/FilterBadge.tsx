import React from 'react';
import classNames from '../filterTodoOverview.module.scss';

type Props = {
    count: number;
};

const FilterBadge: React.VFC<Props> = ({ count }) => (
    <div className={classNames.badge}>{count}</div>
);

export default FilterBadge;

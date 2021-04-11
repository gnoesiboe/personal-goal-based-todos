import React, { ReactNode } from 'react';
import classNames from '../filterTodoOverview.module.scss';
import UnorderedList from '../../../primitives/unorderedList/UnorderedList';

type Props = {
    children: ReactNode[];
};

const FilterList: React.FC<Props> = ({ children }) => (
    <UnorderedList
        direction="horizontal"
        centered
        className={classNames.container}
    >
        {children}
    </UnorderedList>
);

export default FilterList;

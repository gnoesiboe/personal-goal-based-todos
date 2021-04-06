import React from 'react';
import UnorderedList from '../../primitives/unorderedList/UnorderedList';
import { useTodoListItems } from '../../context/todos/TodoListItemsContext';
import classNames from './filterTodoOverview.module.scss';
import FilterButton from './components/FilterButton';

const FilterTodoOverview: React.FC = () => {
    const {
        appliedFilters,
        filterCounts,
        toggleHideDone,
        toggleHideWaiting,
        toggleHideEvening,
    } = useTodoListItems();

    return (
        <UnorderedList
            direction="horizontal"
            centered
            className={classNames.container}
        >
            <FilterButton
                active={appliedFilters.hideDone}
                onClick={() => toggleHideDone()}
                count={filterCounts.done}
            >
                hide done
            </FilterButton>
            <FilterButton
                active={appliedFilters.hideWaiting}
                onClick={() => toggleHideWaiting()}
                count={filterCounts.waiting}
            >
                hide waiting
            </FilterButton>
            <FilterButton
                active={appliedFilters.hideEvening}
                onClick={() => toggleHideEvening()}
                count={filterCounts.evening}
            >
                hide evening
            </FilterButton>
        </UnorderedList>
    );
};

export default FilterTodoOverview;

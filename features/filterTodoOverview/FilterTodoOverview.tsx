import React from 'react';
import { useTodoListItems } from '../../context/todos/TodoListItemsContext';
import FilterButton from './components/FilterButton';
import FilterList from './components/FilterList';

const FilterTodoOverview: React.FC = () => {
    const {
        appliedFilters,
        filterCounts,
        toggleHideDone,
        toggleHideWaiting,
        toggleHideEvening,
    } = useTodoListItems();

    return (
        <FilterList>
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
        </FilterList>
    );
};

export default FilterTodoOverview;

import React from 'react';
import UnorderedList from '../../primitives/unorderedList/UnorderedList';
import { useTodoListItems } from '../../context/todos/TodoListItemsContext';
import classNames from './filterTodoOverview.module.scss';
import CheckboxButton from '../../primitives/checkboxButton/CheckboxButton';

const FilterTodoOverview: React.FC = () => {
    const { appliedFilters, toggleHideDone } = useTodoListItems();

    return (
        <UnorderedList
            direction="horizontal"
            centered
            className={classNames.container}
        >
            <CheckboxButton
                active={appliedFilters.hideDone}
                onClick={() => toggleHideDone()}
                style="link"
                size="small"
            >
                hide done
            </CheckboxButton>
        </UnorderedList>
    );
};

export default FilterTodoOverview;
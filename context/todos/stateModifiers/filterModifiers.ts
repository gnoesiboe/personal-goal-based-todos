import { countAppliedFilters } from './../utility/todoFilterUtilities';
import { AppliedFilters, State } from '../reducers/todoReducer';
import { applyFilters } from '../utility/todoFilterUtilities';
import produce from 'immer';

export const applyFilterToggleModifier = (
    currentState: State,
    filter: keyof AppliedFilters,
): State => {
    return produce<State>(currentState, (nextState) => {
        nextState.appliedFilters[filter] = !nextState.appliedFilters[filter];

        // reset current index, as it might now be hidden
        nextState.currentTodoIndex = null;

        // apply new filters on items
        nextState.filteredItems = nextState.items
            ? applyFilters(nextState.items, nextState.appliedFilters)
            : null;

        // reset counts
        nextState.filterCounts = countAppliedFilters(nextState.items);
    });
};

import { State } from '../reducers/todoReducer';
import { applyFilters } from '../utility/todoFilterUtilities';
import produce from 'immer';

export const applyToggleHideDoneActionModifier = (
    currentState: State,
): State => {
    return produce<State>(currentState, (nextState) => {
        nextState.appliedFilters.hideDone = !nextState.appliedFilters.hideDone;

        // reset current index, as it might now be hidden
        nextState.currentTodoIndex = null;

        // apply new filters on items
        nextState.filteredItems = nextState.items
            ? applyFilters(nextState.items, nextState.appliedFilters)
            : null;
    });
};

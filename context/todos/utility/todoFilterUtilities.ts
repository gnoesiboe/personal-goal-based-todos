import { AppliedFilters, ItemsState } from '../reducers/todoReducer';

export const applyFilters = (
    items: ItemsState,
    appliedFilters: AppliedFilters,
): ItemsState => {
    if (!items) {
        return null;
    }

    const filteredItems: ItemsState = {};

    Object.keys(items).forEach((dateKey) => {
        filteredItems[dateKey] = items[dateKey].filter((item) => {
            if (appliedFilters.hideDone && item.done) {
                return false;
            }

            // noinspection RedundantIfStatementJS
            if (appliedFilters.hideWaiting && item.waiting) {
                return false;
            }

            if (appliedFilters.hideEvening && item.evening) {
                return false;
            }

            return true;
        });
    });

    return filteredItems;
};

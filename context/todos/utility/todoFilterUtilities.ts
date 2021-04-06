import { FilterItemCounts } from './../reducers/todoReducer';
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

export const countAppliedFilters = (items: ItemsState): FilterItemCounts => {
    const counts: FilterItemCounts = {
        done: 0,
        evening: 0,
        waiting: 0,
    };

    if (!items) {
        return counts;
    }

    Object.keys(items).forEach((dateKey) => {
        items[dateKey].forEach((item) => {
            if (item.done) {
                counts.done++;
            }

            if (item.waiting) {
                counts.waiting++;
            }

            if (item.evening) {
                counts.evening++;
            }
        });
    });

    return counts;
};

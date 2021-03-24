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
            return !(appliedFilters.hideDone && item.done);
        });
    });

    return filteredItems;
};

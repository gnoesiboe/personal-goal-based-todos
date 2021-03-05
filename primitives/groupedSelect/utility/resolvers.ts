import { GroupedOptions } from '../GroupedSelect';

export const resolveInitialGroupValue = (
    options: GroupedOptions,
    currentValue: string | null,
): string | null => {
    const groups = Object.keys(options);

    if (groups.length === 0) {
        return null;
    }

    if (!currentValue) {
        return groups[0];
    }

    return (
        groups.find((group) =>
            options[group].some((item) => item.value === currentValue),
        ) || null
    );
};

export const resolveLabelForCurrentValue = (
    options: GroupedOptions,
    currentValue: string | null,
): string | null => {
    const groups = Object.keys(options);

    if (groups.length === 0 || !currentValue) {
        return null;
    }

    for (const group in options) {
        if (!options.hasOwnProperty(group)) {
            continue;
        }

        const groupOptions = options[group];

        for (let i = 0, l = groupOptions.length; i < l; i++) {
            const option = groupOptions[i];

            if (option.value === currentValue) {
                return `${group} » ${option.label}`;
            }
        }
    }

    return null;
};

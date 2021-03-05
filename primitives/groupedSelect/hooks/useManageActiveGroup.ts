import { GroupedOptions } from '../GroupedSelect';
import { useState } from 'react';
import { resolveInitialGroupValue } from '../utility/resolvers';

export default function useManageActiveGroup(
    options: GroupedOptions,
    currentValue: string | null,
) {
    const [activeGroup, setActiveGroupState] = useState<string | null>(
        resolveInitialGroupValue(options, currentValue),
    );

    const setActiveGroup = (group: string) => {
        const keyExists = Object.keys(options).some(
            (cursorGroup) => cursorGroup === group,
        );

        if (!keyExists) {
            return;
        }

        setActiveGroupState(group);
    };

    return { activeGroup, setActiveGroup };
}

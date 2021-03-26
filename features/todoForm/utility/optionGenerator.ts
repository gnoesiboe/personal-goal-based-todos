import { RoleWithGoals } from '../../../model/role';
import { GroupedOptions } from '../../../primitives/groupedSelect/GroupedSelect';
import { generateComposedKey } from '../../../utility/idUtilities';
import { Counter } from '../../../model/counter';
import { generateKeyForGoal } from '../../../repository/counterRepository';

export const generateOptionsForRolesWithGoals = (
    rolesWithGoals: RoleWithGoals[] | null,
    goalCounters: Counter[],
): GroupedOptions => {
    if (!rolesWithGoals) {
        return {};
    }

    const groupedOptions: GroupedOptions = {};

    rolesWithGoals.forEach((role) => {
        groupedOptions[role.title] = role.goals
            .map((goal) => {
                const counter = goalCounters.find(
                    (cursorCounter) =>
                        cursorCounter.id === generateKeyForGoal(goal.uid),
                );

                return {
                    label: goal.title + (counter ? ` (${counter.count})` : ''),
                    value: generateComposedKey(role.uid, goal.uid),
                    count: counter ? counter.count : 0,
                };
            })
            .sort((first, second) => {
                if (first.count > second.count) {
                    return 1;
                }

                if (first.count < second.count) {
                    return -1;
                }

                return 0;
            });
    });

    return groupedOptions;
};

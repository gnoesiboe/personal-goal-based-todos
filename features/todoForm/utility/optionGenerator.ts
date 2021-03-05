import { RoleWithGoals } from '../../../model/role';
import { GroupedOptions } from '../../../primitives/groupedSelect/GroupedSelect';
import { generateComposedKey } from '../../../utility/idUtilities';

export const generateOptionsForRolesWithGoals = (
    rolesWithGoals: RoleWithGoals[] | null,
): GroupedOptions => {
    if (!rolesWithGoals) {
        return {};
    }

    const groupedOptions: GroupedOptions = {};

    rolesWithGoals.forEach((role) => {
        groupedOptions[role.title] = role.goals.map((goal) => ({
            label: goal.title,
            value: generateComposedKey(role.uid, goal.uid),
        }));
    });

    return groupedOptions;
};

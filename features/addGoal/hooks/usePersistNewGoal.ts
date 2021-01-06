import { title } from 'process';
import { addGoalToRole } from '../../../repository/rolesRepository';
import { OnFormValidHandler } from './useHandleFormEvents';

export default function usePersistNewGoal() {
    const onFormValid: OnFormValidHandler = async (
        roleUid,
        values,
    ): Promise<boolean> => {
        return addGoalToRole(roleUid, values.title, values.description || null);
    };

    return { onFormValid };
}

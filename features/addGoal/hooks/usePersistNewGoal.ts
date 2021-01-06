import { title } from 'process';
import { addGoalToRole } from '../../../repository/rolesRepository';
import { OnFormDataValidHandler } from './useHandleFormEvents';

export default function usePersistNewGoal() {
    const onFormValid: OnFormDataValidHandler = async (
        roleUid,
        values,
    ): Promise<boolean> => {
        return addGoalToRole(roleUid, values.title, values.description || null);
    };

    return { onFormValid };
}

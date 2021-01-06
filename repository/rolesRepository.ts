import { Role, RoleWithGoals } from './../model/role';
import firebase from 'firebase';
import firebaseRoleToApplicationRoleConverter from '../firebase/converter/firebaseRoleToApplicationRoleConverter';
import { GoalCollection } from '../model/goal';
import firebaseGoalToApplicationGoalConverter from '../firebase/converter/firebaseGoalToApplicationGoalConverter';

const collectionName = 'roles';
const goalsSubCollectionName = 'goals';

export const fetchAllRolesWithGoalsForUser = async (
    userUid: string,
): Promise<RoleWithGoals[]> => {
    const snapshot = await firebase
        .firestore()
        .collection(collectionName)
        .withConverter(firebaseRoleToApplicationRoleConverter)
        .where('user_uid', '==', userUid)
        .get();

    const results: RoleWithGoals[] = await Promise.all(
        snapshot.docs.map(async (result) => {
            const role = result.data();

            const goalResults = await result.ref
                .collection(goalsSubCollectionName)
                .withConverter(firebaseGoalToApplicationGoalConverter)
                .get();

            const goals: GoalCollection = goalResults.docs.map((goalResult) =>
                goalResult.data(),
            );

            return { ...role, goals };
        }),
    );

    return results;
};

const fetchRoleSnapshot = async (roleUid: string) => {
    return await firebase
        .firestore()
        .collection(collectionName)
        .doc(roleUid)
        .withConverter(firebaseRoleToApplicationRoleConverter)
        .get();
};

export const addGoalToRole = async (
    roleUid: string,
    title: string,
    description: string,
): Promise<boolean> => {
    const roleSnapshot = await fetchRoleSnapshot(roleUid);

    if (!roleSnapshot) {
        return false;
    }

    try {
        await roleSnapshot.ref.collection(goalsSubCollectionName).add({
            title,
            description,
        });

        return true;
    } catch (error) {
        // @todo error handling / notifying

        return false;
    }
};

export const removeGoalFromRole = async (
    roleUid: string,
    goalUid: string,
): Promise<boolean> => {
    const roleSnapshot = await fetchRoleSnapshot(roleUid);

    if (!roleSnapshot) {
        return false;
    }

    try {
        await roleSnapshot.ref
            .collection(goalsSubCollectionName)
            .doc(goalUid)
            .delete();

        return true;
    } catch (error) {
        // @todo error handling / notifying

        return false;
    }
};

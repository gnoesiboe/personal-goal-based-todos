import { createTimestamp } from './../utility/dateTimeUtilities';
import { Role, RoleWithGoals } from './../model/role';
import firebase from 'firebase/app';
import firebaseRoleToApplicationRoleConverter from '../firebase/converter/firebaseRoleToApplicationRoleConverter';
import { Goal, GoalCollection } from '../model/goal';
import firebaseGoalToApplicationGoalConverter from '../firebase/converter/firebaseGoalToApplicationGoalConverter';

const collectionName = 'roles';
const goalsSubCollectionName = 'goals';

export const fetchAllRolesWithGoalsForUserOrderedByTimestamp = async (
    userUid: string,
): Promise<RoleWithGoals[]> => {
    const snapshot = await firebase
        .firestore()
        .collection(collectionName)
        .withConverter(firebaseRoleToApplicationRoleConverter)
        .where('user_uid', '==', userUid)
        .orderBy('timestamp', 'asc')
        .get();

    const results: RoleWithGoals[] = await Promise.all(
        snapshot.docs.map(async (result) => {
            const role = result.data();

            const goalResults = await result.ref
                .collection(goalsSubCollectionName)
                .withConverter(firebaseGoalToApplicationGoalConverter)
                .orderBy('timestamp', 'asc')
                .get();

            const goals: GoalCollection = goalResults.docs.map((goalResult) =>
                goalResult.data(),
            );

            return { ...role, goals };
        }),
    );

    return results;
};

export const persistNewRole = async (
    title: string,
    userUid: string,
): Promise<boolean> => {
    try {
        await firebase.firestore().collection(collectionName).add({
            title,
            user_uid: userUid,
            timestamp: createTimestamp(),
        });

        return true;
    } catch (error) {
        console.error('could not persist new role', error);

        return false;
    }
};

export const persistRoleUpdates = async (
    updatedRole: Role,
): Promise<boolean> => {
    try {
        await firebase
            .firestore()
            .collection(collectionName)
            .doc(updatedRole.uid)
            .withConverter(firebaseRoleToApplicationRoleConverter)
            .set(updatedRole);

        return true;
    } catch (error) {
        console.error('could not persist role update', error);

        return false;
    }
};

export const removeRole = async (roleUid: string): Promise<boolean> => {
    try {
        await firebase
            .firestore()
            .collection(collectionName)
            .doc(roleUid)
            .delete();

        return true;
    } catch (error) {
        console.error('could not remove role', error);

        return false;
    }
};

const fetchRoleSnapshot = async (roleUid: string) => {
    return await firebase
        .firestore()
        .collection(collectionName)
        .doc(roleUid)
        .withConverter(firebaseRoleToApplicationRoleConverter)
        .get();
};

export const persistNewGoalForRole = async (
    roleUid: string,
    title: string,
    description: string | null,
): Promise<boolean> => {
    const roleSnapshot = await fetchRoleSnapshot(roleUid);

    if (!roleSnapshot) {
        return false;
    }

    try {
        await roleSnapshot.ref.collection(goalsSubCollectionName).add({
            title,
            description,
            timestamp: createTimestamp(),
        });

        return true;
    } catch (error) {
        console.error('Could not persist new goal', error);

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
        console.error('Could not remove goal', error);

        return false;
    }
};

export const updateGoalFromRole = async (
    roleUid: string,
    updatedGoal: Goal,
): Promise<boolean> => {
    const roleSnapshot = await fetchRoleSnapshot(roleUid);

    if (!roleSnapshot) {
        return false;
    }

    try {
        await roleSnapshot.ref
            .collection(goalsSubCollectionName)
            .doc(updatedGoal.uid)
            .set(updatedGoal);

        return true;
    } catch (error) {
        console.error('Could not update goal', error);

        return false;
    }
};

import firebase from 'firebase/app';
import { fetchCountForUserWithGoal } from './todoListItemRepository';
import { GoalDocumentData } from '../firebase/model/roleDocumentData';
import firebaseToApplicationCounterConverter from '../firebase/converter/toApplicationCounterConverter';

const collectionName = 'counters';

const generateKeyForGoal = (goalUid: string) => `goal_${goalUid}`;

const getCountForGoal = async (goalUid: string): Promise<number | null> => {
    const snapshot = await firebase
        .firestore()
        .collection(collectionName)
        .withConverter(firebaseToApplicationCounterConverter)
        .doc(generateKeyForGoal(goalUid))
        .get();

    const count = snapshot.exists ? snapshot.data()?.count : null;

    return typeof count === 'number' ? count : null;
};

export const incrementCountForGoal = async (
    userUid: string,
    goalRef: firebase.firestore.DocumentReference<GoalDocumentData>,
) => {
    try {
        const existingCount = await getCountForGoal(goalRef.id);

        if (existingCount !== null) {
            console.log('is existing', 'increment');

            await firebase
                .firestore()
                .collection(collectionName)
                .doc(generateKeyForGoal(goalRef.id))
                .update({
                    count: firebase.firestore.FieldValue.increment(1),
                });

            return true;
        } else {
            // no count exists yet, let's generate it with the current data we have. This
            // is an expensive call so we only want to execute it once of twice

            return await resetCountForGoal(userUid, goalRef);
        }
    } catch (error) {
        console.error('Could not increment count for goal', error);

        return false;
    }
};

export const decrementCountForGoal = async (
    userUid: string,
    goalRef: firebase.firestore.DocumentReference<GoalDocumentData>,
) => {
    try {
        const existingCount = await getCountForGoal(goalRef.id);

        if (existingCount !== null) {
            console.log('is existing', 'decrement');

            await firebase
                .firestore()
                .collection(collectionName)
                .doc(generateKeyForGoal(goalRef.id))
                .update({
                    count: firebase.firestore.FieldValue.increment(-1),
                });

            return true;
        } else {
            // no count exists yet, let's generate it with the current data we have. This
            // is an expensive call so we only want to execute it once of twice

            return await resetCountForGoal(userUid, goalRef);
        }
    } catch (error) {
        console.error('Could not increment count for goal', error);

        return false;
    }
};

const resetCountForGoal = async (
    userUid: string,
    goalRef: firebase.firestore.DocumentReference<GoalDocumentData>,
) => {
    try {
        const upToDateCount = await fetchCountForUserWithGoal(userUid, goalRef);

        await firebase
            .firestore()
            .collection(collectionName)
            .doc(generateKeyForGoal(goalRef.id))
            .set({
                count: upToDateCount,
                userUid,
            });

        return true;
    } catch (error) {
        console.error('Could not reset count for goal', error);

        return false;
    }
};

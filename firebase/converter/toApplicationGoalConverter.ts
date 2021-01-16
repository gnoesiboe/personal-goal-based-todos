import firebase from 'firebase/app';
import { Goal } from '../../model/goal';
import { GoalDocumentData } from '../model/roleDocumentData';

const firebaseToApplicationGoalConverter: firebase.firestore.FirestoreDataConverter<Goal> = {
    toFirestore: function (goal: Goal): GoalDocumentData {
        return {
            title: goal.title,
            description: goal.description,
            timestamp: goal.timestamp,
        };
    },
    fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options) as GoalDocumentData;

        return {
            uid: snapshot.id,
            title: data.title,
            description: data.description,
            timestamp: data.timestamp,
        };
    },
};

export default firebaseToApplicationGoalConverter;

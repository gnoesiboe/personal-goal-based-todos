import firebase from 'firebase';
import { Goal } from '../../model/goal';

interface GoalDocumentData {
    title: string;
    description: string | null;
}

const firebaseGoalToApplicationGoalConverter: firebase.firestore.FirestoreDataConverter<Goal> = {
    toFirestore: function (goal: Goal): GoalDocumentData {
        return {
            title: goal.title,
            description: goal.description,
        };
    },
    fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options) as GoalDocumentData;

        return {
            uid: snapshot.id,
            title: data.title,
            description: data.description,
        };
    },
};

export default firebaseGoalToApplicationGoalConverter;

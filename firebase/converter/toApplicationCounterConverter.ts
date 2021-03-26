import firebase from 'firebase/app';
import { CounterFirebaseData } from '../model/counter';
import { Counter } from '../../model/counter';

const firebaseToApplicationCounterConverter: firebase.firestore.FirestoreDataConverter<Counter> = {
    toFirestore(counter: Counter): CounterFirebaseData {
        return {
            count: counter.count,
            userUid: counter.userUid,
        };
    },
    fromFirestore(snapshot, options): Counter {
        const data = snapshot.data(options) as CounterFirebaseData;

        return {
            id: snapshot.id,
            ...data,
        };
    },
};

export default firebaseToApplicationCounterConverter;

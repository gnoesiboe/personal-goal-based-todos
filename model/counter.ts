import { CounterFirebaseData } from '../firebase/model/counter';

export interface Counter extends CounterFirebaseData {
    id: string;
}

import firebase from 'firebase/app';
import { GoalDocumentData, RoleDocumentData } from './roleDocumentData';

export interface TodoListItemFirebaseData
    extends firebase.firestore.DocumentData {
    date: firebase.firestore.Timestamp | null;
    summary: string;
    description: string | null;
    deadline: firebase.firestore.Timestamp | null;
    done: boolean;
    userUid: string;
    goalRef: firebase.firestore.DocumentReference<GoalDocumentData> | null;
    goalTitle: string | null;
    roleRef: firebase.firestore.DocumentReference<RoleDocumentData> | null;
    roleTitle: string | null;
    quickfix?: boolean;
    waiting?: boolean;
}

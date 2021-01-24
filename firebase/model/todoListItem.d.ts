import firebase from 'firebase/app';
import { GoalDocumentData, RoleDocumentData } from './roleDocumentData';

export interface TodoListItemFirebaseData
    extends firebase.firestore.DocumentData {
    date: firebase.firestore.Timestamp;
    summary: string;
    done: boolean;
    urgent: boolean;
    important: boolean;
    userUid: string;
    goalRef: firebase.firestore.DocumentReference<GoalDocumentData> | null;
    goalTitle: string | null;
    roleRef: firebase.firestore.DocumentReference<RoleDocumentData> | null;
    roleTitle: string | null;
}

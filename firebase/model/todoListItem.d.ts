import firebase from 'firebase';
import { GoalDocumentData, RoleDocumentData } from './roleDocumentData';

export interface TodoListItemFirebaseData
    extends firebase.firestore.DocumentData {
    date: number;
    summary: string;
    done: boolean;
    urgent: boolean;
    important: boolean;
    userUid: string;
    goalRef: firebase.firestore.DocumentReference<GoalDocumentData> | null;
    roleRef: firebase.firestore.DocumentReference<RoleDocumentData> | null;
}

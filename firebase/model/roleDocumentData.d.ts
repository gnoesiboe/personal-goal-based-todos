import firebase from 'firebase/app';

export interface RoleDocumentData extends firebase.firestore.DocumentData {
    title: string;
    user_uid: string;
    timestamp: firebase.firestore.Timestamp;
}

export interface GoalDocumentData extends firebase.firestore.DocumentData {
    title: string;
    description: string | null;
    timestamp: number;
}

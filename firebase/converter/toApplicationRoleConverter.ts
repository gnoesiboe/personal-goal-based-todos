import firebase from 'firebase/app';
import { Role } from '../../model/role';
import { RoleDocumentData } from '../model/roleDocumentData';

const firebaseToApplicationRoleConverter: firebase.firestore.FirestoreDataConverter<Role> = {
    toFirestore: function (role: Role): RoleDocumentData {
        return {
            title: role.title,
            user_uid: role.userUid,
            timestamp: role.timestamp,
        };
    },
    fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options) as RoleDocumentData;

        return {
            uid: snapshot.id,
            title: data.title,
            userUid: data.user_uid,
            timestamp: data.timestamp,
        };
    },
};

export default firebaseToApplicationRoleConverter;
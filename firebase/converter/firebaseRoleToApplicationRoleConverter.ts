import firebase from 'firebase';
import { Role } from '../../model/role';

interface RoleDocumentData {
    title: string;
    user_uid: string;
}

const firebaseRoleToApplicationRoleConverter: firebase.firestore.FirestoreDataConverter<Role> = {
    toFirestore: function (role: Role): RoleDocumentData {
        return {
            title: role.title,
            user_uid: role.userUid,
        };
    },
    fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options) as RoleDocumentData;

        return {
            uid: snapshot.id, // @todo get this from somewhere
            title: data.title,
            userUid: data.user_uid,
        };
    },
};

export default firebaseRoleToApplicationRoleConverter;

import { User } from '../model/user';
import firebase from 'firebase';
import firebaseRoleToApplicationRoleConverter from '../firebase/converter/firebaseRoleToApplicationRoleConverter';
import { Role } from '../model/role';

export const fetchAllRolesForUser = async (
    userUid: string,
): Promise<Role[]> => {
    const snapshot = await firebase
        .firestore()
        .collection('roles')
        .withConverter(firebaseRoleToApplicationRoleConverter)
        .where('user_uid', '==', userUid)
        .get();

    return snapshot.docs.map((result) => result.data());
};

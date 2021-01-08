import { createUserFromUserInfo } from './../../../model/factory/userFactory';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { User } from '../../../model/user';
import usePersistCurrentUserInCookie from './usePersistCurrentUserInCookie';

const provider = new firebase.auth.GoogleAuthProvider();

export default function useEnsureUserIsAuthenticated() {
    const [userInfo, loading, error] = useAuthState(firebase.auth());

    useEffect(() => {
        if (userInfo || loading || error || typeof window === 'undefined') {
            return;
        }

        firebase.auth().signInWithRedirect(provider);
    }, [userInfo, loading, error]);

    usePersistCurrentUserInCookie(userInfo);

    const user: User | null = userInfo
        ? createUserFromUserInfo(userInfo)
        : null;

    return { user, loading, error };
}

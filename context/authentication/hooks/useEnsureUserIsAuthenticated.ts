import firebase from 'firebase';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { User } from '../../../model/user';

const provider = new firebase.auth.GoogleAuthProvider();

export default function useEnsureUserIsAuthenticated() {
    const [userInfo, loading, error] = useAuthState(firebase.auth());

    useEffect(() => {
        if (userInfo || loading || error || typeof window === 'undefined') {
            return;
        }

        firebase.auth().signInWithRedirect(provider);
    }, [userInfo, loading, error]);

    const user: User | null = userInfo
        ? {
              uid: userInfo.uid,
              name: userInfo.displayName,
              email: userInfo.email,
          }
        : null;

    return { user, loading, error };
}

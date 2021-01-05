import firebase from 'firebase';

export const initializeApp = () => {
    if (firebase.apps.length > 0) {
        return;
    }

    // @todo move credentials to .env file?
    firebase.initializeApp({
        apiKey: 'AIzaSyCGPf5OZNTgu6ZKRQGvn7NrO1w7M64c2So',
        authDomain: 'personal-goal-based-todos.firebaseapp.com',
        projectId: 'personal-goal-based-todos',
        storageBucket: 'personal-goal-based-todos.appspot.com',
        messagingSenderId: '9632949723',
        appId: '1:9632949723:web:9d13ce3f4a9895fe9633fe',
    });
};

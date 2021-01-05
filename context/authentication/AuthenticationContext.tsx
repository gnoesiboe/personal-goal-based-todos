import React, { ReactNode, useContext } from 'react';
import useEnsureUserIsAuthenticated from './hooks/useEnsureUserIsAuthenticated';
import { User } from '../../model/user';

type ContextValue = {
    user: User | null;
};

const AuthenticationContext = React.createContext<ContextValue>({ user: null });

export const AuthenticationContextProvider: React.FC<{
    children: ReactNode;
}> = ({ children }) => {
    const { user, loading } = useEnsureUserIsAuthenticated();

    const value: ContextValue = { user };

    return (
        <AuthenticationContext.Provider value={value}>
            {loading && <p>Loading..</p>}
            {user && children}
        </AuthenticationContext.Provider>
    );
};

export const useIsAuthenticated = () => {
    const { user } = useContext(AuthenticationContext);

    return !!user;
};

export const useLoggedInUser = () => {
    const { user } = useContext(AuthenticationContext);

    return user;
};

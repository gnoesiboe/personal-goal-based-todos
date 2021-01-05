import { createUserFromUserInfo } from './../../../model/factory/userFactory';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

export const cookieName = 'current_user';

export default function usePersistCurrentUserInCookie(userInfo: any | null) {
    const [, setCookie] = useCookies([cookieName]);

    useEffect(() => {
        const user = userInfo ? createUserFromUserInfo(userInfo) : null;

        if (user) {
            setCookie(cookieName, JSON.stringify(user));
        }
    }, [userInfo]);
}

import { User } from '../user';

export const createUserFromUserInfo = (userInfo: any): User => ({
    uid: userInfo.uid,
    name: userInfo.displayName,
});

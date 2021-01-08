import cookie from 'cookie';
import { IncomingMessage } from 'http';

export const getCookieValue = (
    identifier: string,
    request: IncomingMessage,
): string | void => {
    if (!request.headers.cookie) {
        return;
    }

    const value = cookie.parse(request.headers.cookie);

    return typeof value[identifier] !== 'undefined' && !!value[identifier]
        ? value[identifier]
        : undefined;
};

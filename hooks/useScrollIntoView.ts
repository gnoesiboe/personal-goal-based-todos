import { RefObject, useEffect } from 'react';
import { checkElementIsInViewport } from '../utility/viewportUtilities';

export default function useScrollIntoView<T extends HTMLElement>(
    ref: RefObject<T>,
    enabled: boolean,
    topOffset: number = 0,
    timeout: number = 0,
) {
    useEffect(() => {
        const el = ref.current;

        if (enabled && el) {
            const timeoutHandle = setTimeout(() => {
                const newPosition =
                    el.getBoundingClientRect().top +
                    window.pageYOffset -
                    topOffset;

                if (checkElementIsInViewport(el)) {
                    return;
                }

                window.scrollTo({ top: newPosition, behavior: 'smooth' });
            }, timeout);

            return () => clearTimeout(timeoutHandle);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enabled]);
}

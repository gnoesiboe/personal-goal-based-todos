import { MouseEventHandler } from 'react';

export default function useAnchorLinking() {
    const onLinkClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
        event.preventDefault();

        if (!(event.target instanceof HTMLAnchorElement)) {
            return;
        }

        const parts = event.target.href.split('#');

        if (parts.length < 2) {
            return;
        }

        const id = parts.pop();

        const targetEl = document.getElementById(id);

        if (!targetEl) {
            return;
        }

        // take into account the sticky header
        const offset = 90;

        const newPosition =
            targetEl.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({ top: newPosition, behavior: 'smooth' });
    };

    return onLinkClick;
}

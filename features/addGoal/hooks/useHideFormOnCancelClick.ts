import { MouseEventHandler } from 'react';

export default function useHideFormOnCancelClick(hideForm: () => void) {
    const onCancelClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        // prevent submitting form
        event.preventDefault();
        event.stopPropagation();

        hideForm();
    };

    return onCancelClick;
}

import { useCallback, useState } from 'react';

export default function useShowHide(initial: boolean = false) {
    const [visible, setVisible] = useState<boolean>(initial);

    const show = useCallback(() => setVisible(true), [setVisible]);

    const hide = useCallback(() => setVisible(false), [setVisible]);

    const toggle = useCallback(
        () => setVisible((currentValue) => !currentValue),
        [setVisible],
    );

    return { visible, show, hide, toggle };
}

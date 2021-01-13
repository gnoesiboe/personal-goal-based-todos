import { useState, useEffect } from 'react';

export default function useHideAfterTimeout(
    timeoutLength: number,
    changeDeps: any[] = [],
) {
    const [visible, setVisible] = useState<boolean>(true);

    useEffect(() => {
        setVisible(true);

        const handle = setTimeout(() => setVisible(false), timeoutLength);

        return () => clearTimeout(handle);
    }, changeDeps);

    return visible;
}

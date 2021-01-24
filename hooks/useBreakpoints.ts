import { useEffect, useState } from 'react';
import { Breakpoints } from '../constants/breakpoints';

type ViewportChecks = {
    tabletOrUp: boolean;
    desktopOrUp: boolean;
};

export default function useBreakpoints() {
    const [viewportChecks, setViewportChecks] = useState<ViewportChecks>({
        tabletOrUp: false,
        desktopOrUp: false,
    });

    const recheck = () => {
        setViewportChecks({
            tabletOrUp: window.innerWidth >= Breakpoints.Tablet,
            desktopOrUp: window.innerWidth >= Breakpoints.Desktop,
        });
    };

    useEffect(() => {
        recheck();

        const onWindowResize = () => recheck();

        window.addEventListener('resize', onWindowResize);

        return () => window.removeEventListener('resize', onWindowResize);
    }, []);

    return viewportChecks;
}

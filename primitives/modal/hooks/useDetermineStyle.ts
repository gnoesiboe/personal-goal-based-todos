import { Breakpoints } from './../../../constants/breakpoints';
import ReactModal from 'react-modal';
import { useEffect, useState } from 'react';
import useBreakpoints from '../../../hooks/useBreakpoints';

const createStyle = (isTabletOrUp: boolean) => ({
    overlay: {
        background: 'rgba(255, 255, 255, 0.7)',
    },
    content: {
        width: `calc(${isTabletOrUp ? '80%' : '100%'} - 20px)`,
        maxWidth: Breakpoints.Tablet,
        margin: 'auto',
        padding: '10px',
        inset: '55px 10px 10px',
        zIndex: 10000,
    },
});

export default function useDetermineStyle() {
    const { tabletOrUp } = useBreakpoints();

    const [style, setStyle] = useState<ReactModal.Props['style']>(
        createStyle(false),
    );

    useEffect(() => {
        setStyle(createStyle(tabletOrUp));
    }, [tabletOrUp]);

    return style;
}

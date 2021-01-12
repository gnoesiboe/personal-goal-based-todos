import React from 'react';
import classNames from './island.module.scss';
import createClassName from 'classnames';

type Props = {
    children: React.ReactNode;
    className?: string;
    ghost?: boolean;
    breakout?: boolean;
};

const Island: React.FC<Props> = ({
    children,
    className: additionalClassName,
    ghost = false,
    breakout = false,
}) => {
    const className = createClassName(
        classNames.container,
        additionalClassName,
        {
            [classNames.isGhost]: ghost,
            [classNames.isFullWidth]: breakout,
        },
    );

    return <section className={className}>{children}</section>;
};

export default Island;

import React from 'react';
import classNames from './island.module.scss';
import createClassName from 'classnames';

type Props = {
    children: React.ReactNode;
    className?: string;
    ghost?: boolean;
    fullWidth?: boolean;
    deflated?: boolean;
    deflatedTop?: boolean;
};

const Island: React.FC<Props> = ({
    children,
    className: additionalClassName,
    ghost = false,
    fullWidth = false,
    deflated = false,
    deflatedTop = false,
}) => {
    const className = createClassName(
        classNames.container,
        additionalClassName,
        {
            [classNames.isGhost]: ghost,
            [classNames.isFullWidth]: fullWidth,
            [classNames.isDeflated]: deflated,
            [classNames.isDeflatedTop]: deflatedTop,
        },
    );

    return <section className={className}>{children}</section>;
};

export default Island;

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
    style?: 'primary' | 'secondary';
};

const Island: React.FC<Props> = ({
    children,
    className: additionalClassName,
    ghost = false,
    fullWidth = false,
    deflated = false,
    deflatedTop = false,
    style = 'primary',
}) => {
    const className = createClassName(
        classNames.container,
        additionalClassName,
        {
            [classNames.isStylePrimary]: style === 'primary' && !ghost,
            [classNames.isStyleSecondary]: style === 'secondary' && !ghost,
            [classNames.isFullWidth]: fullWidth,
            [classNames.isDeflated]: deflated,
            [classNames.isDeflatedTop]: deflatedTop,
        },
    );

    return <section className={className}>{children}</section>;
};

export default Island;

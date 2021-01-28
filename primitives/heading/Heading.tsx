import React, { HTMLAttributes } from 'react';
import classNames from './heading.module.scss';
import createClassName from 'classnames';

type Props = Omit<HTMLAttributes<HTMLHeadingElement>, 'style'> & {
    tag: 'h1' | 'h2' | 'h3' | 'h4';
    style?: 'primary' | 'secondary';
    flattened?: true;
    deflated?: true;
    centered?: true;
};

const Heading: React.FC<Props> = ({
    tag,
    style = 'primary',
    flattened,
    deflated,
    children,
    centered,
    className: additionalClassName,
    ...otherProps
}) => {
    const className = createClassName(
        classNames.container,
        additionalClassName,
        {
            [classNames.isFlattened]: flattened,
            [classNames.isDeflated]: deflated,
            [classNames.isStyleSecondary]: style === 'secondary',
            [classNames.isCentered]: centered,
        },
    );

    return React.createElement(tag, { ...otherProps, className }, children);
};

export default Heading;

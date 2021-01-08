import React, { HTMLAttributes } from 'react';
import classNames from './heading.module.scss';
import createClassName from 'classnames';

type Props = Omit<HTMLAttributes<HTMLHeadingElement>, 'className' | 'style'> & {
    tag: 'h1' | 'h2' | 'h3' | 'h4';
    style?: 'primary' | 'secondary';
    flattened?: true;
};

const Heading: React.FC<Props> = ({
    tag,
    style = 'primary',
    flattened,
    children,
    ...otherProps
}) => {
    const className = createClassName(classNames.container, {
        [classNames.isFlattened]: flattened,
        [classNames.isStyleSecondary]: style === 'secondary',
    });

    return React.createElement(tag, { ...otherProps, className }, children);
};

export default Heading;

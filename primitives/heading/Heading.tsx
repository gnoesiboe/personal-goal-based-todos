import React, { HTMLAttributes } from 'react';
import classNames from './heading.module.scss';
import createClassName from 'classnames';

type Props = Omit<HTMLAttributes<HTMLHeadingElement>, 'className'> & {
    tag: 'h1' | 'h2' | 'h3';
    flattened?: true;
};

const Heading: React.FC<Props> = ({
    tag,
    flattened,
    children,
    ...otherProps
}) => {
    const className = createClassName(classNames.container, {
        [classNames.isFlattened]: flattened,
    });

    return React.createElement(tag, { ...otherProps, className }, children);
};

export default Heading;

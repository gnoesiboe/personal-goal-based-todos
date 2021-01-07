import React from 'react';
import classNames from './island.module.scss';
import createClassName from 'classnames';

type Props = {
    children: React.ReactNode;
    className?: string;
};

const Island: React.FC<Props> = ({
    children,
    className: additionalClassName,
}) => {
    const className = createClassName(
        classNames.container,
        additionalClassName,
    );

    return <section className={className}>{children}</section>;
};

export default Island;

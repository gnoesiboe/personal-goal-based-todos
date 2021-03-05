import React, { ReactNode } from 'react';
import classNames from './card.module.scss';
import createClassName from 'classnames';

type ChildrenProps = {
    children: ReactNode;
};

const Container: React.FC<ChildrenProps> = ({ children }) => {
    const className = createClassName(
        classNames.container,
        classNames.isStylePrimary,
    );

    return <div className={className}>{children}</div>;
};

const Header: React.FC<ChildrenProps> = ({ children }) => (
    <div className={classNames.header}>{children}</div>
);

const Body: React.FC<ChildrenProps> = ({ children }) => (
    <div className={classNames.body}>{children}</div>
);

export default {
    Container,
    Header,
    Body,
};

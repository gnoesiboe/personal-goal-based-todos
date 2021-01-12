import React from 'react';
import classNames from './mainLayout.module.scss';
import createClassName from 'classnames';

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className={classNames.container}>{children}</div>
);

const Header: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <header className={classNames.header}>{children}</header>
);

const Body: React.FC<{ children: React.ReactNode; fullWidth?: boolean }> = ({
    children,
    fullWidth = false,
}) => {
    const className = createClassName(classNames.body, {
        [classNames.bodyIsFullWidth]: fullWidth,
        [classNames.bodyIsWithSidebar]: !fullWidth,
    });

    return <div className={className}>{children}</div>;
};

const ContentHeader: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => <aside className={classNames.contentHeader}>{children}</aside>;

const ContentSidebar: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => <aside className={classNames.contentSidebar}>{children}</aside>;

const ContentMain: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <main className={classNames.contentMain}>{children}</main>
);

export default {
    Container,
    Header,
    Body,
    ContentHeader,
    ContentSidebar,
    ContentMain,
};

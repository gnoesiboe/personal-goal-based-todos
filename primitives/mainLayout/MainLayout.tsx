import React from 'react';
import classNames from './mainLayout.module.scss';

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className={classNames.container}>{children}</div>
);

const Header: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <header className={classNames.header}>{children}</header>
);

const Body: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className={classNames.body}>{children}</div>
);

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

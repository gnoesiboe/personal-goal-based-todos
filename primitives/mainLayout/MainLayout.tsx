import React from 'react';
import classNames from './mainLayout.module.scss';

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className={classNames.container}>{children}</div>
);

const Header: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <header className={classNames.header}>{children}</header>
);

const Content: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <main className={classNames.content}>{children}</main>
);
export default {
    Container,
    Header,
    Content,
};

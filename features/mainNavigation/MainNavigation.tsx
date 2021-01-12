import React from 'react';
import { home, goalsAndRoles } from '../../routing/paths';
import List from './components/List';
import Item from './components/Item';
import classNames from './mainNavigation.module.scss';

const MainNavigation: React.FC = () => (
    <nav className={classNames.container}>
        <List>
            <Item title="home" path={home} />
            <Item title="rollen & doelen" path={goalsAndRoles} />
        </List>
    </nav>
);

export default MainNavigation;

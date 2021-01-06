import React from 'react';
import Link from 'next/link';
import { home, goalsAndRoles } from '../../routing/paths';
import List from './components/List';
import Item from './components/Item';
import classNames from './mainNavigation.module.scss';

const MainNavigation: React.FC = () => (
    <nav className={classNames.container}>
        <List>
            <Item title="home" path={home} />
            <Item title="goals & roles" path={goalsAndRoles} />
        </List>
    </nav>
);

export default MainNavigation;

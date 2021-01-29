import React, { ReactElement } from 'react';
import classNames from '../mainNavigation.module.scss';
import { AnimateSharedLayout } from 'framer-motion';

type Props = {
    children: ReactElement[];
};

const List: React.FC<Props> = ({ children }) => (
    <AnimateSharedLayout>
        <ul className={classNames.list}>
            {React.Children.map(children, (child) => (
                <li className={classNames.listItem} key={child.key}>
                    {child}
                </li>
            ))}
        </ul>
    </AnimateSharedLayout>
);

export default List;

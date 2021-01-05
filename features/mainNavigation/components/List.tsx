import React, { ReactElement } from 'react';
import classNames from '../mainNavigation.module.scss';

type Props = {
    children: ReactElement[];
};

const List: React.FC<Props> = ({ children }) => (
    <ul className={classNames.list}>
        {React.Children.map(children, (child) => (
            <li className={classNames.listItem} key={child.key}>
                {child}
            </li>
        ))}
    </ul>
);

export default List;

import React, { ReactElement } from 'react';
import classNames from '../groupedSelect.module.scss';

type Props = {
    children: ReactElement[];
};

const Tabs: React.FC<Props> = ({ children }) => (
    <ul className={classNames.tabs}>
        {React.Children.map(children, (child) => (
            <li key={child.key} className={classNames.tab}>
                {child}
            </li>
        ))}
    </ul>
);

export default Tabs;

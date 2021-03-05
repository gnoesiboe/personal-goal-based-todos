import React, { ReactElement } from 'react';
import classNames from '../groupedSelect.module.scss';

type Props = {
    children: ReactElement[];
};

const Options: React.FC<Props> = ({ children }) => (
    <ul className={classNames.options}>
        {React.Children.map(children, (child) => (
            <li key={child.key}>{child}</li>
        ))}
    </ul>
);

export default Options;

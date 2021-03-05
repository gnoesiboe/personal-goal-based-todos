import React, { ReactElement } from 'react';
import classNames from './verticalUnorderedList.module.scss';

type Props = {
    children: ReactElement[];
};

const VerticalUnorderedList: React.FC<Props> = ({ children }) => (
    <ul className={classNames.container}>
        {React.Children.map(children, (child) => (
            <li key={child.key}>{child}</li>
        ))}
    </ul>
);

export default VerticalUnorderedList;

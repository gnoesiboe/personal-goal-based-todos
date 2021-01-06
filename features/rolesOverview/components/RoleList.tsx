import React, { ReactElement } from 'react';
import classNames from '../rolesOverview.module.scss';

type Props = {
    children: ReactElement[];
};

const RoleList: React.FC<Props> = ({ children }) => (
    <ul className={classNames.list}>
        {React.Children.map(children, (child) => (
            <li key={child.key}>{child}</li>
        ))}
    </ul>
);

export default RoleList;

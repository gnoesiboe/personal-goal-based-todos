import React, { ReactElement } from 'react';

type Props = {
    children: ReactElement[];
};

const RoleList: React.FC<Props> = ({ children }) => (
    <ul>
        {React.Children.map(children, (child) => (
            <li key={child.key}>{child}</li>
        ))}
    </ul>
);

export default RoleList;

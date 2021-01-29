import React, { ReactElement } from 'react';
import classNames from '../todoListItem.module.scss';

type Props = {
    children: ReactElement[];
};

const ActionButtonList: React.FC<Props> = ({ children }) => (
    <ul className={classNames.actionButtonList}>
        {React.Children.map(children, (child) => (
            <li key={child.key}>{child}</li>
        ))}
    </ul>
);

export default ActionButtonList;

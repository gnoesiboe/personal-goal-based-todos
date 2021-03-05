import React, { isValidElement, ReactNode } from 'react';
import classNames from '../todoListItem.module.scss';

type Props = {
    children: ReactNode;
};

const ActionButtonList: React.FC<Props> = ({ children }) => (
    <ul className={classNames.actionButtonList}>
        {React.Children.map(children, (child, index) => {
            const key = isValidElement(child) ? child.key : index;

            return <li key={key}>{child}</li>;
        })}
    </ul>
);

export default ActionButtonList;

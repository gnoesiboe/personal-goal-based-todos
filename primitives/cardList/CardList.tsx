import React, { isValidElement, ReactNode } from 'react';
import classNames from './cardList.module.scss';

type ChildProps = {
    children: ReactNode;
};

const CardList: React.FC<ChildProps> = ({ children }) => (
    <ul className={classNames.container}>
        {React.Children.map(children, (child, index) => {
            const key = isValidElement(child) ? child.key : index;

            return (
                <li key={key} className={classNames.item}>
                    {child}
                </li>
            );
        })}
    </ul>
);

export default CardList;

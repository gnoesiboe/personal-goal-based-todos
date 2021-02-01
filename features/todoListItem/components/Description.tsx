import React from 'react';
import classNames from '../todoListItem.module.scss';

type Props = {
    children: string;
};

const Description: React.FC<Props> = ({ children }) => (
    <div className={classNames.description}>{children}</div>
);

export default Description;
